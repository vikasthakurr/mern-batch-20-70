// --- SETTING UP AN EXPRESS SERVER ---

// --- STEP-BY-STEP SETUP ---

// Step 1: mkdir my-express-app && cd my-express-app
// Step 2: npm init -y (creates package.json)
// Step 3: npm install express
// Step 4: (Optional) npm install -D nodemon
// Step 5: Create main file (index.js or app.js)
// Step 6: Add scripts in package.json:
//   "scripts": { "start": "node index.js", "dev": "nodemon index.js" }
// Step 7: Run with: npm run dev

// --- MINIMAL EXPRESS SERVER ---

import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World! Express is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// That's it! Just 6 lines for a working server.

// --- ADDING COMMON MIDDLEWARE ---

// Parse JSON body (for POST/PUT requests)
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static("public"));
// Files in /public folder are accessible at root URL
// public/style.css → http://localhost:3000/style.css

// Custom Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next(); // MUST call next()
});

// --- COMPLETE SERVER SETUP ---

// import express from "express";
// const app = express();
// const PORT = process.env.PORT || 3000;
//
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
//
// app.get("/", (req, res) => {
//   res.send("Welcome to Express!");
// });
//
// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK", uptime: process.uptime() });
// });
//
// // 404 Handler (must be LAST)
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });
//
// // Error Handler (4 params)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });
//
// app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

// --- ENVIRONMENT VARIABLES ---

// Never hardcode sensitive data. Use .env file.
// Step 1: npm install dotenv
// Step 2: Create .env file:
//   PORT=5000
//   DB_URL=mongodb://localhost/mydb
//   SECRET_KEY=mysecretkey123

// Step 3: Load in your app:
// import dotenv from "dotenv";
// dotenv.config();
// const PORT = process.env.PORT || 3000;

// Step 4: Add .env to .gitignore (NEVER push to GitHub!)

// --- package.json CONFIGURATION ---

// {
//   "name": "my-express-app",
//   "version": "1.0.0",
//   "type": "module",
//   "scripts": {
//     "start": "node index.js",
//     "dev": "nodemon index.js"
//   },
//   "dependencies": {
//     "express": "^4.18.2",
//     "dotenv": "^16.0.0"
//   },
//   "devDependencies": {
//     "nodemon": "^3.0.0"
//   }
// }

// --- KEY POINTS ---

// 1. npm init -y → creates package.json
// 2. npm install express → installs Express
// 3. import express from "express" (with "type": "module")
// 4. const app = express() → creates app instance
// 5. app.use() → applies middleware
// 6. express.json() → parses JSON body
// 7. express.static("public") → serves static files
// 8. app.listen(PORT) → starts the server
// 9. Use nodemon for auto-restart during development
// 10. Use .env for sensitive configuration
// 11. 404 handler goes AFTER all routes
// 12. Error handler takes 4 params (err, req, res, next)
