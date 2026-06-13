// import math from "./math.js";
// console.log(math.sum(4, 6));
// const maths = require("./math.js");
// console.log(maths);

import figlet from "figlet";

figlet("Vikas", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
