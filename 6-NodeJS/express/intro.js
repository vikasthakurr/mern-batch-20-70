// --- WHAT IS EXPRESS & WHY USE IT? ---

// Express.js is a MINIMAL and FLEXIBLE web application framework for Node.js.
// It provides features to build web and mobile applications easily.
// Express is built ON TOP of Node's http module.

// Without Express: 50+ lines of code for basic server
// With Express: 5-10 lines for the same thing!

// --- WHY USE EXPRESS? ---

// Problems with raw http module:
// - Manual routing (if/else chains)
// - Manual body parsing (collecting chunks)
// - No middleware system
// - No static file serving
// - No template engine support

// Express solves ALL of this:
// - Clean routing (app.get, app.post, etc.)
// - Built-in body parsing (express.json())
// - Middleware support (auth, logging, CORS)
// - Static file serving (express.static())
// - Template engine support (EJS, Pug)
// - Easy error handling
// - Huge ecosystem of middleware

// --- EXPRESS vs RAW HTTP ---

// Raw HTTP:
// import http from "http";
// const server = http.createServer((req, res) => {
//   if (req.url === "/users" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify([{ name: "Vikas" }]));
//   } else if (req.url === "/users" && req.method === "POST") {
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//       res.writeHead(201, { "Content-Type": "application/json" });
//       res.end(body);
//     });
//   }
// });

// Express (same functionality):
import express from "express";
const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  res.json([{ name: "Vikas" }]);
});

app.post("/users", (req, res) => {
  res.status(201).json(req.body);
});

// --- INSTALLING EXPRESS ---

// npm init -y
// npm install express

// --- KEY EXPRESS CONCEPTS ---

// app = Express application instance

// Routing Methods:
// app.get(path, handler)    → Handle GET requests
// app.post(path, handler)   → Handle POST requests
// app.put(path, handler)    → Handle PUT requests
// app.delete(path, handler) → Handle DELETE requests
// app.all(path, handler)    → Handle ALL methods
// app.use(middleware)       → Apply middleware

// Request Object (req):
// req.params  → URL parameters (/users/:id → req.params.id)
// req.query   → Query strings (/search?q=node → req.query.q)
// req.body    → POST/PUT body data (needs express.json())
// req.headers → Request headers
// req.method  → HTTP method
// req.url     → Request URL

// Response Object (res):
// res.send()     → Send text/HTML response
// res.json()     → Send JSON response (auto sets Content-Type)
// res.status()   → Set status code (chainable)
// res.redirect() → Redirect to another URL
// res.render()   → Render a template (EJS, Pug)
// res.sendFile() → Send a file
// res.end()      → End response without data

// --- MIDDLEWARE ---

// Middleware = Functions that run BETWEEN request and response.
// They have access to req, res, and next() function.
// Uses: Authentication, Logging, CORS, Body parsing, Error handling

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
//   next(); // Pass to next middleware or route handler
// });

// Built-in middleware:
// app.use(express.json());           → Parse JSON body
// app.use(express.urlencoded());     → Parse form data
// app.use(express.static("public")); → Serve static files

// --- START SERVER ---

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.listen(3000, () => {
  console.log("Express server running on http://localhost:3000");
});

// --- KEY POINTS ---

// 1. Express = minimal web framework for Node.js
// 2. Built on top of Node's http module
// 3. Install: npm install express
// 4. app = express() creates the application
// 5. app.get/post/put/delete for routing
// 6. res.json() for JSON, res.send() for text/HTML
// 7. express.json() middleware parses request body
// 8. Middleware runs between request and response
// 9. next() passes control to next middleware
// 10. Express is the most popular Node.js framework
// 11. Used by: Uber, IBM, Accenture, and many more
