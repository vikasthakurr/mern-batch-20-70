// --- HANDLING REQUESTS & RESPONSES ---

import http from "http";

// --- HTTP REQUEST-RESPONSE CYCLE ---

// Client (Browser/Postman) sends REQUEST → Server processes it
// → Server sends back RESPONSE → Client displays it

// REQUEST contains: URL, Method, Headers, Body
// RESPONSE contains: Status Code, Headers, Body

// --- REQUEST OBJECT (req) ---

const server = http.createServer((req, res) => {
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("HTTP Version:", req.httpVersion);
  res.end("Check console for request info");
});

// --- PARSING URL & QUERY STRINGS ---

// URL: http://localhost:3000/products?category=phone&price=1000

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   console.log("Pathname:", parsedUrl.pathname);  // /products
//   console.log("Query:", parsedUrl.query);        // { category: 'phone', price: '1000' }
//   res.end("URL parsed");
// });

// Modern way (URL constructor):
// const myUrl = new URL(req.url, `http://${req.headers.host}`);
// console.log("Pathname:", myUrl.pathname);
// console.log("Search Params:", myUrl.searchParams.get("category"));

// --- HANDLING GET REQUESTS ---

// const server = http.createServer((req, res) => {
//   if (req.url === "/users" && req.method === "GET") {
//     const users = [{ id: 1, name: "Vikas" }, { id: 2, name: "Rahul" }];
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(users));
//   }
// });

// --- HANDLING POST REQUESTS (Body Data) ---

// POST/PUT requests send data in the BODY.
// Body comes in CHUNKS (streams) - must collect them.

// const server = http.createServer((req, res) => {
//   if (req.url === "/register" && req.method === "POST") {
//     let body = "";
//     req.on("data", (chunk) => { body += chunk.toString(); });
//     req.on("end", () => {
//       const userData = JSON.parse(body);
//       console.log("Received:", userData);
//       res.writeHead(201, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "User registered!", user: userData }));
//     });
//     req.on("error", (err) => {
//       res.writeHead(400);
//       res.end("Error receiving data");
//     });
//   }
// });

// --- RESPONSE OBJECT (res) ---

// res.writeHead(statusCode, headers) → Set status & headers
// res.setHeader("key", "value")      → Set single header
// res.write(data)                    → Write body data
// res.end(data)                      → End response (MUST call)

// Sending Text:
// res.writeHead(200, { "Content-Type": "text/plain" });
// res.end("Hello World");

// Sending HTML:
// res.writeHead(200, { "Content-Type": "text/html" });
// res.end("<h1>Welcome</h1>");

// Sending JSON:
// res.writeHead(200, { "Content-Type": "application/json" });
// res.end(JSON.stringify({ success: true, data: [] }));

// Custom Headers:
// res.setHeader("X-Powered-By", "Node.js");
// res.setHeader("Access-Control-Allow-Origin", "*");

// --- STATUS CODES IN PRACTICE ---

// 200 - OK (successful GET request)
// 201 - Created (successful POST - new resource created)
// 204 - No Content (successful DELETE)
// 400 - Bad Request (invalid data from client)
// 401 - Unauthorized (not logged in)
// 403 - Forbidden (logged in but no permission)
// 404 - Not Found (route doesn't exist)
// 500 - Internal Server Error (server crashed)

// --- COMPLETE EXAMPLE ---

// const server = http.createServer((req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//
//   if (req.method === "GET" && req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("<h1>Home Page</h1>");
//   }
//   else if (req.method === "GET" && req.url === "/api/data") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ items: [1, 2, 3] }));
//   }
//   else if (req.method === "POST" && req.url === "/api/data") {
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//       res.writeHead(201, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ received: JSON.parse(body) }));
//     });
//   }
//   else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });

server.listen(3000, () => console.log("Server on port 3000"));

// --- KEY POINTS ---

// 1. req.url → URL path, req.method → HTTP method
// 2. POST body comes in chunks → use req.on("data") + req.on("end")
// 3. Always set Content-Type header before sending response
// 4. Always call res.end() to complete the response
// 5. Use JSON.stringify() for sending objects as JSON
// 6. Use JSON.parse() for converting received string to object
// 7. Status codes communicate success/failure to client
// 8. CORS headers needed for cross-origin requests
// 9. res.writeHead() sets status + headers together
// 10. Express automates most of this (body parsing, routing, etc.)
