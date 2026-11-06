import { Certificate } from '../models/Certificate.js';
import { deleteCloudinaryAsset } from '../utils/cloudinaryHelpers.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getPublicCertificates = async (req, res, next) => {
  try {
    const certs = await Certificate.find({ is_published: true }).sort({
      display_order: 1,
      createdAt: -1,
    });

    const formatted = certs.map((cert) => ({
      id: cert._id.toString(),
      _id: cert._id.toString(),
      title: cert.title,
      issuer: cert.issuer,
      year: cert.year || cert.issue_date || '',
      issueDate: cert.issue_date,
      credentialId: cert.credential_id,
      badgeIcon: cert.badge_icon || 'award',
      badge_icon: cert.badge_icon || 'award',
      image: cert.file_url,
      file_url: cert.file_url,
      file_public_id: cert.file_public_id,
      verificationUrl: cert.verification_url || null,
      verification_url: cert.verification_url || null,
      displayOrder: cert.display_order,
      is_published: cert.is_published,
    }));

    return successResponse(res, formatted, 'Public certificates fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getAdminCertificates = async (req, res, next) => {
  try {
    const certs = await Certificate.find().sort({ display_order: 1, createdAt: -1 });
    return successResponse(res, certs, 'Admin certificates fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getCertificateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cert = await Certificate.findById(id);
    if (!cert) {
      return errorResponse(res, 'Certificate not found', 404);
    }
    return successResponse(res, cert, 'Certificate fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createCertificate = async (req, res, next) => {
  try {
    const certData = { ...req.body };
    const cert = await Certificate.create(certData);
    return successResponse(res, cert, 'Certificate created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const cert = await Certificate.findById(id);
    if (!cert) {
      return errorResponse(res, 'Certificate not found', 404);
    }

    // If new file replaced the old one, clean up the old Cloudinary asset
    const oldPublicId = cert.file_public_id;
    if (updateData.file_public_id && oldPublicId && oldPublicId !== updateData.file_public_id) {
      deleteCloudinaryAsset(oldPublicId).catch((err) =>
        console.warn('Old certificate asset deletion warning:', err.message)
      );
    }

    Object.assign(cert, updateData);
    await cert.save();

    return successResponse(res, cert, 'Certificate updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cert = await Certificate.findById(id);
    if (!cert) {
      return errorResponse(res, 'Certificate not found', 404);
    }

    if (cert.file_public_id) {
      deleteCloudinaryAsset(cert.file_public_id).catch((err) =>
        console.warn('Certificate asset deletion warning:', err.message)
      );
    }

    await Certificate.findByIdAndDelete(id);
    return successResponse(res, { id }, 'Certificate deleted successfully');
  } catch (error) {
    next(error);
  }
};

