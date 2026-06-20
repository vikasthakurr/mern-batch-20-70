# Props Drilling & Context API - Detailed Notes

## What is Props Drilling?

Props Drilling is when you pass data from a **top-level component** through **multiple intermediate components** just to reach a deeply nested child component that actually needs it.

```
App (has data)
 └── Child1 (doesn't need data, just passes it)
      └── Child2 (doesn't need data, just passes it)
           └── Child3 (actually uses the data)
```

Each intermediate component receives props it doesn't use — it only forwards them down.

---

## The Problem with Props Drilling

```jsx
// App passes data to Child1
const App = () => {
  let data = { fullname: "vikas" };
  return <Child1 data={data} />;
};

// Child1 doesn't use data, just passes it forward
const Child1 = (props) => {
  return <Child2 data={props.data} />;
};

// Child2 finally uses it
const Child2 = (props) => {
  return <h1>{props.data.fullname}</h1>;
};
```

### Why is this bad?

1. **Unnecessary coupling** — Intermediate components know about data they don't use.
2. **Hard to maintain** — Adding a new prop means updating every component in the chain.
3. **Reduced readability** — It's unclear which component actually needs the data.
4. **Performance** — Intermediate components may re-render unnecessarily.

---

## Solution: Context API

React's **Context API** solves props drilling by creating a "global" state that any component in the tree can access directly, without passing through intermediaries.

---

## How Context API Works

### Step 1: Create a Context

```jsx
import { createContext } from "react";

export const postman = createContext();
```

- `createContext()` creates a Context object.
- We export it so child components can import and use it.

### Step 2: Provide the Context (Wrap with Provider)

```jsx
const App = () => {
  let data = { fullname: "vikas" };
  return (
    <postman.Provider value={data}>
      <div>
        <Child1 />
      </div>
    </postman.Provider>
  );
};
```

- `<postman.Provider value={data}>` makes `data` available to **all** children inside it.
- No need to pass props manually anymore.

### Step 3: Consume the Context (useContext Hook)

```jsx
import { useContext } from "react";
import { postman } from "./App";

const Child2 = () => {
  const data = useContext(postman);
  console.log(data); // { fullname: "vikas" }
  return <div>{data.fullname}</div>;
};
```

- `useContext(postman)` directly accesses the value without any props passing.

---

## Complete Flow (Our Project Example)

```jsx
// App.jsx - Creates context and provides data
import { createContext } from "react";
import Child1 from "./Child1";

export const postman = createContext();

const App = () => {
  let data = { fullname: "vikas" };
  return (
    <postman.Provider value={data}>
      <div>
        <Child1 />
      </div>
    </postman.Provider>
  );
};
```

```jsx
// Child1.jsx - No props needed! Just renders Child2
import Child2 from "./Child2";

function Child1() {
  return (
    <div>
      <Child2 />
    </div>
  );
}
```

```jsx
// Child2.jsx - Directly consumes context
import { useContext } from "react";
import { postman } from "./App";

const Child2 = () => {
  const data = useContext(postman);
  console.log(data); // { fullname: "vikas" }
  return <div>Child2 - {data.fullname}</div>;
};
```

---

## Context API - Key Concepts

| Concept               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `createContext()`     | Creates a new context object                   |
| `<Context.Provider>`  | Wraps components that need access to the value |
| `value` prop          | The data you want to share                     |
| `useContext(Context)` | Hook to consume/read the context value         |

---

## Analogy: Postman/Courier

Think of Context like a **postman (courier)**:

- **Without Context (Props Drilling):** You hand a letter to your neighbor, who hands it to the next neighbor, who hands it to the next... until it reaches the destination.
- **With Context (Provider):** You give the letter to the postman, and the postman delivers it **directly** to the destination.

That's why the context is named `postman` in our example!

---

## When to Use Context API

✅ Use Context when:

- Data needs to be accessed by **many components** at different nesting levels.
- You're passing the same data through **3+ levels** of components.
- The data is "global" for a component tree (theme, user info, language).

❌ Don't overuse Context when:

- Data is only needed by the **immediate child** (just use props).
- The data changes **very frequently** (can cause performance issues).

---

## Props Drilling vs Context API

| Feature                 | Props Drilling            | Context API                       |
| ----------------------- | ------------------------- | --------------------------------- |
| Data flow               | Through every level       | Direct to consumer                |
| Intermediate components | Must receive & pass props | Not involved at all               |
| Readability             | Gets messy with depth     | Clean and clear                   |
| Setup                   | No setup needed           | Requires createContext + Provider |
| Best for                | 1-2 levels deep           | 3+ levels deep                    |

---

## Key Takeaways

1. **Props Drilling** = passing props through components that don't need them.
2. **Context API** = React's built-in solution to avoid props drilling.
3. Three steps: `createContext()` → `<Provider value={}>` → `useContext()`.
4. Context doesn't replace props — use props for direct parent-child communication.
5. For large-scale state management, consider libraries like **Redux** or **Zustand** alongside Context.
