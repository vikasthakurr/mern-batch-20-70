/**
 * JavaScript Execution Contexts
 * -----------------------------
 * 1. Global Execution Context
 *    - Created when the JavaScript engine starts evaluating a script.
 *    - Only one global execution context exists per script.
 *    - Creates a global object (`window` in browsers, `global` in Node) and a `this` value that points to it.
 *    - All top‑level variable and function declarations become properties of this global object.
 *
 * 2. Function Execution Context
 *    - Created each time a function is invoked.
 *    - Consists of three main components:
 *      • Variable Environment (LexicalEnvironment) – holds arguments, local variables, and inner function declarations.
 *      • Scope Chain – reference to its outer lexical environment, enabling closure behavior.
 *      • this Binding – value of `this` determined by how the function is called (default, call/apply/bind, arrow functions).
 *    - A new execution context is pushed onto the call stack; when the function returns, it is popped.
 *
 * 3. Execution Stack (Call Stack)
 *    - The engine maintains a stack of execution contexts.
 *    - The global context is at the bottom; each function call pushes a new context on top.
 *
 */
