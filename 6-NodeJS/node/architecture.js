// --- NODE.JS ARCHITECTURE - EVENT LOOP & SINGLE-THREADED ---

// --- ARCHITECTURE OVERVIEW ---

// Node.js is built on:
// 1. V8 Engine (by Google) → Compiles JS to machine code
// 2. libuv (C++ library) → Handles async I/O, event loop, thread pool
// 3. Event Loop → Heart of Node.js, manages all async operations

// Architecture Diagram:
//  ┌─────────────────────────────────────┐
//  │         YOUR JAVASCRIPT CODE         │
//  ├─────────────────────────────────────┤
//  │          NODE.JS BINDINGS            │
//  ├──────────────┬──────────────────────┤
//  │   V8 ENGINE  │       libuv           │
//  │ (JS→Machine  │  (Event Loop,         │
//  │    Code)     │   Thread Pool,        │
//  │              │   Async I/O)          │
//  └──────────────┴──────────────────────┘

// --- SINGLE-THREADED NATURE ---

// Thread = A unit of execution in a program.
// Multi-Threaded (Java, C#) → Creates a new thread for each request.
// Single-Threaded (Node.js) → ONE thread handles ALL requests.

// But how can one thread handle thousands of requests?
// Answer: EVENT LOOP + NON-BLOCKING I/O

// Example:
// 1000 users request data from database.
// Multi-Threaded: Creates 1000 threads (heavy on memory).
// Node.js: 1 thread sends all 1000 requests, doesn't wait,
//          processes results as they come back via callbacks.

// --- EVENT LOOP - THE HEART OF NODE.JS ---

// The Event Loop allows Node.js to perform non-blocking
// operations despite being single-threaded.

// How it works:
// 1. Your code runs on the main thread (Call Stack)
// 2. Async operations (file read, DB query, setTimeout) go to background
// 3. When async operation completes → its callback goes to a QUEUE
// 4. Event Loop checks: "Is Call Stack empty?"
//    - YES → Picks callback from queue → Pushes to Call Stack
//    - NO  → Waits until Call Stack is empty

// --- EVENT LOOP PHASES ---

//  ┌───────────────────────────┐
//  │      timers                │  ← setTimeout, setInterval callbacks
//  ├───────────────────────────┤
//  │    pending callbacks       │  ← system-level callbacks
//  ├───────────────────────────┤
//  │      idle, prepare         │  ← internal use only
//  ├───────────────────────────┤
//  │        poll                │  ← I/O callbacks (file read, network)
//  ├───────────────────────────┤
//  │       check                │  ← setImmediate callbacks
//  ├───────────────────────────┤
//  │    close callbacks         │  ← socket.on('close') etc.
//  └───────────────────────────┘

// --- EVENT LOOP EXAMPLE ---

console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout callback");
}, 0);

setImmediate(() => {
  console.log("3. Immediate callback");
});

process.nextTick(() => {
  console.log("4. NextTick callback");
});

Promise.resolve().then(() => {
  console.log("5. Promise callback");
});

console.log("6. End");

// OUTPUT ORDER:
// 1. Start
// 6. End
// 4. NextTick callback
// 5. Promise callback
// 2. Timeout callback (or 3, order may vary)
// 3. Immediate callback (or 2, order may vary)

// --- PRIORITY ORDER ---

// 1. Synchronous code (Call Stack) → HIGHEST priority
// 2. process.nextTick() → Microtask queue
// 3. Promises (.then) → Microtask queue (after nextTick)
// 4. setTimeout/setInterval → Timer queue (Macrotask)
// 5. setImmediate → Check queue (Macrotask)
// 6. I/O callbacks → Poll queue

// --- THREAD POOL (libuv) ---

// Even though Node.js is single-threaded, libuv maintains a
// THREAD POOL (default 4 threads) for heavy operations:
// - File System operations
// - DNS lookups
// - Crypto operations
// - Compression (zlib)

// These run on separate threads, NOT on the main thread.
// When done, their callbacks are pushed to the event loop queue.

// You can increase thread pool size:
// process.env.UV_THREADPOOL_SIZE = 8;

// --- BLOCKING vs NON-BLOCKING ---

// BLOCKING (Bad for Node.js):
// Request 1: ████████████████░░░░ (others wait)
// Request 2: ░░░░░░░░░░░░░░░░████ (delayed)

// NON-BLOCKING (Node.js way):
// Request 1: ██░░██░░██ (runs in chunks)
// Request 2: ░░██░░██░░ (runs in between)
// Both handled concurrently on ONE thread!

// --- ASYNC EXAMPLE ---

console.log("\nA: Before file read");

// This goes to the thread pool (libuv)
// fs.readFile("./whatisnodejs.js", "utf-8", (err, data) => {
//   console.log("B: File read complete (callback)");
// });

console.log("C: After file read call");
// Output: A → C → B (file read is async, C doesn't wait for B)

// --- KEY POINTS ---

// 1. Node.js = V8 + libuv + Event Loop
// 2. Single-threaded but handles concurrency via Event Loop
// 3. Event Loop = continuously checks if callbacks are ready
// 4. Sync code ALWAYS runs first (Call Stack)
// 5. process.nextTick() has highest priority among async
// 6. Promises run before setTimeout/setImmediate
// 7. libuv thread pool handles heavy tasks (file I/O, crypto)
// 8. Default thread pool size = 4 (can be increased)
// 9. NEVER block the event loop with heavy sync operations
// 10. Node.js is ideal for I/O-heavy, NOT CPU-heavy tasks
