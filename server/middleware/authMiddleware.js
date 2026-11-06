import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { errorResponse } from '../utils/apiResponse.js';

export const requireAuth = async (req, res, next) => {
  try {
    let token = null;

    // 1. Try to get token from Authorization header: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // 2. Fall back to signed or unsigned cookie
    else if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }

    if (!token) {
      return errorResponse(res, 'Authentication required. No token provided.', 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is missing in environment!');
      return errorResponse(res, 'Server configuration error.', 500);
    }

    // Verify token
    const decoded = jwt.verify(token, secret);

    // Look up Admin
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return errorResponse(res, 'Invalid token. Administrator not found.', 401);
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Session expired. Please log in again.', 401);
    }
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid authentication token.', 401);
    }
    return errorResponse(res, 'Authentication failed.', 401);
  }
};

