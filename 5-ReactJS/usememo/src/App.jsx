// import "./App.css";

import { useCallback, useMemo, useState } from "react";
import Child from "./Child";

const App = () => {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  function sum() {
    console.log("heavy function called");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum = sum + i;
    }
    return sum;
  }

  function sayHi() {
    return "sayHi";
  }
  const sayHi1 = useCallback(() => sayHi, []);

  const handleClick1 = () => {
    setCount1(count1 + 1);
  };

  // const result = sum();
  const result = useMemo(sum, []);
  return (
    <div>
      <h1>the value of sum is {result}</h1>
      <h1>the value of count is :{count}</h1>
      <button onClick={handleClick}>change</button>
      <br />

      <p>the vlaue of child count is:{count1}</p>
      <button onClick={handleClick1}>change for child</button>
      <Child count1={count1} sayHi1={sayHi1} />
    </div>
  );
};

export default App;
