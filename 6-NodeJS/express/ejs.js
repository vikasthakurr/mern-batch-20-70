// --- EJS (EMBEDDED JAVASCRIPT) TEMPLATE ENGINE ---

// EJS = Embedded JavaScript
// It's a TEMPLATE ENGINE for Node.js/Express.
// Lets you generate HTML with embedded JavaScript code.
// You can inject dynamic data (variables, loops, conditions) into HTML.

// Without EJS: You send plain HTML or JSON.
// With EJS: You send dynamic HTML (data changes based on user/request).

// --- WHY USE EJS? ---

// 1. Dynamic HTML generation (inject variables into HTML)
// 2. Use JavaScript logic in HTML (loops, conditions)
// 3. Reusable components (partials - header, footer)
// 4. Server-Side Rendering (SEO friendly)
// 5. Simple syntax (just HTML + <% %> tags)
// 6. Easy to learn (HTML + JS = EJS)

// --- INSTALLATION & SETUP ---

// npm install ejs

import express from "express";
const app = express();

app.set("view engine", "ejs"); // Tell Express to use EJS
app.set("views", "./views"); // Folder where .ejs files live (default)

// Create views folder:
// my-project/
// ├── views/
// │   ├── home.ejs
// │   ├── users.ejs
// │   └── partials/
// │       ├── header.ejs
// │       └── footer.ejs
// ├── app.js
// └── package.json

// --- EJS SYNTAX (Tags) ---

// <% %>    → JavaScript logic (no output) - loops, conditions
// <%= %>   → Output value (escaped - safe from XSS)
// <%- %>   → Output raw HTML (unescaped - use carefully)
// <%# %>   → Comment (not rendered in HTML)
// <%- include("path") %> → Include partial templates

// --- PASSING DATA TO TEMPLATES ---

// res.render("template", { data }) → 2nd argument passes data to EJS

app.get("/", (req, res) => {
  res.render("home", { title: "Home Page", message: "Welcome to EJS!" });
});

app.get("/profile", (req, res) => {
  res.render("profile", {
    username: "Vikas",
    age: 25,
    skills: ["JavaScript", "Node.js", "React", "MongoDB"],
    isLoggedIn: true,
  });
});

// --- EJS TEMPLATE EXAMPLES ---

// views/home.ejs:
// <h1>Welcome, <%= username %>!</h1>
// <p>Your age is: <%= age %></p>

// Using Conditions:
// <% if (isLoggedIn) { %>
//   <h2>Welcome back, <%= username %>!</h2>
//   <a href="/logout">Logout</a>
// <% } else { %>
//   <h2>Please Login</h2>
//   <a href="/login">Login</a>
// <% } %>

// Using Loops:
// <h2>Your Skills:</h2>
// <ul>
//   <% skills.forEach(function(skill) { %>
//     <li><%= skill %></li>
//   <% }) %>
// </ul>

// Looping Over Array of Objects:
// <% users.forEach(function(user) { %>
//   <div class="card">
//     <h3><%= user.name %></h3>
//     <p>Email: <%= user.email %></p>
//   </div>
// <% }) %>

// --- PARTIALS (Reusable Components) ---

// Partials = Reusable EJS snippets (header, footer, navbar).
// Include with: <%- include("partials/header") %>

// views/partials/header.ejs:
// <nav>
//   <a href="/">Home</a>
//   <a href="/about">About</a>
// </nav>

// views/home.ejs (using partials):
// <%- include("partials/header") %>
//   <main><h1>Welcome Home!</h1></main>
// <%- include("partials/footer") %>

// --- COMPLETE WORKING EXAMPLE ---

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  { id: 1, name: "Vikas", email: "vikas@test.com", role: "Admin" },
  { id: 2, name: "Rahul", email: "rahul@test.com", role: "User" },
];

app.get("/users", (req, res) => {
  res.render("users", { title: "Users", users });
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).render("error", { message: "User not found" });
  res.render("userDetail", { title: user.name, user });
});

// --- EJS WITH FORMS ---

// views/register.ejs:
// <form action="/register" method="POST">
//   <input type="text" name="name" placeholder="Name" required>
//   <input type="email" name="email" placeholder="Email" required>
//   <button type="submit">Register</button>
// </form>
// <% if (typeof error !== 'undefined') { %>
//   <p style="color: red;"><%= error %></p>
// <% } %>

// app.get("/register", (req, res) => res.render("register"));
// app.post("/register", (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) return res.render("register", { error: "All fields required!" });
//   res.redirect("/users");
// });

app.listen(3000, () => console.log("EJS Demo: http://localhost:3000"));

// --- KEY POINTS ---

// 1. EJS = Embedded JavaScript (template engine)
// 2. Install: npm install ejs
// 3. Setup: app.set("view engine", "ejs")
// 4. Files go in views/ folder with .ejs extension
// 5. <% %> for logic, <%= %> for output, <%- %> for raw HTML
// 6. res.render("template", { data }) sends data to template
// 7. Partials: <%- include("partials/header") %>
// 8. Always use <%= %> (escaped) to prevent XSS attacks
// 9. Use <%- %> only for trusted HTML (like partials)
// 10. EJS is great for server-side rendering (SSR)
// 11. For APIs (React frontend), you don't need EJS (use res.json)
