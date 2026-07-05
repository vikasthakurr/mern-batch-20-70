import express from "express";
import morgan from "morgan";

import fs from "fs";
const app = express();
app.use(express.json());
app.use(morgan("combined"));
// app.use(helmet());
// app.use(
//   cors({
//     origin: "https://localhost:5173",
//   }),
// );

const PORT = 3000;

// let username = "vikasthakur";
// let password = "vikas123";
// app.use((req, res, next) => {
//   console.log("middlware 1 called");
//   next();
// });
// app.use((req, res, next) => {
//   console.log("middlware 2 called");
//   next();
// });
// app.use((req, res, next) => {
//   if (req.body.username == "") {
//     res.end("please enter valid username first");
//   } else {
//     next();
//   }
// });
// app.use((req, res, next) => {
//   if (req.body.username === username && req.body.password === password) {
//     console.log("i am done with check u can go ahead");
//     next();
//   } else {
//     res.end("invalid credentials");
//   }
// });

// app.use((req, res, next) => {
//   fs.appendFile(
//     "log.txt",
//     `\n ${req.body.username} was logged in at ${Date.now()} and was accessing the route ${req.url}`,
//     (err, data) => {
//       if (err) return err;
//       console.log(data);
//     },
//   );
//   next();
// });

app.post("/login", (req, res) => {
  console.log(req.body);
  fs.readFile("./Home.html", "utf-8", (err, data) => {
    if (err) return res.status(404).json({ message: "something went wring" });
    res.send(data);
  });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.end("hi from registe");
});

app.get("/", (req, res) => {
  res.end("hi");
});
app.listen(PORT, () => {
  console.log("server is running");
});
