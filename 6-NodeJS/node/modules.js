// --- COMMONJS vs ES MODULES ---

// --- WHAT ARE MODULES? ---

// Modules = Breaking code into separate files for reusability.
// Benefits:
// - Code organization (clean structure)
// - Reusability (use same code in multiple places)
// - Maintainability (easy to find and fix bugs)
// - Avoid naming conflicts (each module has its own scope)

// --- TWO MODULE SYSTEMS IN NODE.JS ---

// 1. CommonJS (CJS) → Original Node.js module system
//    - Uses require() and module.exports
//    - Synchronous loading
//    - Works in Node.js only

// 2. ES Modules (ESM) → Modern JavaScript standard
//    - Uses import and export
//    - Asynchronous loading
//    - Works in both Browser and Node.js

// --- COMMONJS SYNTAX ---

// Exporting (math.js):
// function add(a, b) { return a + b; }
// module.exports = { add };

// Importing:
// const { add } = require("./math");

// Built-in modules:
// const fs = require("fs");
// const http = require("http");

// --- ES MODULES SYNTAX ---

// To use ES Modules in Node.js:
// Option 1: Add "type": "module" in package.json
// Option 2: Use .mjs file extension

// Named Export (math.js):
// export function add(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }
// export const PI = 3.14159;

// Named Import:
// import { add, subtract, PI } from "./math.js";

// Default Export (one per file):
// export default function greet(name) { return `Hello ${name}`; }

// Default Import:
// import greet from "./math.js";
// import anyName from "./math.js";  // Can use any name for default

// Import everything:
// import * as math from "./math.js";
// math.add(2, 3);

// Built-in modules:
// import fs from "fs";
// import path from "path";
// import http from "http";

// --- COMPARISON TABLE ---

// Feature          | CommonJS (CJS)           | ES Modules (ESM)
// -----------------+--------------------------+------------------------
// Syntax           | require() / module.exports| import / export
// Loading          | Synchronous              | Asynchronous
// File Extension   | .js (default)            | .mjs or "type":"module"
// Top-level await  | NO                       | YES
// Browser Support  | NO                       | YES
// Node.js Support  | YES (default)            | YES (with config)
// Dynamic Import   | require() anywhere       | import() function
// __dirname        | Available                | Need workaround
// __filename       | Available                | Need workaround
// JSON import      | require("./data.json")   | Needs assert clause
// Tree Shaking     | NO                       | YES

// --- __dirname & __filename IN ES MODULES ---

// In CommonJS: __dirname and __filename are available directly.
// In ES Modules: They are NOT available. Use this workaround:

import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("__filename:", __filename);
console.log("__dirname:", __dirname);

// --- DYNAMIC IMPORTS ---

// CommonJS - can require() anywhere:
// if (condition) {
//   const module = require("./module");
// }

// ES Modules - use import() function (returns Promise):
// if (condition) {
//   const module = await import("./module.js");
// }

// --- WHICH ONE TO USE? ---

// For NEW projects → Use ES Modules (modern standard)
// For EXISTING projects → Keep using what's already there
// For Frontend (React, Vue) → ES Modules (always)
// Industry trend: Moving towards ES Modules

// --- CODE DEMO ---

const mathOperations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : "Cannot divide by zero"),
};

console.log("--- Module Demo ---");
console.log("Add: 5 + 3 =", mathOperations.add(5, 3));
console.log("Subtract: 10 - 4 =", mathOperations.subtract(10, 4));
console.log("Multiply: 6 * 7 =", mathOperations.multiply(6, 7));
console.log("Divide: 20 / 4 =", mathOperations.divide(20, 4));

// --- KEY POINTS ---

// 1. CommonJS = require() + module.exports (Node.js original)
// 2. ES Modules = import + export (modern standard)
// 3. Add "type": "module" in package.json to use ES Modules
// 4. CommonJS is synchronous, ES Modules are asynchronous
// 5. You cannot mix require() and import in the same file
// 6. ES Modules need file extension in import path (.js)
// 7. Default export = one per file, named export = many per file
// 8. __dirname/__filename not available in ES Modules (need workaround)
// 9. Industry is moving towards ES Modules
// 10. Both systems cache modules (loaded only once)
