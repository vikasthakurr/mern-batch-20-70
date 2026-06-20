// import React from 'react'

const Child = (props) => {
  console.log(props);
  const handleChange = (e) => {
    props.setName(e.target.value);
  };
  return (
    <div>
      <h2>the value loaded in child is:{props.name}</h2>
      <input onChange={handleChange} type="text" placeholder="enter name" />
    </div>
  );
};

export default Child;
