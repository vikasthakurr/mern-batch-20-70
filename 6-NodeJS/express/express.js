import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.end("hello world");
// });

let items = [
  { id: 1, name: "vikas" },
  {
    id: 2,
    name: "kumar",
  },
];

app.get("/allitems", (req, res) => {
  res.json(items);
});
app.get("/items", (req, res) => {
  console.log(req.query);
  res.end("bye");
});
app.get("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((item) => item.id === id);
  res.json(item);
});

app.get("/about", (req, res) => {
  res.end("hi from about");
});
app.post("/login", (req, res) => {
  console.log(req.body);
  res.end("login done");
});

app.get("/file", (req, res) => {
  fs.readFile("./vikas.html", "utf-8", (err, data) => {
    if (err) return err;

    res.end(data);
  });
});
app.get("/products", (req, res) => {
  fs.readFile("./products.json", "utf-8", (err, data) => {
    if (err) return err;
    res.send(`
        <h1>${data}</h1>
        `);
  });
});

app.get("/vikas", (req, res) => {
  res.render("vikas");
});
app.listen(3000, () => {
  console.log("server is running");
});
