// import React from 'react'

import { useState } from "react";
import Child from "./Child";
const App = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <Child setName={setName} name={name} />
      <h1>the value of name coming from child{name}</h1>
    </div>
  );
};

export default App;
