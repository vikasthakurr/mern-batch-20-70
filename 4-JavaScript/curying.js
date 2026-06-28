// =============================================================
// 📌 CURRYING IN JAVASCRIPT — NOTES
// =============================================================
//
// 🔷 WHAT IS CURRYING?
//   Currying is a functional programming technique where a
//   function that takes MULTIPLE arguments is transformed into
//   a sequence of functions, each taking ONE argument at a time.
//
//   Named after mathematician Haskell Curry.
//
//   Normal function:   add(1, 2, 3)
//   Curried function:  add(1)(2)(3)
//
//   Instead of passing all arguments at once, you pass them
//   one by one, and each call returns a new function waiting
//   for the next argument.
//
// =============================================================
// 🔷 HOW CURRYING WORKS
// =============================================================
//
//   Currying relies on CLOSURES — each returned function
//   "remembers" the arguments passed in previous calls.
//
//   Example:
//     function add(a) {
//       return function(b) {
//         return function(c) {
//           return a + b + c;  // all args remembered via closure
//         }
//       }
//     }
//     add(1)(2)(3); // Output: 6
//
//   (See the mail() example below — same concept applied!)
//
// =============================================================
// ✅ BENEFITS OF CURRYING
// =============================================================
//
//   1. PARTIAL APPLICATION
//      You can pre-fill some arguments and reuse the function
//      later with the remaining ones.
//      E.g., const mailToABC = mail("abc@gmail.com");
//            mailToABC("welcome")("Hi there!");
//            mailToABC("offer")("Congratulations!");
//
//   2. REUSABILITY & SPECIALIZATION
//      Curried functions can be specialized into smaller,
//      purpose-built functions from a single generic one.
//      Reduces code duplication significantly.
//
//   3. FUNCTION COMPOSITION
//      Currying makes it easier to compose functions together
//      in a pipeline (popular in functional programming with
//      libraries like Lodash, Ramda, etc.)
//
//   4. CLEANER & MORE READABLE CODE
//      Breaking a function into smaller single-argument functions
//      can make each step's intent clearer.
//
//   5. AVOIDS REPEATING ARGUMENTS
//      When you need to call the same function repeatedly with
//      some fixed arguments, currying lets you bake those in.
//
// =============================================================
// ❌ DRAWBACKS OF CURRYING
// =============================================================
//
//   1. HARDER TO READ FOR BEGINNERS
//      The chained call syntax mail("a")("b")("c") can be
//      confusing and unfamiliar to developers new to JS or
//      functional programming.
//
//   2. DEBUGGING DIFFICULTY
//      Stack traces with multiple nested returned functions
//      are harder to read and debug compared to normal calls.
//
//   3. OVERHEAD / OVER-ENGINEERING
//      For simple use cases, currying adds unnecessary complexity.
//      Not every multi-argument function needs to be curried.
//
//   4. PERFORMANCE
//      Each curried call creates a new function object in memory.
//      For performance-critical code, this overhead may matter.
//
//   💡 TIP: Currying is best used when you need partial
//      application or are working in a functional programming
//      style. Don't overuse it — keep code readable!
//
// =============================================================

// function mail(to, sub, body) {
//   console.log(
//     `mail has been sent to ${to} with subject ${sub} with body ${body}`,
//   );
// }
// mail("welcome");

function mail(to) {
  return function (sub) {
    return function (body) {
      console.log(
        `mail has been sent to ${to} with subject ${sub} with body ${body}`,
      );
    };
  };
}
mail("abc@gmail.com")("welcome")("hi");
