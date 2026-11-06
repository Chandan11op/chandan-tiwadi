import { uploadBufferToCloudinary, deleteCloudinaryAsset } from '../utils/cloudinaryHelpers.js';
import { isCloudinaryConfigured } from '../config/cloudinary.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const uploadMedia = async (req, res, next) => {
  try {
    if (!isCloudinaryConfigured()) {
      return errorResponse(
        res,
        'Cloudinary credentials are not configured on the server. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in the server environment.',
        503
      );
    }

    if (!req.file) {
      return errorResponse(res, 'No file was uploaded.', 400);
    }

    const { folder = 'portfolio/general' } = req.body;

    // Sanitize folder path
    const validFolders = [
      'portfolio/profile',
      'portfolio/projects',
      'portfolio/certificates',
      'portfolio/resumes',
      'portfolio/general',
    ];
    const destinationFolder = validFolders.includes(folder) ? folder : 'portfolio/general';

    // Determine resource_type
    const isPdf = req.file.mimetype === 'application/pdf';
    const resourceType = isPdf ? 'auto' : 'image';

    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder: destinationFolder,
      resource_type: resourceType,
    });

    return successResponse(
      res,
      {
        publicUrl: result.secure_url,
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        bytes: result.bytes,
        resource_type: result.resource_type,
      },
      'File uploaded successfully to Cloudinary',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const { public_id } = req.params;
    const { resource_type = 'image' } = req.query;

    if (!public_id) {
      return errorResponse(res, 'Public ID is required', 400);
    }

    await deleteCloudinaryAsset(public_id, resource_type);
    return successResponse(res, { public_id }, 'Media deleted from Cloudinary');
  } catch (error) {
    next(error);
  }
};

