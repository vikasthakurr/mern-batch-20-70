// --- NODE.JS REPL & FIRST PROGRAM ---

// --- WHAT IS REPL? ---

// REPL = Read → Eval → Print → Loop
// R - Read    : Reads user input
// E - Eval    : Evaluates/Executes the code
// P - Print   : Prints the result
// L - Loop    : Loops back and waits for next input

// REPL is an interactive shell where you can write and test
// JavaScript code line by line (like a playground).

// --- HOW TO OPEN REPL ---

// Step 1: Open your terminal (Command Prompt / PowerShell / VS Code terminal)
// Step 2: Type: node
// Step 3: Press Enter
// You'll see: >  (this means REPL is ready)

// Example session:
// > 2 + 3         → 5
// > "Hello" + " World"  → 'Hello World'
// > Math.random()       → 0.7234567890
// > let x = 10          → undefined
// > x * 2              → 20

// --- REPL COMMANDS ---

// .help    → Shows all REPL commands
// .exit    → Exits REPL (or press Ctrl+C twice)
// .clear   → Clears the current context
// .break   → Breaks out of a multiline expression
// .save    → Saves REPL session to a file (.save filename.js)
// .load    → Loads a file into REPL (.load filename.js)
// Press Tab → Shows auto-complete suggestions
// Press Up Arrow → Shows previous commands

// --- REPL vs FILE EXECUTION ---

// REPL: Quick testing, experimenting, one-line code
// File: Real projects, multiple lines, saved code
// REPL → type "node" in terminal → write code line by line
// File → write code in .js file → run with "node filename.js"

// --- YOUR FIRST NODE.JS PROGRAM ---

console.log("Hello, World! Welcome to Node.js!");
console.log("This is my first Node.js program");

let name = "Student";
let course = "MERN Stack";
console.log(`Hi ${name}, welcome to ${course}!`);

let a = 10;
let b = 20;
console.log(`Sum of ${a} and ${b} = ${a + b}`);

let fruits = ["Apple", "Banana", "Mango"];
console.log("Fruits:", fruits);
console.log("First fruit:", fruits[0]);

let student = {
  name: "Vikas",
  age: 25,
  course: "MERN",
};
console.log("Student:", student);

function greet(userName) {
  return `Hello ${userName}, Happy Coding!`;
}
console.log(greet("Student"));

// --- HOW TO RUN THIS FILE ---

// Method 1: Terminal → node repl-first-program.js
// Method 2: VS Code integrated terminal → node repl-first-program.js
// Method 3: Code Runner Extension → Right click → Run Code

// --- process OBJECT (Node.js Global) ---

// 'process' is a global object available in Node.js (not in browser)
console.log("\n--- Process Info ---");
console.log("Node Version:", process.version);
console.log("Current Directory:", process.cwd());
console.log("Platform:", process.platform);

// process.argv → command line arguments
// Run: node repl-first-program.js hello world
// process.argv[0] = path to node
// process.argv[1] = path to file
// process.argv[2] = "hello"
// process.argv[3] = "world"
console.log("Arguments:", process.argv.slice(2));

// --- KEY POINTS ---

// 1. REPL = Read Eval Print Loop (interactive JS shell)
// 2. Type "node" in terminal to open REPL
// 3. Type ".exit" or Ctrl+C twice to exit REPL
// 4. REPL is for quick testing, files are for real projects
// 5. Run files with: node filename.js
// 6. console.log() works same as browser
// 7. 'process' is a Node.js global (not available in browser)
// 8. No need to add .js extension when running: node filename
