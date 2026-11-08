/**
 * Automated Client-Side Image Compressor
 * 
 * Automatically compresses user-uploaded images in any format (PNG, JPG, JPEG, WebP, BMP, TIFF, etc.)
 * into lightweight, high-performance WebP images before uploading them over the wire.
 * 
 * Benefits:
 * - Dramatically reduces upload time (e.g. 10MB camera photo -> ~200KB in <100ms)
 * - Drastically improves website loading speeds for end users
 * - Prevents hitting server upload limits or network timeouts on mobile connections
 * - Automatically preserves document integrity: PDFs and SVGs are never compressed
 */

/**
 * Compresses an image file in the browser using HTML5 Canvas.
 * 
 * @param {File} file - Original file uploaded by user
 * @param {Object} [options]
 * @param {number} [options.maxWidth=1920] - Max allowed width
 * @param {number} [options.maxHeight=1920] - Max allowed height
 * @param {number} [options.quality=0.82] - Target visual quality (0.0 to 1.0)
 * @returns {Promise<File>} Compressed File or original if not an image / smaller
 */
export async function compressImageBeforeUpload(file, options = {}) {
  // If not a valid browser File, return as-is
  if (!file || !(file instanceof File)) {
    return file;
  }

  const type = (file.type || '').toLowerCase();

  // Documents and vector assets that should remain untouched
  if (
    type === 'application/pdf' ||
    type === 'image/svg+xml' ||
    type === 'image/gif' // Preserve GIF animations
  ) {
    return file;
  }

  // Only compress raster images
  if (!type.startsWith('image/')) {
    return file;
  }

  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.82,
  } = options;

  return new Promise((resolve) => {
    try {
      const reader = new FileReader();

      reader.onerror = () => {
        console.warn('FileReader error during compression, using original file.');
        resolve(file);
      };

      reader.onload = (e) => {
        const img = new Image();

        img.onerror = () => {
          console.warn('Image load error during compression, using original file.');
          resolve(file);
        };

        img.onload = () => {
          try {
            let { width, height } = img;

            // Downscale proportionally if larger than maximum bounds
            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height);
              width = Math.round(width * ratio);
              height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              return resolve(file);
            }

            // High-quality bicubic downscaling
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            // Prefer modern WebP format
            const outputMime = 'image/webp';

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  return resolve(file);
                }

                // If compressed version is somehow larger than original, keep original
                if (blob.size >= file.size) {
                  return resolve(file);
                }

                const originalName = file.name.replace(/\.[^/.]+$/, '');
                const compressedFile = new File([blob], `${originalName}.webp`, {
                  type: outputMime,
                  lastModified: Date.now(),
                });

                const reduction = Math.round((1 - compressedFile.size / file.size) * 100);
                console.info(
                  `⚡ Auto-compressed image: ${(file.size / 1024).toFixed(1)} KB -> ${(compressedFile.size / 1024).toFixed(1)} KB (${reduction}% size reduction)`
                );

                resolve(compressedFile);
              },
              outputMime,
              quality
            );
          } catch (canvasErr) {
            console.warn('Canvas rendering error, using original file:', canvasErr);
            resolve(file);
          }
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('Image compression exception, using original file:', err);
      resolve(file);
    }
  });
}
