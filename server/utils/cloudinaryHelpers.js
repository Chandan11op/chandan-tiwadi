import { Readable } from 'stream';
import cloudinary, { isCloudinaryConfigured } from '../config/cloudinary.js';

/**
 * Builds an auto-compressed, auto-format delivery URL for any Cloudinary image.
 * Injects:
 * - f_auto: Automatically serves AVIF/WebP based on browser capabilities
 * - q_auto:good: Perceptual quality compression reducing payload by 70-85%
 * - w_1920,c_limit: Limits maximum bounds preserving aspect ratio
 * 
 * @param {string} secureUrl - Original Cloudinary secure URL
 * @param {Object} [options]
 * @param {number} [options.width=1920] - Max width
 * @returns {string} Optimized CDN delivery URL
 */
export const buildOptimizedCloudinaryUrl = (secureUrl, options = {}) => {
  if (!secureUrl || typeof secureUrl !== 'string' || !secureUrl.includes('res.cloudinary.com')) {
    return secureUrl;
  }
  if (secureUrl.includes('/raw/') || secureUrl.toLowerCase().endsWith('.pdf')) {
    return secureUrl;
  }
  if (secureUrl.includes('/f_auto') || secureUrl.includes('q_auto')) {
    return secureUrl;
  }
  const width = options.width || 1920;
  const transform = `f_auto,q_auto:good,w_${width},c_limit`;
  return secureUrl.replace('/image/upload/', `/image/upload/${transform}/`);
};

/**
 * Uploads a buffer directly into Cloudinary using streams.
 * Automatically applies compression and format optimization for image assets.
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

    const isDocument = 
      options.resource_type === 'raw' || 
      options.is_document || 
      (options.folder && options.folder.includes('resumes'));

    // Automatically apply compression and dimension limits to images
    const defaultTransformations = isDocument
      ? undefined
      : [
          { width: 1920, height: 1920, crop: 'limit' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ];

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'portfolio/general',
        resource_type: options.resource_type || (isDocument ? 'auto' : 'image'),
        transformation: options.transformation || defaultTransformations,
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
