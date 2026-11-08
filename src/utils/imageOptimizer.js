/**
 * Universal Image URL Optimizer
 * 
 * Automatically applies Cloudinary CDN edge transformations to eliminate long load times:
 * - f_auto: Automatically serves AVIF or WebP depending on browser support
 * - q_auto:good: Intelligent perceptual compression reducing file size by 70-85% without visual loss
 * - c_limit,w_XXX: Prevents downloading excessive multi-megapixel images on smaller viewports
 * 
 * Safe with local assets and PDFs: returns non-Cloudinary or document URLs untouched.
 */

/**
 * Optimizes an image URL for high performance and fast loading.
 * 
 * @param {string} url - Original image URL
 * @param {Object} [options]
 * @param {number} [options.width] - Optional width limit (e.g. 400 for thumbnails, 800 for cards, 1920 for full screen)
 * @param {number} [options.height] - Optional height limit
 * @param {string} [options.quality='auto:good'] - Cloudinary quality mode
 * @returns {string} - Fast-loading, optimized image URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url || typeof url !== 'string') {
    return url || '';
  }

  // Cloudinary image URL optimization
  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
    // Avoid altering raw documents or PDFs
    if (url.includes('/raw/') || url.toLowerCase().endsWith('.pdf')) {
      return url;
    }

    const {
      width,
      height,
      quality = 'auto:good',
      crop = 'limit',
    } = options;

    const transforms = ['f_auto', `q_${quality}`];
    if (width) transforms.push(`w_${width}`, `c_${crop}`);
    if (height && !width) transforms.push(`h_${height}`, `c_${crop}`);
    if (width && height) transforms.push(`h_${height}`);

    if (!width && !height) {
      transforms.push('w_1920', 'c_limit');
    }

    const transformStr = transforms.join(',');

    // If URL already has a transformation block between /upload/ and /v12345/
    if (/\/upload\/[a-z0-9_,:-]+\/v\d+\//i.test(url)) {
      return url.replace(/\/upload\/[a-z0-9_,:-]+\//i, `/upload/${transformStr}/`);
    }

    // Insert transformations right after /image/upload/
    return url.replace('/image/upload/', `/image/upload/${transformStr}/`);
  }

  return url;
}

