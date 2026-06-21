import { useLayoutEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  // console.log("function called");
  // useEffect(() => {
  //   console.log("component mounted");
  // }, []);
  // useEffect(() => {
  //   console.log("component updated");
  //   return () => {
  //     console.log("component unmounted");
  //   };
  // }, [count]);
  useLayoutEffect(() => {
    console.log("hi");
    return function(){
      console.log("cleanup code")
    }
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>the value of count is :{count}</h1>
      <button onClick={handleClick}>change</button>
    </div>
  );
};

export default App;
