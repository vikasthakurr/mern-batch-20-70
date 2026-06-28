import http from "http";
// import express from "express";
// console.log(express);

// 100-199  information
//200-299  successful response
//300-399 redirection response
//400-499 client side error
//500 -599 server error response
const server = http.createServer((req, res) => {
  //   res.statusCode = 200;
  //   res.setHeader("author", "vikas thakur");
  //   res.setHeader("data-type", "application/plain");
  //   console.log(req.url);
  //   console.log(req.method);
  //   console.log(req.body);
  //   res.end("hello world");
  //   if (req.url === "/") {
  //     res.end("hi from home page");
  //   } else if (req.url === "/login") {
  //     res.end("hi from about us page");
  //   } else if (req.url === "/contact") {
  //     res.end("hi from contact page");
  //   } else {
  //     res.end("invalid route");
  //   }
  if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log(JSON.parse(body));
      res.end("login successfull");
    });
  }
  if(req.url==="/file" && req.method==="GET"){
    
  }
});

server.listen(3000, () => {
  console.log("server started");
});
