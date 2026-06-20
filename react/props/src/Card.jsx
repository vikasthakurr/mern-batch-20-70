// import React from 'react'

const Card = (props) => {
  //   let fullname = "vikas";
  //   let myage = 26;
  console.log(props);
  return (
    <div>
      <h1>My name is {props.fullname}</h1>
      <h2>the value of sum of 1 and 1 is {props.sum(2, 2)}</h2>
      <h1>my age is {props.myage}</h1>
    </div>
  );
};

export default Card;
