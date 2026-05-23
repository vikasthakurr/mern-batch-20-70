/**
 * HOW JAVASCRIPT RUNS IN THE BROWSER
 *
 * 1. HTML Parsing:
 *    - The browser loads the HTML document and parses it into a DOM tree.
 *    - When it encounters a <script> tag (with or without src), it pauses parsing.
 *
 * 2. Fetching & Execution:
 *    - For external scripts, the browser fetches the JavaScript file over HTTP(S).
 *    - The fetched code is handed to the JavaScript engine (V8, SpiderMonkey, JavaScriptCore, etc.).
 *    - The engine parses the code into an Abstract Syntax Tree (AST) and compiles it to bytecode/JIT machine code.
 *
 * 3. Execution Context & Call Stack:
 *    - The global execution context is created; global variables become properties of the window object.
 *    - Functions are placed on the call stack when invoked; the stack follows LIFO order.
 *
 * 4. Event Loop & Web APIs:
 *    - While the call stack processes synchronous code, asynchronous APIs (setTimeout, fetch, DOM events) register callbacks.
 *    - These callbacks are placed in task queues (macrotasks, microtasks).
 *    - The event loop continuously checks the call stack; when empty, it processes the microtask queue first, then the macrotask queue.
 *    - This model enables non‑blocking UI updates and network handling.
 *
 * 5. Rendering:
 *    - After JavaScript modifies the DOM or CSSOM, the browser may perform layout and repaint cycles.
 *    - Rendering updates are batched for performance and synchronized with the display refresh rate.
 *
 * 6. Security & Sandbox:
 *    - JavaScript runs in a sandboxed environment; it cannot directly access the file system or arbitrary network resources without user permission.
 *    - Same‑origin policy governs network requests, and CSP (Content Security Policy) can further restrict script execution.
 */
