# useEffect Hook in React

## What is useEffect?

`useEffect` is a React hook that lets you perform **side effects** in functional components. Side effects are operations that interact with the outside world or affect something outside the scope of the current function — like fetching data, setting up timers, directly manipulating the DOM, or subscribing to events.

It replaces the lifecycle methods from class components: `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

---

## Syntax

```jsx
useEffect(() => {
  // side effect code here

  return () => {
    // cleanup code here (optional)
  };
}, [dependencies]);
```

- **Callback function** — the effect to run
- **Cleanup function** (optional) — returned from the callback, runs before the effect re-runs or when the component unmounts
- **Dependency array** (optional) — controls when the effect runs

---

## Dependency Array Behavior

### 1. No Dependency Array — Runs on Every Render

```jsx
useEffect(() => {
  console.log("Runs after every render");
});
```

- Runs after the initial render AND after every re-render
- Rarely what you want — can cause performance issues

### 2. Empty Dependency Array `[]` — Runs Once (on Mount)

```jsx
useEffect(() => {
  console.log("Component mounted");
}, []);
```

- Runs only once after the initial render
- Equivalent to `componentDidMount`
- Use for: initial data fetching, setting up subscriptions, one-time setup

### 3. With Dependencies `[dep1, dep2]` — Runs When Dependencies Change

```jsx
useEffect(() => {
  console.log("count changed");
}, [count]);
```

- Runs after the initial render
- Runs again only when any value in the dependency array changes
- Equivalent to `componentDidUpdate` with a condition

---

## Cleanup Function

The cleanup function runs:

- Before the effect re-runs (when dependencies change)
- When the component unmounts

```jsx
useEffect(() => {
  console.log("Effect runs");

  return () => {
    console.log("Cleanup runs");
  };
}, [count]);
```

### Timeline:

1. Component mounts → effect runs → logs "Effect runs"
2. `count` changes → cleanup runs (logs "Cleanup runs") → effect runs again (logs "Effect runs")
3. Component unmounts → cleanup runs (logs "Cleanup runs")

### Common Cleanup Use Cases:

```jsx
// Clearing timers
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(timer);
}, []);

// Removing event listeners
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

// Cancelling API calls (AbortController)
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setData(data));

  return () => controller.abort();
}, [url]);
```

---

## useEffect vs useLayoutEffect

| Feature          | useEffect                    | useLayoutEffect                  |
| ---------------- | ---------------------------- | -------------------------------- |
| When it runs     | After paint (async)          | Before paint (sync)              |
| Blocks rendering | No                           | Yes                              |
| Use case         | Data fetching, subscriptions | DOM measurements, visual updates |
| Performance      | Better (non-blocking)        | Can cause jank if heavy          |

### useLayoutEffect Example

```jsx
useLayoutEffect(() => {
  console.log("Runs before browser paints");
  return () => {
    console.log("Cleanup before next layout effect");
  };
}, [count]);
```

- Use `useLayoutEffect` when you need to read from the DOM and make changes **before** the user sees the update
- Example: measuring element dimensions, preventing flickers

---

## Component Lifecycle with useEffect

```
Mount:
  1. Component function runs
  2. JSX renders to DOM
  3. useEffect callback runs

Update (state/prop change):
  1. Component function re-runs
  2. JSX re-renders to DOM
  3. Previous useEffect cleanup runs
  4. New useEffect callback runs

Unmount:
  1. useEffect cleanup runs
  2. Component removed from DOM
```

---

## Practical Examples

### Fetching Data on Mount

```jsx
const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### Document Title Update

```jsx
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};
```

### Debounced Search

```jsx
const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetch(`/api/search?q=${query}`)
          .then((res) => res.json())
          .then((data) => setResults(data));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
};
```

---

## Common Mistakes

### 1. Missing Dependencies

```jsx
// BAD — stale closure, count will always be 0
useEffect(() => {
  setInterval(() => {
    setCount(count + 1); // count is captured as 0
  }, 1000);
}, []);

// GOOD — use functional update
useEffect(() => {
  const timer = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

### 2. Infinite Loop

```jsx
// BAD — setting state without dependencies causes infinite re-renders
useEffect(() => {
  setCount(count + 1);
});

// BAD — object/array as dependency (new reference every render)
useEffect(() => {
  // ...
}, [{ name: "test" }]); // new object every render = infinite loop
```

### 3. Forgetting Cleanup

```jsx
// BAD — memory leak
useEffect(() => {
  window.addEventListener("scroll", handleScroll);
}, []);

// GOOD — clean up on unmount
useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

---

## Best Practices

1. **Always include all used variables in the dependency array** (or use ESLint's exhaustive-deps rule)
2. **Use cleanup functions** for subscriptions, timers, and event listeners
3. **Keep effects focused** — one effect per concern
4. **Use functional state updates** (`setCount(prev => prev + 1)`) to avoid stale closures
5. **Don't use useEffect for things that can be computed during render** — use `useMemo` instead
6. **Prefer useEffect over useLayoutEffect** unless you need synchronous DOM reads

---

## Key Points to Remember

- `useEffect` runs AFTER the component renders (asynchronous)
- `useLayoutEffect` runs BEFORE the browser paints (synchronous)
- Empty dependency array = runs once on mount
- No dependency array = runs on every render
- Cleanup function prevents memory leaks and stale subscriptions
- React compares dependencies using `Object.is` (shallow comparison)
- Effects run in the order they are defined in the component
