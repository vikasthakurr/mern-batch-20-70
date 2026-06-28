// --- ROUTE PARAMETERS & QUERY STRINGS ---

// Two ways to pass data in URL:
// 1. Route Parameters → Part of URL path (/users/5)
// 2. Query Strings → After ? in URL (/search?q=nodejs)

import express from "express";
const app = express();
app.use(express.json());

// --- ROUTE PARAMETERS (req.params) ---

// Defined with : (colon) in the route path.

// Single Parameter
// Route: /users/:id → URL: /users/5
// req.params = { id: "5" }

app.get("/users/:id", (req, res) => {
  console.log(req.params); // { id: "5" }
  console.log(req.params.id); // "5" (always a string!)
  const id = Number(req.params.id);
  res.json({ message: `Fetching user with ID: ${id}` });
});

// Multiple Parameters
// Route: /users/:userId/posts/:postId
// URL: /users/3/posts/10
// req.params = { userId: "3", postId: "10" }

app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.json({ message: `User ${userId}, Post ${postId}` });
});

// Practical Example
const products = [
  { id: 1, name: "Laptop", category: "electronics", price: 50000 },
  { id: 2, name: "Phone", category: "electronics", price: 20000 },
  { id: 3, name: "Shirt", category: "clothing", price: 1000 },
];

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.get("/products/category/:cat", (req, res) => {
  const category = req.params.cat;
  const filtered = products.filter((p) => p.category === category);
  res.json({ category, count: filtered.length, data: filtered });
});

// --- QUERY STRINGS (req.query) ---

// Query strings are key-value pairs after ? in the URL.
// Used for OPTIONAL filters, search, pagination, sorting.

// URL: /search?q=nodejs&page=1
// req.query = { q: "nodejs", page: "1" }

app.get("/search", (req, res) => {
  const searchTerm = req.query.q || "";
  const page = parseInt(req.query.page) || 1;
  res.json({
    searchTerm,
    page,
    message: `Searching: ${searchTerm}, Page: ${page}`,
  });
});
// Test: http://localhost:3000/search?q=nodejs&page=2

// Filtering with Query Strings
app.get("/api/products", (req, res) => {
  let result = [...products];
  const { category, minPrice, maxPrice, sort } = req.query;

  if (category) result = result.filter((p) => p.category === category);
  if (minPrice) result = result.filter((p) => p.price >= parseInt(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= parseInt(maxPrice));
  if (sort === "price") result.sort((a, b) => a.price - b.price);
  if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

  res.json({ count: result.length, data: result });
});
// Test: /api/products?category=electronics&minPrice=10000&sort=price

// Pagination with Query Strings
app.get("/api/items", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  const allItems = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));
  const paginatedItems = allItems.slice(startIndex, startIndex + limit);

  res.json({
    page,
    limit,
    total: allItems.length,
    totalPages: Math.ceil(allItems.length / limit),
    data: paginatedItems,
  });
});
// Test: /api/items?page=2&limit=5

// --- PARAMS vs QUERY - WHEN TO USE WHICH? ---

// Use PARAMS when: Identifying a SPECIFIC resource (required)
//   /users/5, /products/laptop, /orders/ABC123

// Use QUERY when: Filtering, searching, sorting (optional)
//   /products?color=red, /search?q=node, /users?page=2

// --- COMBINING PARAMS AND QUERY ---

// URL: /users/5/posts?sort=date&limit=10
app.get("/users/:id/posts", (req, res) => {
  const userId = req.params.id;
  const sort = req.query.sort || "date";
  const limit = parseInt(req.query.limit) || 10;
  res.json({
    userId,
    sort,
    limit,
    message: `${limit} posts for user ${userId}`,
  });
});

// --- IMPORTANT NOTES ---

// 1. req.params and req.query values are ALWAYS strings → convert with parseInt()
// 2. Route order MATTERS: specific routes before generic ones
// Wrong:  app.get("/users/:id") then app.get("/users/profile") → never reached
// Right:  app.get("/users/profile") then app.get("/users/:id")

// --- START SERVER ---

app.listen(3000, () => {
  console.log("Route Params & Query Demo: http://localhost:3000");
});

// --- KEY POINTS ---

// 1. req.params → URL parameters defined with :name in route
// 2. req.query → Query string parameters after ? in URL
// 3. Params = specific resource (required), Query = filters (optional)
// 4. Both return STRING values → convert numbers with parseInt()
// 5. Route order matters: specific before generic
// 6. Use destructuring: const { id } = req.params
// 7. Provide defaults: req.query.page || 1
// 8. Common query uses: search, filter, sort, paginate
// 9. Combine params + query for powerful APIs
// 10. Test with Postman or browser URL bar
