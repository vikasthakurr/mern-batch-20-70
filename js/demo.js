/*
============================================
call(), apply(), bind() - Notes
============================================

** Definition **
- call, apply, and bind are methods available on every function in JavaScript.
- They are used to control what "this" refers to inside a function.
- They allow function borrowing — use a method of one object on another object.

============================================
1. call() Method
============================================

Definition:
- Calls a function immediately with a given "this" value and arguments passed individually (comma separated).

Syntax:
  functionName.call(thisArg, arg1, arg2, ...)

Use Cases:
- Function borrowing (use one object's method with another object).
- Invoking a function with a specific context immediately.

Example:
  person.print.call(person2, "agra")
  // "this" inside print will refer to person2
  // Output: sparsh 23 agra

============================================
2. apply() Method
============================================

Definition:
- Same as call(), but arguments are passed as an array instead of individually.

Syntax:
  functionName.apply(thisArg, [arg1, arg2, ...])

Use Cases:
- When you have arguments in an array format.
- Useful with Math.max, Math.min on arrays:
    Math.max.apply(null, [1, 5, 3]) // 5

Example:
  person.print.apply(person2, ["agra"])
  // Output: sparsh 23 agra

============================================
3. bind() Method
============================================

Definition:
- Does NOT call the function immediately.
- Returns a NEW function with "this" permanently bound to the provided value.
- You can call the returned function later.

Syntax:
  const newFunc = functionName.bind(thisArg, arg1, arg2, ...)
  newFunc() // call later

Use Cases:
- When you want to save a function with a fixed "this" to use later.
- Event handlers where you need a specific context.
- Partial application (pre-filling some arguments).

Example:
  const boundFn = person.print.bind(person2, "agra")
  boundFn()
  // Output: sparsh 23 agra

============================================
QUICK COMPARISON
============================================

| Method | Invokes Immediately? | Arguments Format     |
|--------|---------------------|----------------------|
| call   | Yes                 | Comma separated      |
| apply  | Yes                 | Array                |
| bind   | No (returns func)   | Comma separated      |

============================================
KEY POINTS
============================================
- call & apply → invoke function immediately
- bind → returns a new function (invoke later)
- All three set the value of "this"
- If thisArg is null/undefined, "this" defaults to global object (window in browser)
- Arrow functions CANNOT be bound — they inherit "this" from their lexical scope

============================================
*/

let person = {
  name: "vikas",
  age: 26,
  print: function (city) {
    console.log(this.name, this.age, city);
  },
};

let person2 = {
  name: "sparsh",
  age: 23,
};

//call
// person.print.call(person2, "agra");
// person.print.apply(person2,["agra"]);
person.print.bind(person2, "agra")();
// console.log(res);
