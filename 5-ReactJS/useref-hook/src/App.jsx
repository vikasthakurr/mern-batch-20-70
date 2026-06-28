// import React from 'react'

import { useEffect, useRef, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  // let value = 0;
  const ref = useRef(0);
  const ref1 = useRef();
  const ref2 = useRef();
  useEffect(() => {
    ref1.current.style.color = "red";
    ref2.current.style.backgroundColor = "green";
  }, []);
  // console.log(ref);

  const handleClick = () => {
    setCount(count + 1);
    ref.current = ref.current + 1;
    console.log(ref.current);
    // value = value + 1;
    // console.log(value);
  };
  return (
    <div>
      <h1 ref={ref1}>Count is :{count}</h1>
      {/* {console.log(ref1)} */}

      <button ref={ref2} onClick={handleClick}>
        change
      </button>
    </div>
  );
};

export default App;
