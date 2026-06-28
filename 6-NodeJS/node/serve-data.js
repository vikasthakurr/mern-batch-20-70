// --- SERVING JSON & HTML ---

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- SERVING HTML ---

// Method 1: Inline HTML
// res.writeHead(200, { "Content-Type": "text/html" });
// res.end(`<html><body><h1>Welcome!</h1></body></html>`);

// Method 2: Serve HTML File
// fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, data) => {
//   if (err) { res.writeHead(500); return res.end("Error"); }
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end(data);
// });

// Method 3: Dynamic HTML (Template Literals)
// const userName = "Vikas";
// const courses = ["HTML", "CSS", "JavaScript", "Node.js"];
// res.end(`
//   <h1>Hello ${userName}!</h1>
//   <ul>${courses.map(c => `<li>${c}</li>`).join("")}</ul>
// `);

// --- SERVING JSON ---

// JSON is the most common format for APIs.
// Frontend (React) communicates with backend using JSON.

// Simple JSON:
// res.writeHead(200, { "Content-Type": "application/json" });
// res.end(JSON.stringify({ id: 1, name: "Vikas", role: "developer" }));

// JSON from File:
// fs.readFile("./products.json", "utf-8", (err, data) => {
//   if (err) { res.writeHead(500); return res.end("Error"); }
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(data); // Already JSON string from file
// });

// --- API RESPONSE PATTERNS ---

// Success: { "success": true, "message": "Fetched", "data": [...] }
// Error:   { "success": false, "error": "Something went wrong" }

// --- HELPER FUNCTIONS ---

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function sendHTML(res, statusCode, html) {
  res.writeHead(statusCode, { "Content-Type": "text/html" });
  res.end(html);
}

function sendError(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, error: message }));
}

// --- COMPLETE EXAMPLE ---

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    sendHTML(
      res,
      200,
      `<html><body><h1>Welcome!</h1><p>Visit /api/users for JSON</p></body></html>`,
    );
  } else if (req.url === "/api/users" && req.method === "GET") {
    const users = [
      { id: 1, name: "Vikas", city: "Delhi" },
      { id: 2, name: "Rahul", city: "Mumbai" },
    ];
    sendJSON(res, 200, { success: true, data: users });
  } else if (req.url === "/page" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "vikas.html"), "utf-8", (err, data) => {
      if (err) return sendError(res, 500, "File not found");
      sendHTML(res, 200, data);
    });
  } else {
    sendError(res, 404, "Route not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

// --- SERVING STATIC FILES (CSS, JS, Images) ---

// const MIME_TYPES = {
//   ".html": "text/html",
//   ".css": "text/css",
//   ".js": "text/javascript",
//   ".json": "application/json",
//   ".png": "image/png",
//   ".jpg": "image/jpeg",
// };
//
// const server = http.createServer((req, res) => {
//   let filePath = path.join(__dirname, "public", req.url);
//   if (req.url === "/") filePath = path.join(__dirname, "public", "index.html");
//   const ext = path.extname(filePath);
//   const contentType = MIME_TYPES[ext] || "text/plain";
//   fs.readFile(filePath, (err, data) => {
//     if (err) { res.writeHead(404); return res.end("Not found"); }
//     res.writeHead(200, { "Content-Type": contentType });
//     res.end(data);
//   });
// });

// --- KEY POINTS ---

// 1. Set "Content-Type": "application/json" for JSON responses
// 2. Set "Content-Type": "text/html" for HTML responses
// 3. Use JSON.stringify() to convert objects to JSON string
// 4. Use fs.readFile() to serve HTML/JSON files from disk
// 5. Template literals make dynamic HTML easy
// 6. APIs typically follow success/error response patterns
// 7. Always handle file read errors gracefully
// 8. Static file serving needs MIME type detection
// 9. Express does all this automatically (express.static, res.json)
// 10. path.join() creates safe file paths across OS
