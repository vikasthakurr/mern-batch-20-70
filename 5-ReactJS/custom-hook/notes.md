# Custom Hooks in React - Detailed Notes

## What are Custom Hooks?

Custom Hooks are JavaScript functions whose name starts with `use` and that can call other React Hooks. They allow you to extract and reuse stateful logic between components without changing the component hierarchy.

## Why Use Custom Hooks?

- **Reusability**: Share logic across multiple components
- **Separation of Concerns**: Keep component code clean by extracting complex logic
- **Testability**: Easier to test logic in isolation
- **Readability**: Makes component code simpler and more readable

## Rules of Custom Hooks

1. Name must start with `use` (e.g., `useFetch`, `useForm`, `useLocalStorage`)
2. Can call other Hooks (useState, useEffect, etc.) inside them
3. Follow the same rules as regular Hooks (only call at top level, only call in React functions)

## Basic Example

```jsx
// Custom Hook - useFetch.js
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return [data, loading, error];
};

export default useFetch;
```

## Using the Custom Hook

```jsx
import useFetch from "./useFetch";

const App = () => {
  const [data, loading, error] = useFetch("https://dummyjson.com/products");

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

## Common Custom Hook Patterns

| Hook Name       | Purpose                      |
| --------------- | ---------------------------- |
| useFetch        | API data fetching            |
| useLocalStorage | Sync state with localStorage |
| useToggle       | Boolean toggle state         |
| useForm         | Form handling and validation |
| useDebounce     | Debounced value              |
| useWindowSize   | Track window dimensions      |

## Key Takeaways

- Custom Hooks are just functions — no magic, just composition
- Each component using the same custom hook gets its own isolated state
- They help avoid code duplication and keep components clean
- Always prefix with `use` so React can enforce Hook rules
