// --- EXPRESS ROUTES (GET, POST, PUT, DELETE) ---

// Routes define how your server responds to client requests.
// A route = HTTP Method + URL Path + Handler Function
// Syntax: app.METHOD(PATH, HANDLER)

// HTTP Methods & CRUD:
// GET    → Read/Fetch data     (C-R-U-D → Read)
// POST   → Create new data     (C-R-U-D → Create)
// PUT    → Update ENTIRE resource
// PATCH  → Update PARTIAL resource
// DELETE → Delete a resource    (C-R-U-D → Delete)

import express from "express";
const app = express();
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: "Vikas", email: "vikas@test.com", age: 25 },
  { id: 2, name: "Rahul", email: "rahul@test.com", age: 22 },
  { id: 3, name: "Priya", email: "priya@test.com", age: 28 },
];

// --- GET ROUTES (Read Data) ---

// Get ALL users
app.get("/api/users", (req, res) => {
  res.json({ success: true, count: users.length, data: users });
});

// Get SINGLE user by ID
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  res.json({ success: true, data: user });
});

// --- POST ROUTES (Create Data) ---

app.post("/api/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, error: "Name and email required" });
  }

  const newUser = { id: users.length + 1, name, email, age: age || null };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});
// Test: POST http://localhost:3000/api/users
// Body: { "name": "Amit", "email": "amit@test.com", "age": 30 }

// --- PUT ROUTES (Update Entire Resource) ---

app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  // PUT replaces the ENTIRE object
  users[index] = {
    id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };
  res.json({ success: true, data: users[index] });
});

// --- PATCH ROUTES (Update Partial Resource) ---

app.patch("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  // PATCH merges with existing (only updates provided fields)
  users[index] = { ...users[index], ...req.body };
  res.json({ success: true, data: users[index] });
});
// Test: PATCH /api/users/1, Body: { "age": 30 } → only updates age

// --- DELETE ROUTES ---

app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  const deletedUser = users.splice(index, 1);
  res.json({ success: true, message: "User deleted", data: deletedUser[0] });
});

// --- PUT vs PATCH ---

// PUT: Replaces ENTIRE resource. Must send ALL fields.
//      Missing fields become undefined.
// PATCH: Updates ONLY sent fields. Others remain unchanged.
// In practice, most developers use PATCH for updates.

// --- USING express.Router() ---

// For better organization, use Router in separate files:
// File: routes/users.js
// import express from "express";
// const router = express.Router();
// router.get("/", getAllUsers);
// router.post("/", createUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// export default router;

// File: app.js
// import userRoutes from "./routes/users.js";
// app.use("/api/users", userRoutes);

// --- START SERVER ---

app.listen(3000, () => {
  console.log("Express Routes Demo: http://localhost:3000");
});

// --- KEY POINTS ---

// 1. GET = Read, POST = Create, PUT = Full Update, DELETE = Remove
// 2. PATCH = Partial Update (only change specific fields)
// 3. app.use(express.json()) is REQUIRED to read req.body
// 4. req.params → URL params (/users/:id → req.params.id)
// 5. Always validate input data before processing
// 6. Return proper status codes (200, 201, 400, 404, 500)
// 7. Use express.Router() for modular route files
// 8. PUT replaces entire object, PATCH merges with existing
// 9. Always handle "not found" cases with 404
// 10. Use Postman or Thunder Client to test routes
