// import React from 'react'

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, removeAll } from "./redux/todoSlice.js";
const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleClick = () => {
    dispatch(addTodo({ text: todo }));
  };
  const handleClear = () => {
    dispatch(removeAll());
  };
  return (
    <div>
      <input
        value={todo}
        type="text"
        placeholder="add task"
        onChange={handleChange}
      />
      <button onClick={handleClick}>AddTodo</button>

      <button onClick={handleClear}>clearAll</button>
    </div>
  );
};

export default AddTodo;
