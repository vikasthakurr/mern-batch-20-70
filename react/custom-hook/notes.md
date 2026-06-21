# Custom Hooks in React

## What is a Custom Hook?

A custom hook is a JavaScript function whose name starts with `use` and that can call other React hooks inside it. It allows you to extract reusable logic from components into a separate function.

Custom hooks are not a React feature per se — they are a **convention** that naturally follows from the design of hooks.

---

## Why Do We Need Custom Hooks?

- **Code Reusability:** Share stateful logic between multiple components without repeating code
- **Separation of Concerns:** Keep component files clean by moving logic elsewhere
- **Readability:** Components become easier to understand when complex logic is abstracted away
- **Testability:** Custom hooks can be tested independently of components

---

## Rules of Custom Hooks

1. **Must start with `use`** — e.g., `useFetch`, `useLocalStorage`, `useDebounce`
2. **Can call other hooks** — `useState`, `useEffect`, `useRef`, or other custom hooks
3. **Follow the Rules of Hooks** — only call at the top level, not inside loops or conditions
4. **Each call gets its own state** — if two components use the same custom hook, they don't share state

---

## Building a Custom Fetch Hook

### Basic Implementation

```jsx
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [url]);

  return [data];
};

export default useFetch;
```

### Using the Custom Hook

```jsx
import useFetch from "./useFetch";

const App = () => {
  const [data] = useFetch("https://dummyjson.com/products");
  console.log(data);

  return (
    <div>
      {data && data.products.map((item) => <p key={item.id}>{item.title}</p>)}
    </div>
  );
};
```

---

## Enhanced Fetch Hook (with Loading & Error)

```jsx
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

### Usage with Loading & Error States

```jsx
const App = () => {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data.products.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};
```

---

## More Custom Hook Examples

### useLocalStorage

```jsx
import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
```

### useToggle

```jsx
import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
};
```

### useDebounce

```jsx
import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
```

### useWindowSize

```jsx
import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
```

---

## Custom Hook vs Regular Function

| Feature                              | Custom Hook | Regular Function |
| ------------------------------------ | ----------- | ---------------- |
| Starts with `use`                    | Yes         | No               |
| Can use React hooks inside           | Yes         | No               |
| Has its own state                    | Yes         | No               |
| Re-renders component on state change | Yes         | No               |
| Follows Rules of Hooks               | Yes         | N/A              |

---

## Custom Hook vs Component

| Feature | Custom Hook    | Component   |
| ------- | -------------- | ----------- |
| Returns | Data/values    | JSX         |
| Has UI  | No             | Yes         |
| Reuses  | Logic          | UI + Logic  |
| Naming  | `useSomething` | `Something` |

---

## Best Practices

1. **Name hooks clearly** — `useFetch`, `useAuth`, `useForm` describe what they do
2. **Return only what's needed** — don't expose internal implementation details
3. **Keep hooks focused** — one hook should do one thing well
4. **Handle cleanup** — return cleanup functions in `useEffect` inside custom hooks
5. **Document parameters and return values** — make it easy for others to use
6. **Don't over-abstract** — if logic is only used once, keep it in the component

---

## Key Points to Remember

- Custom hooks are just functions that use other hooks
- They must start with `use` so React can enforce the Rules of Hooks
- Each component using a custom hook gets its own independent copy of state
- Custom hooks can return anything: arrays, objects, single values, or nothing
- They are the React way of sharing stateful logic (replacing patterns like HOCs and render props)
