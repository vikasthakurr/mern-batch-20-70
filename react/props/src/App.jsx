// import React from 'react'
import Card from "./Card";

const App = () => {
  function sum(a, b) {
    return a + b;
  }
  return (
    <div>
      <Card fullname="sparsh" myage="26" sum={sum} />
      {/* <Card fullname="aryan" myage="26" />
      <Card fullname="vikas" myage="26" />
      <Card fullname="aditya" myage="26" />
      <Card fullname="akash" myage="26" />
      <Card fullname="gaurav" myage="26" /> */}
    </div>
  );
};

export default App;
