# Redux (Redux Toolkit) - Detailed Notes

## What is Redux?

Redux is a state management library for JavaScript apps. It provides a centralized store to manage the entire application state, making state predictable and easy to debug.

## Redux Toolkit (RTK)

Redux Toolkit is the official, recommended way to write Redux logic. It simplifies Redux setup with less boilerplate.

## Core Concepts

| Concept  | Description                                         |
| -------- | --------------------------------------------------- |
| Store    | Single source of truth (holds entire app state)     |
| Action   | Object describing what happened `{ type, payload }` |
| Reducer  | Pure function that updates state based on action    |
| Dispatch | Method to send actions to the store                 |
| Selector | Function to read data from the store                |
| Slice    | Combines reducer + actions for a feature            |

## Setup with Redux Toolkit

### 1. Install

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Create a Slice

```jsx
// features/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

### 3. Create Store

```jsx
// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
```

### 4. Provide Store

```jsx
// main.jsx
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

### 5. Use in Components

```jsx
// AddTodo.jsx
import { useDispatch } from "react-redux";
import { addTodo } from "./features/todoSlice";
import { useState } from "react";

const AddTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
};
```

```jsx
// ViewTodo.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "./features/todoSlice";

const ViewTodo = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
```

## Redux Flow

```
UI Event → dispatch(action) → reducer → new state → UI re-renders
```

## Key Hooks

| Hook          | Purpose                        |
| ------------- | ------------------------------ |
| `useSelector` | Read data from the Redux store |
| `useDispatch` | Get the dispatch function      |

## Key Takeaways

- Redux Toolkit eliminates boilerplate with `createSlice`
- Immer is built-in — you can "mutate" state directly in reducers (it's handled immutably under the hood)
- Use `useSelector` to read state, `useDispatch` to update state
- Best for medium-to-large apps with complex shared state
- Overkill for simple apps — use Context API or useState instead
