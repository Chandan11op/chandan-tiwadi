import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required.', 400);
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!admin) {
      return errorResponse(res, 'Invalid credentials or unauthorized account.', 401);
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials or unauthorized account.', 401);
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken(admin);

    // Cross-origin secure cookie settings
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // HTTPS only in production
      sameSite: isProduction ? 'none' : 'lax', // 'none' required for cross-origin Cloudflare Pages -> Render
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie('admin_token', token, cookieOptions);

    return successResponse(res, {
      token,
      user: {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });
  return successResponse(res, null, 'Logged out successfully');
};

export const getMe = async (req, res) => {
  return successResponse(res, {
    user: {
      id: req.admin._id.toString(),
      email: req.admin.email,
      role: req.admin.role,
      lastLogin: req.admin.lastLogin,
    },
  }, 'Authenticated user profile retrieved');
};

