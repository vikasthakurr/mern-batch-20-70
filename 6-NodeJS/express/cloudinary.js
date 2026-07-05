// ================================
// CLOUDINARY - Cloud-based Image & Video Management
// ================================

// What is Cloudinary?
// - Cloudinary is a cloud-based service for managing images and videos
// - It provides upload, storage, transformation, and delivery via CDN
// - No need to store files on your own server
// - Supports automatic image optimization, resizing, cropping, etc.
// - Free tier: 25 credits/month (approx 25GB storage + 25GB bandwidth)

// Installation:
// npm install cloudinary

// ================================
// 1. CONFIGURATION
// ================================

import { v2 as cloudinary } from "cloudinary";

// Configure with your Cloudinary credentials (from Cloudinary Dashboard)
cloudinary.config({
  cloud_name: "your_cloud_name", // e.g., "dkvadetm5"
  api_key: "your_api_key", // e.g., "651432329948399"
  api_secret: "your_api_secret", // e.g., "4sgZU5SWdswTuHRhbTZjyjUMJb0"
});

// IMPORTANT: Never expose api_secret in frontend code!
// Use environment variables in production:
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// ================================
// 2. UPLOADING FILES
// ================================

// Upload a file from local path (used with Multer)
// const result = await cloudinary.uploader.upload("uploads/photo.jpg");

// Upload with options:
// const result = await cloudinary.uploader.upload("uploads/photo.jpg", {
//   folder: "my-app/avatars",    // organize in folders
//   public_id: "user_123",       // custom public ID
//   overwrite: true,             // overwrite if same public_id exists
//   resource_type: "auto",       // auto-detect (image/video/raw)
// });

// ================================
// 3. UPLOAD RESPONSE OBJECT
// ================================

// cloudinary.uploader.upload() returns:
// {
//   public_id: 'sample',
//   version: 1234567890,
//   signature: 'abcdef123456',
//   width: 800,
//   height: 600,
//   format: 'jpg',
//   resource_type: 'image',
//   url: 'http://res.cloudinary.com/demo/image/upload/v1234/sample.jpg',
//   secure_url: 'https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg',
//   bytes: 120000,
//   created_at: '2024-01-01T00:00:00Z'
// }

// Always use secure_url (https) for production

// ================================
// 4. COMPLETE EXAMPLE WITH EXPRESS + MULTER
// ================================

// This is how Multer + Cloudinary work together (from api.js):
//
// 1. Multer saves the uploaded file temporarily to "uploads/" folder
// 2. We upload that file to Cloudinary using the file path
// 3. Cloudinary returns the cloud URL
// 4. We delete the local file using fs.unlinkSync()
// 5. We send the Cloudinary response to the client

// app.post("/upload", upload.single("dp"), async (req, res) => {
//   try {
//     const file = req.file;
//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(file.path);
//     // Delete local file after upload
//     fs.unlinkSync(file.path);
//     // Send Cloudinary response
//     res.send(result);
//   } catch (error) {
//     fs.unlinkSync(req.file.path);
//     res.status(500).send({
//       message: "An error occurred during the upload.",
//       error: error.message,
//     });
//   }
// });

// ================================
// 5. DELETING FILES FROM CLOUDINARY
// ================================

// Delete by public_id:
// await cloudinary.uploader.destroy("public_id_here");

// Example:
// const deleteResult = await cloudinary.uploader.destroy("my-app/avatars/user_123");
// Returns: { result: "ok" } on success

// ================================
// 6. IMAGE TRANSFORMATIONS (URL-based)
// ================================

// Cloudinary can transform images on-the-fly via URL:

// Resize to 300x300:
// cloudinary.url("sample", { width: 300, height: 300, crop: "fill" });

// Create thumbnail:
// cloudinary.url("sample", { width: 150, height: 150, crop: "thumb", gravity: "face" });

// Apply effects:
// cloudinary.url("sample", { effect: "grayscale" });
// cloudinary.url("sample", { effect: "blur:300" });

// ================================
// 7. FLOW DIAGRAM
// ================================

// Client (form/Postman)
//   |
//   | multipart/form-data (file + fields)
//   v
// Express Server
//   |
//   | Multer saves file to "uploads/" (temporary)
//   v
// Cloudinary Upload (file.path -> cloud)
//   |
//   | Returns secure_url
//   v
// Delete local file (fs.unlinkSync)
//   |
//   | Send response with cloud URL
//   v
// Client receives Cloudinary URL

// ================================
// IMPORTANT NOTES:
// ================================
// - Always delete local files after uploading to Cloudinary (fs.unlinkSync)
// - Use environment variables for credentials in production
// - Cloudinary URLs are served via CDN (fast globally)
// - Free tier has limited credits - monitor usage on dashboard
// - secure_url (https) should be used over url (http)
// - Store the public_id in your database to delete/update later

export default cloudinary;
