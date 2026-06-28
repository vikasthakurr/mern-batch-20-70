// let salary = 1233.45677;
// console.log(typeof salary);

// let bigInt = 2 ** 57;

// let a = 10;
// let b = a;
// b = 50;
// console.log(b, a);

// let obj1 = {
//   fullname: "vikas thakur",
// };
// let obj2 = obj1;
// obj2.fullname = "aryan";
// console.log(obj2, obj1);

// let name = "vikas";
// // console.log(typeof name);
// let ismarried = false;
// // console.log(typeof ismarried);
// let age = undefined;
// // console.log(typeof age);
// let temp = null;
// console.log(typeof temp);

// let obj = {
//   name: "vikas",
// };
// let obj1 = new Object();
// obj1.fullname = "akash";

// let arr = [];
// let arr1 = new Array();

// function abc() {
//   return abc;
// }

// --- DATA TYPES IN JAVASCRIPT ---

// JavaScript is a dynamically typed language, meaning you don't need to specify the data type of a variable when you declare it.
// There are two main categories of data types in JavaScript: Primitive and Non-Primitive (Reference) types.

// 1. PRIMITIVE DATA TYPES
// - Number: Represents both integer and floating-point numbers (e.g., 42, 3.14).
// - String: Represents a sequence of characters (e.g., "Hello").
// - Boolean: Represents a logical entity and can have two values: true or false.
// - Undefined: A variable that has been declared but not assigned a value.
// - Null: Represents the intentional absence of any object value. (Note: typeof null returns "object", which is a known bug in JS).
// - BigInt: Used for values larger than the Number type can hold (e.g., 9007199254740991n).
// - Symbol: Represents a unique identifier.

// 2. NON-PRIMITIVE (REFERENCE) DATA TYPES
// - Object: A collection of key-value pairs (e.g., { name: "Vikas", age: 25 }).
// - Array: A special type of object used for storing ordered multiple values (e.g., [1, 2, 3]).
// - Function: A callable object that executes a block of code.

// --- MEMORY MANAGEMENT: STACK VS HEAP ---

// JavaScript engines (like V8) use two areas of memory to store data: the Stack and the Heap.

// THE STACK (Static Memory Allocation)
// - Stores Primitive values (Number, String, Boolean, Undefined, Null, BigInt, Symbol).
// - Stores references (pointers) to objects that reside in the Heap.
// - Memory allocation is fixed and determined at compile time.
// - Operations are very fast because data is accessed directly and memory is managed automatically (LIFO).
// - When you copy a primitive value (e.g., let b = a;), a completely new, independent copy of the value is created in the Stack. Changing 'b' will not affect 'a'.

// THE HEAP (Dynamic Memory Allocation)
// - Stores Non-Primitive values (Objects, Arrays, Functions).
// - Memory allocation is dynamic, and the size of these objects can change at runtime.
// - Operations are slightly slower because data is accessed indirectly via a reference (pointer) stored in the Stack.
// - When you copy a reference value (e.g., let obj2 = obj1;), you are only copying the pointer in the Stack, not the actual object in the Heap. Both variables now point to the exact same object in the Heap. Changing 'obj2' will directly affect 'obj1'.
