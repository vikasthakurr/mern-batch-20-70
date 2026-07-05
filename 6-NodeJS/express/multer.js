// ================================
// MULTER - File Upload Middleware for Node.js/Express
// ================================

// What is Multer?
// - Multer is a Node.js middleware for handling multipart/form-data (file uploads)
// - It is primarily used for uploading files
// - Multer adds a body object and a file/files object to the request object
// - It will NOT process any form which is not multipart (multipart/form-data)

// Installation:
// npm install multer

// ================================
// 1. BASIC USAGE (Simple destination)
// ================================

// The simplest way - just specify a destination folder
// Files will be saved with random names (no extension)

// const upload = multer({ dest: "uploads/" });

// ================================
// 2. DISK STORAGE (Full control over file storage)
// ================================

// DiskStorage gives you full control over storing files to disk

import multer from "multer";

const storage = multer.diskStorage({
  // destination: where files will be stored
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // files will be saved in "uploads/" folder
  },

  // filename: what the file will be named
  filename: function (req, file, cb) {
    // Option 1: Keep original filename
    cb(null, file.originalname);

    // Option 2: Add unique suffix to avoid name conflicts
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, uniqueSuffix + "-" + file.originalname);

    // Option 3: Keep unique name with original extension
    // const ext = file.originalname.split(".").pop();
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });

// ================================
// 3. UPLOAD METHODS
// ================================

// upload.single("fieldName")   -> Uploads a single file. File available at req.file
// upload.array("fieldName", maxCount) -> Uploads multiple files. Files at req.files
// upload.fields([{ name: "avatar" }, { name: "gallery", maxCount: 8 }]) -> Mixed fields
// upload.none()                -> Only text fields, no files

// ================================
// 4. USAGE IN EXPRESS ROUTES
// ================================

// Single file upload:
// app.post("/upload", upload.single("dp"), (req, res) => {
//   console.log(req.file);  // uploaded file info
//   console.log(req.body);  // text fields
// });

// Multiple files upload:
// app.post("/gallery", upload.array("photos", 5), (req, res) => {
//   console.log(req.files); // array of uploaded files
// });

// ================================
// 5. FILE OBJECT PROPERTIES (req.file)
// ================================

// req.file contains:
// {
//   fieldname: 'dp',              -> field name from the form
//   originalname: 'photo.jpg',    -> original file name
//   encoding: '7bit',             -> encoding type
//   mimetype: 'image/jpeg',       -> MIME type
//   destination: 'uploads/',      -> folder where file is saved
//   filename: 'photo.jpg',        -> saved file name
//   path: 'uploads/photo.jpg',    -> full path of saved file
//   size: 12345                   -> file size in bytes
// }

// ================================
// 6. FILE FILTER (Accept/Reject files)
// ================================

// You can filter which files to accept

const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Only image files are allowed!"), false); // reject file
  }
};

const uploadWithFilter = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// ================================
// 7. ERROR HANDLING
// ================================

// app.post("/upload", (req, res) => {
//   upload.single("dp")(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       // Multer-specific error (e.g., file too large)
//       return res.status(400).json({ error: err.message });
//     } else if (err) {
//       // Other errors (e.g., file filter rejection)
//       return res.status(400).json({ error: err.message });
//     }
//     // File uploaded successfully
//     res.json({ file: req.file });
//   });
// });

// ================================
// IMPORTANT NOTES:
// ================================
// - Always create the "uploads/" folder before running the server
// - Multer does NOT handle file deletion - use fs.unlinkSync() to remove files
// - For production, consider using cloud storage (like Cloudinary) instead of disk
// - Always validate file types and sizes for security
// - multipart/form-data must be set in the form's enctype attribute

export { upload, uploadWithFilter };
