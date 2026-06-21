// import "./App.css";

import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>useMemo Hook</h1>
      <h1>the value of count is :{count}</h1>
      <button onClick={handleClick}>change</button>
    </div>
  );
};

export default App;
