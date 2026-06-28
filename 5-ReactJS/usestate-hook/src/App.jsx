import { useState } from "react";

// import React from 'react'
const App = () => {
  const [count, setCount] = useState(0);
  // let a = 10;
  function handleClick() {
    setCount(count + 1);
    // a = a + 1;
    // console.log(a)
    // document.querySelector("#heading").textContent = a;
    // document.querySelector("#para").textContent = a;
  }
  return (
    <div>
      <h1 id="heading">the value of a is:{count}</h1>
      <p id="para">{count}</p>
      <h1 id="heading">the value of a is:{count}</h1>
      <p id="para">{count}</p>
      <h1 id="heading">the value of a is:{count}</h1>
      <p id="para">{count}</p>
      <h1 id="heading">the value of a is:{count}</h1>
      <p id="para">{count}</p>
      <h1 id="heading">the value of a is:{count}</h1>
      <p id="para">{count}</p>
      <button onClick={handleClick}>change</button>
    </div>
  );
};

export default App;
