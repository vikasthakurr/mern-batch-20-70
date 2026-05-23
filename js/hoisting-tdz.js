/**
 * Hoisting and Temporal Dead Zone (TDZ) in JavaScript
 * ---------------------------------------------------
 * JavaScript performs a two‑phase processing of code before execution:
 *   1. **Creation Phase** – variable & function declarations are hoisted.
 *   2. **Execution Phase** – code runs line‑by‑line.
 *
 * **Hoisting**
 *   - `var` declarations are hoisted to the top of their enclosing function or script.
 *   - Only the declaration is hoisted, **not** the initialization.
 *   - During the creation phase, `var` variables are initialized with `undefined`.
 *   - Example:
 *     ```js
 *     console.log(foo); // undefined (hoisted declaration)
 *     var foo = 42;      // assignment happens at runtime
 *     ```
 *
 *   - `let` and `const` declarations are also hoisted, but they are placed in the **Temporal Dead Zone**
 *     until their initialization is evaluated. Accessing them before the declaration throws a `ReferenceError`.
 *
 *   - Function declarations are fully hoisted – both name and body – allowing calls before their definition.
 *
 * **Temporal Dead Zone (TDZ)**
 *   - The period between entering the block scope and encountering the `let`/`const` declaration.
 *   - Variables are in an uninitialised state; any read/write results in a `ReferenceError`.
 *   - Example:
 *     ```js
 *     console.log(a); // ReferenceError: Cannot access 'a' before initialization
 *     let a = 10;
 *     ```
 *
 *   - The TDZ also applies to class declarations and function expressions assigned to `let`/`const`.
 *
 * **Why It Matters**
 *   - Understanding hoisting prevents surprising `undefined` values.
 *   - Awareness of TDZ helps avoid ReferenceErrors and encourages proper declaration order.
 *
 * 
 */