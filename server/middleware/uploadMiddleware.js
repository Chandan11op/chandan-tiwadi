import multer from 'multer';

// Use memory storage to avoid writing ephemeral files to Render's filesystem
const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'application/pdf', // Certificates can be uploaded as PDF or image
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Allowed formats: JPG, PNG, WEBP, SVG, GIF, PDF.'), false);
  }
};

const documentFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF documents are allowed for resumes/documents.'), false);
  }
};

export const uploadImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for high-res certificates & portraits
  fileFilter: imageFilter,
});

export const uploadDocument = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit for PDF resumes
  fileFilter: documentFilter,
});

