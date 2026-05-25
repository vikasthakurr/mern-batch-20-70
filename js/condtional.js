// let age = 18;

// if (age >= 18) {
//   console.log("vote");
// } else {
//   console.log("cant vote");
// }

// console.log(age >= 18 ? "vote" : "cant vote");

// function abc() {
//   console.log("hi");
// }
// () => console.log("hi");

// let day = 5;
// switch (day) {
//   case 1:
//     console.log("monday");
//     break;
//   case 3:
//     console.log("sunday");
//     break;
//   default:
//     console.log("invalid day passed");
// }

// let age = 17;
// let gender = "male";

// if (age >= 18 && gender === "male") {
//   console.log("join unit");
// } else {
//   console.log("cant join unit");
// }

// if (age >= 18) {
//   console.log("vote");
// } else {
//   console.log("cant");
// }


// Conditional statements are a fundamental part of programming that allow your code to behave differently based on whether certain conditions are true or false. In JavaScript, you can use the following types of 
// conditional statements:

// 1. **If Statement**: The simplest type of conditional statement.
// 2. **If-Else Statement**: This allows you to specify what happens if the condition is true, and what happens if it's false.
// 3. **Nested If Statements**: You can nest multiple if statements to check for different conditions within a single block of code.

// Here are some examples in JavaScript:

// ### 1. If Statement
// ```javascript
// let age = 25;

// if (age >= 18) {
//     console.log("You are an adult.");
// } else {
//     console.log("You are a minor.");
// }
// ```

// ### 2. If-Else Statement
// ```javascript
// let score = 85;

// if (score >= 90) {
//     console.log("You got an A.");
// } else if (score >= 80) {
//     console.log("You got a B.");
// } else if (score >= 70) {
//     console.log("You got a C.");
// } else {
//     console.log("You got a D.");
// }
// ```

// ### 3. Nested If Statements
// ```javascript
// let temperature = 20;

// if (temperature > 15) {
//     console.log("It is warm outside.");
//     if (temperature >= 30) {
//         console.log("It is very hot outside.");
//     }
// } else {
//     console.log("It is cold outside.");
// }
// ```

// ### Example: Checking User Credentials
// Here’s an example of how you might use conditional statements in a user authentication scenario:

// ```javascript
// function authenticateUser(username, password) {
//     let correctUsername = "admin";
//     let correctPassword = "password";

//     if (username === correctUsername && password === correctPassword) {
//         console.log("Authentication successful!");
//     } else {
//         console.log("Invalid username or password.");
//     }
// }

// // Example usage
// authenticateUser("admin", "password"); // Output: Authentication successful!
// authenticateUser("user", "wrongpassword"); // Output: Invalid username or password.
// ```

// ### 4. Ternary Operator
// The ternary operator is a concise way to write a simple if-else statement in a single line.
// ```javascript
// let age = 18;
// let canVote = age >= 18 ? "Yes" : "No";
// console.log(canVote); // Output: Yes
// ```

// ### 5. Switch Statement
// The switch statement evaluates an expression, matching the expression's value to a case clause, and executes statements associated with that case.
// ```javascript
// let day = 3;
// switch (day) {
//     case 1:
//         console.log("Monday");
//         break;
//     case 2:
//         console.log("Tuesday");
//         break;
//     case 3:
//         console.log("Wednesday");
//         break;
//     default:
//         console.log("Invalid day");
// }
// ```
