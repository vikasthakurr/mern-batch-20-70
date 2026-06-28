// --- CREATING A SERVER WITHOUT EXPRESS ---

// Express is built ON TOP of Node's http module.
// Understanding raw http helps you understand:
// - How Express works internally
// - What problems Express solves for you
// - Core server concepts (request, response, routing)

import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;

// --- BASIC SERVER ---

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Server is running without Express!");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// --- HANDLING DIFFERENT ROUTES ---

// const server = http.createServer((req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("<h1>Home Page</h1>");
//   }
//   else if (req.url === "/about" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("<h1>About Page</h1>");
//   }
//   else if (req.url === "/api/users" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     const users = [{ id: 1, name: "Vikas" }, { id: 2, name: "Rahul" }];
//     res.end(JSON.stringify(users));
//   }
//   else {
//     res.writeHead(404, { "Content-Type": "text/html" });
//     res.end("<h1>404 - Page Not Found</h1>");
//   }
// });

// --- HANDLING POST REQUESTS ---

// Body data comes in CHUNKS (stream). Collect all chunks then parse.

// const server = http.createServer((req, res) => {
//   if (req.url === "/login" && req.method === "POST") {
//     let body = "";
//     req.on("data", (chunk) => { body += chunk.toString(); });
//     req.on("end", () => {
//       const parsedBody = JSON.parse(body);
//       console.log("Received:", parsedBody);
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "Login successful", user: parsedBody }));
//     });
//   }
// });

// --- SERVING HTML FILES ---

// const server = http.createServer((req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     const filePath = path.join(__dirname, "index.html");
//     fs.readFile(filePath, "utf-8", (err, data) => {
//       if (err) {
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         return res.end("Server Error");
//       }
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   }
// });

// --- COMPLETE CRUD EXAMPLE ---

// let todos = [
//   { id: 1, task: "Learn Node.js", done: false },
//   { id: 2, task: "Build a server", done: false }
// ];
//
// const server = http.createServer((req, res) => {
//   const { url, method } = req;
//
//   if (url === "/todos" && method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(todos));
//   }
//   else if (url === "/todos" && method === "POST") {
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//       const newTodo = JSON.parse(body);
//       newTodo.id = todos.length + 1;
//       todos.push(newTodo);
//       res.writeHead(201, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(newTodo));
//     });
//   }
//   else if (url.startsWith("/todos/") && method === "DELETE") {
//     const id = parseInt(url.split("/")[2]);
//     todos = todos.filter(t => t.id !== id);
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Deleted" }));
//   }
//   else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Route not found" }));
//   }
// });

// --- PROBLEMS WITHOUT EXPRESS ---

// 1. Manual routing with if/else → messy for large apps
// 2. No built-in body parser → must manually collect chunks
// 3. No middleware system → must handle everything ourselves
// 4. No static file serving → must read files manually
// 5. No template engine support → must build HTML strings
// 6. Error handling is complex
// 7. No built-in request validation
// Express solves ALL these problems!

// --- KEY POINTS ---

// 1. http.createServer() is the core of any Node.js server
// 2. Every request has: req.url, req.method, req.headers
// 3. POST body comes in chunks → collect with req.on("data")
// 4. Always call res.end() to finish the response
// 5. Set proper Content-Type headers for different responses
// 6. Manual routing uses if/else on req.url and req.method
// 7. Use fs.readFile() to serve HTML files
// 8. Use JSON.stringify() to send JSON responses
// 9. Express is built ON TOP of this http module
// 10. Learning this first helps you understand Express better
