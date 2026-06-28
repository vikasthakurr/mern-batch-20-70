// --- HTTP MODULE BASICS ---

// HTTP = HyperText Transfer Protocol
// The 'http' module is BUILT-IN (no need to install).
// It allows Node.js to transfer data over HTTP.
// Used to create HTTP servers and make HTTP requests.

import http from "http";

// --- HTTP BASICS (Theory) ---

// When you type a URL in browser:
// 1. Browser sends an HTTP REQUEST to the server
// 2. Server processes the request
// 3. Server sends back an HTTP RESPONSE
// 4. Browser renders the response (HTML, JSON, etc.)

// HTTP Methods:
// GET    → Retrieve data (load a page, fetch data)
// POST   → Send data (form submission, login)
// PUT    → Update entire data
// PATCH  → Update partial data
// DELETE → Delete data

// HTTP Status Codes:
// 100-199 → Informational
// 200-299 → Successful (200 = OK, 201 = Created)
// 300-399 → Redirection (301 = Moved Permanently)
// 400-499 → Client Error (400 = Bad Request, 404 = Not Found)
// 500-599 → Server Error (500 = Internal Server Error)

// --- CREATING A BASIC SERVER ---

const server = http.createServer((req, res) => {
  // req = incoming request info (URL, method, headers, body)
  // res = what we send back to the client

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World from Node.js Server!");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

// --- REQUEST OBJECT (req) ---

// req.url     → The URL path ("/", "/about", "/api/users")
// req.method  → HTTP method (GET, POST, PUT, DELETE)
// req.headers → Request headers (content-type, authorization, etc.)

// --- RESPONSE OBJECT (res) ---

// res.statusCode = 200;                    → Set status code
// res.setHeader("key", "value");           → Set a header
// res.writeHead(200, { headers });         → Set status + headers together
// res.write("data");                       → Write data (can call multiple times)
// res.end("final data");                   → End the response (MUST be called)

// --- CONTENT TYPES ---

// text/plain       → Plain text
// text/html        → HTML content
// application/json → JSON data
// text/css         → CSS file
// text/javascript  → JavaScript file
// image/png        → PNG image

// Sending JSON:
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   const data = { name: "Vikas", age: 25 };
//   res.end(JSON.stringify(data));
// });

// Sending HTML:
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end("<h1>Welcome!</h1><p>This is HTML from Node.js</p>");
// });

// --- SENDING DIFFERENT CONTENT TYPES ---

// const server = http.createServer((req, res) => {
//   if (req.url === "/json") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Hello JSON" }));
//   } else if (req.url === "/html") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("<h1>Hello HTML</h1>");
//   } else {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello Plain Text");
//   }
// });

// --- KEY POINTS ---

// 1. http module is BUILT-IN (no npm install needed)
// 2. http.createServer() creates a server with callback(req, res)
// 3. req = request info (url, method, headers)
// 4. res = response object (what we send back)
// 5. ALWAYS call res.end() to finish the response
// 6. Set Content-Type header to tell browser what format data is in
// 7. server.listen(PORT) starts the server
// 8. Common ports: 3000, 5000, 8080 (for development)
// 9. Status 200 = success, 404 = not found, 500 = server error
// 10. This is the foundation - Express.js is built ON TOP of http module
