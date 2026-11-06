import { Readable } from 'stream';
import cloudinary, { isCloudinaryConfigured } from '../config/cloudinary.js';

/**
 * Uploads a buffer directly into Cloudinary using streams.
 * Uses native Node.js Readable stream - zero external streamifier dependency!
 * Eliminates saving temporary files on Render's ephemeral filesystem.
 */
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(
        new Error(
          'Cloudinary credentials are not configured on the server. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in the server environment.'
        )
      );
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'portfolio/general',
        resource_type: options.resource_type || 'auto',
        ...options,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

/**
 * Deletes an asset from Cloudinary
 */
export const deleteCloudinaryAsset = async (publicId, resourceType = 'image') => {
  if (!publicId || !isCloudinaryConfigured()) return null;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
    return result;
  } catch (error) {
    console.warn(`Failed to delete Cloudinary asset ${publicId}:`, error.message);
    return null;
  }
};
