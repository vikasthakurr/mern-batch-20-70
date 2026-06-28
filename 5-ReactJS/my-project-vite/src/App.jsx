// import About from "./components/About";
// import Home from "./components/Home";
// import Nav from "./components/Nav";
// const App = () => {
//   return (
//     <>
//       <Nav />
//       <Home />
//       <About />
//     </>
//   );
// };
// export default App;

// import React from 'react'
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    console.log("useEffect called");
    document.getElementById("btn").addEventListener("click", () => {
      console.log("clicked");
    });
  });

  return <button id="btn">App</button>;
};

export default App;
