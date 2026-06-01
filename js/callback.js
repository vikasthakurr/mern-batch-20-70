// =============================================================
// 📌 CALLBACKS IN JAVASCRIPT — NOTES
// =============================================================
//
// 🔷 WHAT IS A CALLBACK?
//   A callback is a function passed as an argument to another
//   function, which is then called (invoked) inside that outer
//   function after some operation is completed.
//
//   Example:
//     function greet(name, callback) {
//       console.log("Hello " + name);
//       callback(); // calling the passed function
//     }
//     greet("Vikas", () => console.log("Callback executed!"));
//
// =============================================================
// ✅ BENEFITS OF CALLBACKS
// =============================================================
//
//   1. ASYNCHRONOUS PROGRAMMING
//      Callbacks allow JavaScript to perform non-blocking
//      operations. E.g., reading files, making API calls,
//      or using setTimeout — code continues executing while
//      waiting for the async task to complete.
//
//   2. REUSABILITY & FLEXIBILITY
//      You can pass different functions as callbacks to the same
//      function, making it more flexible and reusable.
//      E.g., array methods like .map(), .filter(), .forEach()
//      all accept callbacks.
//
//   3. CONTROL OVER EXECUTION ORDER
//      Callbacks help you define what should happen AFTER
//      a task completes, giving you control over the sequence
//      of operations.
//
//   4. NON-BLOCKING / EVENT-DRIVEN MODEL
//      Node.js heavily uses callbacks to handle I/O without
//      blocking the main thread, making apps more performant.
//
// =============================================================
// ❌ DRAWBACKS OF CALLBACKS
// =============================================================
//
//   1. CALLBACK HELL (Pyramid of Doom)
//      When callbacks are nested inside callbacks, the code
//      becomes deeply indented and hard to read.
//      (See the makeMaggi example below — this is callback hell!)
//
//   2. DIFFICULT ERROR HANDLING
//      Managing errors in nested callbacks is tricky. You have
//      to manually pass and check errors at every level.
//
//   3. POOR READABILITY & MAINTAINABILITY
//      Deeply nested callbacks make code hard to understand,
//      debug, and maintain over time.
//
//   4. INVERSION OF CONTROL
//      You hand over control of your callback to a third-party
//      function. You trust that it will call your function
//      correctly — which can be risky.
//
//   💡 SOLUTION: Promises and async/await were introduced to
//      solve these problems and write cleaner async code.
//
// =============================================================

// function automail(to, sub, body) {
//   console.log(`mail sent to ${to} with subject ${sub} and body ${body}`);
// }
// // automail("welcome onboard", "hi from vikas");

// function sayHi(name) {
//   setTimeout(() => {
//     console.log("hi");
//     cb();
//   }, 2000);
// }
// // sayHi("vikas");
// function sayBye() {
//   console.log("bye");
// }
// sayHi("vikas", sayBye);

function makeMaggi(rawmaggi, cb) {
  console.log("maggi process started");
  cb();
}
function boilWater(cb) {
  console.log("water boiled");
  cb();
}
function addMasala(cb) {
  console.log("masala added");
  cb();
}
function serve(cb) {
  console.log("maggi served");
  cb();
}
makeMaggi("hakka", () => {
  boilWater(() => {
    addMasala(() => {
      serve(() => {
        console.log("maggi done and dusted");
      });
    });
  });
});
