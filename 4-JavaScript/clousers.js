// =============================================================
// 📌 CLOSURES IN JAVASCRIPT — NOTES
// =============================================================
//
// 🔷 WHAT IS A CLOSURE?
//   A closure is a function that "remembers" the variables from
//   its outer (enclosing) scope even after that outer function
//   has finished executing.
//
//   In other words: A closure gives you access to an outer
//   function's scope from an inner function.
//
//   JavaScript creates closures every time a function is created,
//   at function creation time.
//
// =============================================================
// 🔷 HOW CLOSURES WORK — LEXICAL SCOPING
// =============================================================
//
//   JavaScript uses "lexical scoping" — a function can access
//   variables defined in the scope where it was WRITTEN,
//   not where it was CALLED.
//
//   When a function is returned or passed around, it carries
//   its surrounding scope (its "backpack") with it.
//
//   Example (see code below):
//     outer() runs and returns inner()
//     Even after outer() is done, inner() still remembers `a`
//     because it forms a closure over outer's scope.
//
// =============================================================
// ✅ BENEFITS OF CLOSURES
// =============================================================
//
//   1. DATA PRIVACY / ENCAPSULATION
//      Variables inside a closure are private — they can't be
//      accessed or modified from outside.
//      Great for hiding implementation details.
//
//   2. PERSISTENT STATE
//      Closures can maintain state between function calls
//      without using global variables.
//      E.g., counters, accumulators, memoization caches.
//
//   3. FUNCTION FACTORIES
//      You can create customized functions using closures.
//      E.g., makeMultiplier(2) returns a function that always
//      multiplies by 2.
//
//   4. MODULE PATTERN
//      Closures power the Module Pattern — a way to create
//      public and private members in JavaScript before ES6
//      modules existed.
//
//   5. CALLBACKS & EVENT HANDLERS
//      Closures are widely used in async callbacks and event
//      listeners, giving them access to surrounding variables.
//
// =============================================================
// ❌ DRAWBACKS OF CLOSURES
// =============================================================
//
//   1. MEMORY LEAKS
//      Since closures hold references to outer scope variables,
//      those variables are NOT garbage collected as long as the
//      closure exists. This can cause memory leaks if closures
//      are overused or not cleaned up properly.
//
//   2. INCREASED COMPLEXITY
//      Closures can make code harder to understand, especially
//      for beginners. Tracking which variables are "closed over"
//      requires careful attention.
//
//   3. DEBUGGING DIFFICULTY
//      Variables retained by closures don't show up obviously
//      in stack traces, making bugs harder to trace and fix.
//
//   4. ACCIDENTAL SHARING
//      In loops, all closures may share the same variable
//      reference (e.g., `var i` in a loop), causing unexpected
//      behavior. Use `let` or an IIFE to avoid this.
//
//   💡 TIP: Use closures intentionally. They are powerful but
//      should be used with an understanding of scope & memory.
//
// =============================================================

function outer() {
    let a = 20;

    function inner() {
        console.log(a)
    }
    return inner;
    // The inner function forms a closure, capturing variable `a` from the outer function's scope
}

let res = outer();
res();