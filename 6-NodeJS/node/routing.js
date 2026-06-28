// --- MANUAL ROUTING IN NODE.JS ---

// Routing = Deciding what to do based on the URL and HTTP method.
// Without Express, we handle routing manually using if/else.

import http from "http";

// --- BASIC ROUTING (if/else) ---

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  const method = req.method;

  if (reqUrl === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Home Page</h1>");
  } else if (reqUrl === "/about" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Us</h1><p>We teach MERN Stack</p>");
  } else if (reqUrl === "/contact" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Contact</h1><p>Email: info@example.com</p>");
  } else if (reqUrl === "/api/users" && method === "GET") {
    const users = [
      { id: 1, name: "Vikas" },
      { id: 2, name: "Rahul" },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// --- HANDLING DYNAMIC ROUTES ---

// Express: app.get("/users/:id")  → req.params.id
// Manual: Parse the URL ourselves.

// const users = [
//   { id: 1, name: "Vikas", age: 25 },
//   { id: 2, name: "Rahul", age: 22 },
// ];
//
// if (req.url.startsWith("/users/") && req.method === "GET") {
//   const id = parseInt(req.url.split("/")[2]);
//   const user = users.find(u => u.id === id);
//   if (user) {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(user));
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "User not found" }));
//   }
// }

// --- HANDLING QUERY STRINGS ---

// URL: http://localhost:3000/search?q=nodejs&page=1

// if (req.url.startsWith("/search") && req.method === "GET") {
//   const parsedUrl = url.parse(req.url, true);
//   const query = parsedUrl.query;
//   console.log("Search:", query.q);
//   console.log("Page:", query.page);
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ search: query.q, page: query.page }));
// }

// --- FULL CRUD ROUTING (without Express) ---

// let products = [
//   { id: 1, name: "Laptop", price: 50000 },
//   { id: 2, name: "Phone", price: 20000 },
// ];
//
// if (reqUrl === "/products" && method === "GET") {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(products));
// }
// else if (reqUrl.match(/\/products\/\d+/) && method === "GET") {
//   const id = parseInt(reqUrl.split("/")[2]);
//   const product = products.find(p => p.id === id);
//   if (product) {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(product));
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not found" }));
//   }
// }
// else if (reqUrl === "/products" && method === "POST") {
//   let body = "";
//   req.on("data", chunk => body += chunk);
//   req.on("end", () => {
//     const newProduct = JSON.parse(body);
//     newProduct.id = products.length + 1;
//     products.push(newProduct);
//     res.writeHead(201, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(newProduct));
//   });
// }
// else if (reqUrl.match(/\/products\/\d+/) && method === "DELETE") {
//   const id = parseInt(reqUrl.split("/")[2]);
//   products = products.filter(p => p.id !== id);
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ message: "Deleted" }));
// }

// --- PROBLEMS WITH MANUAL ROUTING ---

// 1. if/else becomes HUGE for many routes
// 2. No middleware support (auth, logging, CORS)
// 3. No built-in body parsing (must collect chunks)
// 4. Dynamic routes need manual parsing
// 5. No route grouping or organization
// 6. Error handling is repetitive
// This is WHY Express.js was created!

// --- KEY POINTS ---

// 1. Manual routing uses if/else on req.url + req.method
// 2. req.url.split("/") helps extract dynamic parameters
// 3. url.parse(req.url, true) extracts query strings
// 4. Use regex (url.match()) for pattern matching
// 5. POST/PUT body must be collected via chunks
// 6. Always send proper Content-Type headers
// 7. Always handle 404 for unknown routes
// 8. Manual routing is good for learning, Express for production
// 9. Express automates ALL of this with clean syntax
// 10. Understanding manual routing = understanding Express internally
