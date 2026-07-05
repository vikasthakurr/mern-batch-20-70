import express from "express";
import nodemailer from "nodemailer";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vikaskumar20012001@gmail.com",
    pass: "paste your password",
  },
});

const mailOption = {
  from: "vikaskumar20012001@gmail.com",
  to: "rajputsparsh570@gmail.com",
  subject: "sending email using nodejs",
  text: "hello aryan kumar",
};

transport.sendMail(mailOption, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("email sent successfully");
  }
});
app.get("/", (req, res) => {
  res.end("hello world");
});

app.post("/login", (req, res) => {
  // transport.sendMail
  res.end("login page");
});

// app.post("/profile", upload.single("dp"), (req, res) => {
//   res.end("dp done");
// });
app.listen(PORT, () => {
  console.log("server running");
});
