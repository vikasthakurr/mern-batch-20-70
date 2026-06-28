// --- NODE.JS vs BROWSER JAVASCRIPT ---

// Both Node.js and Browser run JavaScript, but in DIFFERENT environments.
// Same language, different capabilities.
// Browser JS → For building web pages (DOM, UI, user interaction)
// Node.js    → For building servers, APIs, CLI tools (backend)

// --- COMPARISON TABLE ---

// Feature          | Browser JS              | Node.js
// -----------------+-------------------------+------------------------
// Engine           | V8 (Chrome), SpiderMonkey| V8 (Chrome's engine)
// Purpose          | Frontend (UI)           | Backend (Server)
// DOM Access       | YES                     | NO
// window object    | YES                     | NO
// document object  | YES                     | NO
// global object    | window                  | global / globalThis
// File System      | NO (security)           | YES (fs module)
// OS Access        | NO                      | YES (os module)
// HTTP Server      | NO (only client)        | YES (create servers)
// npm packages     | Limited                 | Full access
// Module System    | ES Modules (import)     | CommonJS + ES Modules
// console.log      | YES                     | YES
// setTimeout       | YES                     | YES
// fetch API        | YES (built-in)          | YES (Node 18+)
// alert/prompt     | YES                     | NO
// process object   | NO                      | YES

// --- GLOBAL OBJECTS ---

// Browser: window, document, localStorage, navigator, alert(), prompt()
// Node.js: global, process, import.meta.url (in ES modules)

// In ES Modules, __dirname and __filename are NOT available.
// Use this workaround:
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("--- Node.js Globals ---");
console.log("process:", typeof process);
console.log("__dirname:", __dirname);
console.log("__filename:", __filename);

// --- WHAT BROWSER CAN DO THAT NODE.JS CANNOT ---

// 1. Manipulate DOM (document.getElementById, querySelector)
// 2. Show alerts, prompts, confirm dialogs
// 3. Access localStorage / sessionStorage
// 4. Handle click events, form submissions on UI
// 5. Use Web APIs (Geolocation, WebRTC, Canvas, WebGL)
// 6. Render HTML/CSS visually

// --- WHAT NODE.JS CAN DO THAT BROWSER CANNOT ---

// 1. Read/Write files on the computer (fs module)
// 2. Create HTTP/HTTPS servers
// 3. Access operating system info (os module)
// 4. Run shell commands (child_process module)
// 5. Connect to databases (MongoDB, MySQL, PostgreSQL)
// 6. Handle networking (TCP/UDP sockets)
// 7. Work with streams for large data

import os from "os";

// fs.writeFileSync("test.txt", "Hello from Node.js!");
// console.log("File created! (This is impossible in browser JS)");

console.log("\n--- OS Info (Node.js only) ---");
console.log("OS Type:", os.type());
console.log("CPU Cores:", os.cpus().length);
console.log("Free Memory:", Math.round(os.freemem() / 1024 / 1024), "MB");
console.log("Home Directory:", os.homedir());

// --- WHAT BOTH CAN DO ---

// 1. console.log()
// 2. Variables (let, const, var)
// 3. Functions, Arrow functions
// 4. Promises, async/await
// 5. setTimeout, setInterval
// 6. Array methods (map, filter, reduce, forEach)
// 7. Object manipulation
// 8. JSON.parse(), JSON.stringify()
// 9. Error handling (try/catch)
// 10. fetch() (Node 18+ has built-in fetch)

// --- THIS KEYWORD DIFFERENCE ---

// Browser: 'this' in global scope = window
// Node.js (ES Module): 'this' in module scope = undefined
// Node.js (CommonJS): 'this' in module scope = module.exports

console.log("\n--- 'this' in Node.js ES Module ---");
console.log("this:", this); // undefined in ES module top level

// --- KEY POINTS ---

// 1. Same JavaScript language, DIFFERENT runtime environments
// 2. Browser has DOM, window, document → Node.js does NOT
// 3. Node.js has fs, os, process, http → Browser does NOT
// 4. Browser uses ES Modules, Node.js supports both CommonJS & ES Modules
// 5. Node.js can access file system, databases, networks directly
// 6. Browser is sandboxed (restricted for security)
// 7. global (Node) = window (Browser)
// 8. Both share core JS: arrays, objects, promises, async/await
// 9. Full stack JS = Browser (frontend) + Node.js (backend)
