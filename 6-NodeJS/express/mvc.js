// --- EXPRESS APP STRUCTURE (MVC OVERVIEW) ---

// --- WHAT IS MVC? ---

// MVC = Model - View - Controller
// M - Model      → Data layer (database, schemas, queries)
// V - View       → Presentation layer (what user sees: HTML, EJS)
// C - Controller → Logic layer (handles requests, processes data)

// WHY MVC?
// - Separation of concerns (each part has ONE job)
// - Easier to maintain and debug
// - Team collaboration (different people work on different parts)
// - Scalable (easy to add new features)

// --- EXPRESS PROJECT FOLDER STRUCTURE ---

// my-express-app/
// ├── controllers/           → Route handler functions
// │   ├── userController.js
// │   └── productController.js
// ├── models/                → Database models/schemas
// │   ├── User.js
// │   └── Product.js
// ├── routes/                → Route definitions
// │   ├── userRoutes.js
// │   └── productRoutes.js
// ├── views/                 → Templates (EJS, Pug)
// │   ├── home.ejs
// │   └── users.ejs
// ├── middleware/            → Custom middleware
// │   ├── auth.js
// │   └── logger.js
// ├── public/                → Static files (CSS, JS, images)
// ├── config/                → Configuration files
// │   └── db.js
// ├── app.js                 → Express app setup
// ├── server.js              → Server start (listen)
// ├── package.json
// └── .env                   → Environment variables

// --- MVC IN ACTION ---

// MODEL (models/User.js):
// Handles data structure and database operations.

// const users = [];
// const User = {
//   getAll: () => users,
//   getById: (id) => users.find(u => u.id === id),
//   create: (user) => { user.id = users.length + 1; users.push(user); return user; },
//   delete: (id) => { users.splice(users.findIndex(u => u.id === id), 1); }
// };
// export default User;

// CONTROLLER (controllers/userController.js):
// Contains logic for handling requests.

// import User from "../models/User.js";
// export const getAllUsers = (req, res) => {
//   res.json({ success: true, data: User.getAll() });
// };
// export const getUserById = (req, res) => {
//   const user = User.getById(parseInt(req.params.id));
//   if (!user) return res.status(404).json({ error: "Not found" });
//   res.json({ success: true, data: user });
// };
// export const createUser = (req, res) => {
//   const newUser = User.create(req.body);
//   res.status(201).json({ success: true, data: newUser });
// };

// ROUTES (routes/userRoutes.js):
// Maps URLs to controller functions.

// import express from "express";
// import { getAllUsers, getUserById, createUser } from "../controllers/userController.js";
// const router = express.Router();
// router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.post("/", createUser);
// export default router;

// APP.JS (brings everything together):

// import express from "express";
// import userRoutes from "./routes/userRoutes.js";
// const app = express();
// app.use(express.json());
// app.use("/api/users", userRoutes);
// export default app;

// SERVER.JS (start server):

// import app from "./app.js";
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server on port ${PORT}`));

// --- FLOW OF A REQUEST IN MVC ---

// Client Request → Route → Controller → Model → Database
// Database Response → Model → Controller → Response to Client

// Example: GET /api/users/1
// 1. Express matches route: /api/users/:id
// 2. Route calls: userController.getUserById
// 3. Controller calls: User.getById(1)
// 4. Model queries database, returns user
// 5. Controller sends response: res.json(user)

// --- SIMPLE WORKING EXAMPLE ---

import express from "express";
const app = express();
app.use(express.json());

// "Model"
let todos = [
  { id: 1, task: "Learn Express", done: false },
  { id: 2, task: "Build API", done: false },
];

// "Controller"
const getTodos = (req, res) => res.json(todos);
const addTodo = (req, res) => {
  const todo = { id: todos.length + 1, ...req.body, done: false };
  todos.push(todo);
  res.status(201).json(todo);
};

// "Routes"
app.get("/todos", getTodos);
app.post("/todos", addTodo);

app.listen(3000, () => console.log("MVC Demo running on port 3000"));

// --- KEY POINTS ---

// 1. MVC = Model (data) + View (UI) + Controller (logic)
// 2. Models handle database/data operations
// 3. Controllers handle request logic
// 4. Routes map URLs to controllers
// 5. Views render templates (EJS, HTML)
// 6. Separate files = better organization
// 7. express.Router() helps create modular routes
// 8. app.use("/prefix", router) mounts route groups
// 9. app.js = setup, server.js = start
// 10. MVC makes large apps manageable and maintainable
