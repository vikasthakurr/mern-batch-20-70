# React State (useState) - Detailed Notes

## What is State?

State is **data that belongs to a component** and can **change over time**. When state changes, React **automatically re-renders** the component to reflect the new data in the UI.

---

## Why Not Just Use Regular Variables?

```jsx
const App = () => {
  let a = 10;

  function handleClick() {
    a = a + 1;
    console.log(a); // 11, 12, 13... (value changes)
  }

  return (
    <div>
      <h1>the value of a is: {a}</h1> {/* Always shows 10! */}
      <button onClick={handleClick}>change</button>
    </div>
  );
};
```

### The Problem:

- The variable `a` does change in memory.
- But React **doesn't know** it changed.
- React **doesn't re-render** the component.
- The UI stays stuck showing the old value.

---

## The Solution: useState Hook

```jsx
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>the value of a is: {count}</h1>
      <button onClick={handleClick}>change</button>
    </div>
  );
};
```

Now when you click the button:

1. `setCount` is called with the new value.
2. React updates the state.
3. React **re-renders** the component.
4. The UI shows the updated value.

---

## useState Syntax

```jsx
const [stateVariable, setterFunction] = useState(initialValue);
```

| Part             | Description                                    |
| ---------------- | ---------------------------------------------- |
| `stateVariable`  | The current value of the state                 |
| `setterFunction` | Function to update the state                   |
| `initialValue`   | The starting value (only used on first render) |

### Examples:

```jsx
const [count, setCount] = useState(0); // Number
const [name, setName] = useState(""); // String
const [isOpen, setIsOpen] = useState(false); // Boolean
const [items, setItems] = useState([]); // Array
const [user, setUser] = useState({}); // Object
```

---

## How State Works Internally

```
1. Component renders for the first time
   └── useState(0) → count = 0

2. User clicks button → handleClick() runs
   └── setCount(1) called

3. React schedules a re-render
   └── Component function runs again
       └── useState returns the NEW value → count = 1

4. React updates the DOM (only the parts that changed)
```

---

## Regular Variable vs State

| Feature                 | Regular Variable (`let a = 10`) | State (`useState(10)`) |
| ----------------------- | ------------------------------- | ---------------------- |
| Value changes           | Yes (in memory)                 | Yes                    |
| Triggers re-render      | ❌ No                           | ✅ Yes                 |
| UI updates              | ❌ No                           | ✅ Yes                 |
| Persists across renders | ❌ No (resets every render)     | ✅ Yes                 |
| React is aware          | ❌ No                           | ✅ Yes                 |

---

## Important Rules of useState

### 1. Never Modify State Directly

```jsx
// ❌ WRONG - Direct mutation
count = count + 1;

// ✅ CORRECT - Use the setter function
setCount(count + 1);
```

### 2. State Updates are Asynchronous

```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count); // Still shows OLD value!
}
```

React batches state updates for performance. The new value is available on the **next render**.

### 3. Functional Updates (for safe updates based on previous state)

```jsx
// When new state depends on previous state, use a function:
setCount((prevCount) => prevCount + 1);
```

This is safer when multiple updates happen in the same event.

### 4. Hooks Must Be at the Top Level

```jsx
// ❌ WRONG - inside condition
if (someCondition) {
  const [value, setValue] = useState(0);
}

// ✅ CORRECT - at the top level
const [value, setValue] = useState(0);
```

### 5. Only Call Hooks in React Functions

```jsx
// ✅ Inside functional components
// ✅ Inside custom hooks
// ❌ NOT in regular JavaScript functions
```

---

## Multiple State Variables

You can use useState multiple times:

```jsx
const App = () => {
  const [name, setName] = useState("vikas");
  const [age, setAge] = useState(26);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>
        {name} - {age}
      </h1>
      <p>Logged in: {isLoggedIn ? "Yes" : "No"}</p>
    </div>
  );
};
```

---

## State with Objects and Arrays

### Object State:

```jsx
const [user, setUser] = useState({ name: "vikas", age: 26 });

// Update one property (spread the rest):
setUser({ ...user, age: 27 });
```

### Array State:

```jsx
const [items, setItems] = useState(["a", "b", "c"]);

// Add item:
setItems([...items, "d"]);

// Remove item:
setItems(items.filter((item) => item !== "b"));
```

---

## Re-rendering Concept

When state changes:

1. React calls the component function again.
2. The function returns new JSX.
3. React compares old JSX vs new JSX (called **diffing**).
4. React updates **only the parts of the DOM that changed** (called **reconciliation**).

This is why React is fast — it doesn't rebuild the entire page, just the changed parts.

---

## Diagram: State Update Cycle

```
User Action (click, type, etc.)
       │
       ▼
Setter Function called (setCount)
       │
       ▼
React updates internal state
       │
       ▼
Component re-renders (function runs again)
       │
       ▼
New JSX returned
       │
       ▼
React diffs old vs new virtual DOM
       │
       ▼
Only changed parts update in the real DOM
```

---

## Key Takeaways

1. **State = data that changes** and needs to reflect in the UI.
2. **useState** gives you a value + a setter function.
3. Calling the setter **triggers a re-render**.
4. Regular variables **don't** trigger re-renders — that's why we need state.
5. State is **preserved** between re-renders (unlike normal variables which reset).
6. Always use the **setter function**, never mutate state directly.
7. State updates are **asynchronous** — don't expect immediate changes in the same function.
