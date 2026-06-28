// --- WHAT IS NODE.JS? ---

// Node.js is a JavaScript runtime environment built on Chrome's V8 engine.
// It allows you to run JavaScript OUTSIDE the browser (on servers, desktops, etc.)

// Before Node.js → JavaScript could only run in browsers.
// After Node.js  → JavaScript can run on servers, build APIs, CLI tools, etc.

// --- KEY FEATURES ---

// 1. Event-Driven
// Node.js uses an event-driven architecture.
// Instead of waiting for tasks to complete, it registers callbacks
// and continues executing other code. When the task finishes,
// the callback is triggered (like an "event").

// Example:
// import fs from "fs";
// fs.readFile("file.txt", (err, data) => {
//   console.log(data); // This runs when reading is DONE
// });
// console.log("This runs FIRST - not blocked!");

// 2. Non-Blocking I/O
// I/O = Input/Output operations (reading files, database queries, network requests)
// Non-Blocking means Node.js does NOT wait for I/O operations to finish.
// It moves to the next line of code and handles the result later via callbacks.

// Blocking (Traditional way - like PHP, Java):
// const data = readFileSync("file.txt"); // WAITS here
// console.log(data);
// console.log("next task"); // Runs AFTER file is read

// Non-Blocking (Node.js way):
// readFile("file.txt", (err, data) => { console.log(data); });
// console.log("next task"); // Runs IMMEDIATELY

// 3. Single-Threaded
// Node.js runs on a single thread but handles multiple requests
// using the event loop. This makes it lightweight and efficient.

// --- WHY USE NODE.JS? ---

// 1. Fast Execution - Built on V8 engine (same engine as Chrome)
// 2. Non-Blocking - Can handle thousands of concurrent connections
// 3. Single Language - Use JavaScript for both frontend & backend
// 4. NPM Ecosystem - Largest package registry in the world (2M+ packages)
// 5. Real-time Apps - Great for chat apps, live streaming, gaming
// 6. Scalable - Handles many connections with minimal resources
// 7. Active Community - Huge support, lots of libraries

// --- WHERE IS NODE.JS USED? ---

// - Web Servers & APIs (Express.js, Fastify)
// - Real-time applications (Chat apps, Socket.io)
// - Streaming services (Netflix uses Node.js)
// - Command Line Tools (CLI apps)
// - Microservices architecture
// - IoT (Internet of Things)
// - Server-Side Rendering (Next.js)

// --- WHO USES NODE.JS? ---

// Netflix, LinkedIn, PayPal, Uber, NASA, Walmart, Twitter, eBay

// --- SIMPLE EXAMPLE ---

console.log("Hello from Node.js!");
console.log("I am running OUTSIDE the browser!");

// Run this file: node whatisnodejs.js

// --- KEY POINTS ---

// 1. Node.js is NOT a language - it's a RUNTIME ENVIRONMENT
// 2. Node.js is NOT a framework - Express is a framework
// 3. It uses V8 engine (written in C++) to execute JavaScript
// 4. Event-Driven = works on events & callbacks
// 5. Non-Blocking I/O = doesn't wait for slow operations
// 6. Single-Threaded = one thread handles everything via event loop
// 7. Best for I/O heavy tasks (APIs, file operations, real-time)
// 8. NOT ideal for CPU heavy tasks (video encoding, complex math)
