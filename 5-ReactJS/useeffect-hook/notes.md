# useEffect Hook - Detailed Notes

## What is useEffect?

`useEffect` is a React Hook that lets you perform side effects in function components. Side effects are operations that interact with the outside world or affect something outside the scope of the function (API calls, DOM manipulation, timers, subscriptions, etc.).

## Syntax

```jsx
useEffect(() => {
  // side effect code here

  return () => {
    // cleanup code (optional)
  };
}, [dependencies]);
```

## Three Lifecycle Phases

| Phase      | How to achieve with useEffect                  |
| ---------- | ---------------------------------------------- |
| Mounting   | `useEffect(() => {}, [])` — empty array        |
| Updating   | `useEffect(() => {}, [dep])` — with dependency |
| Unmounting | Return a cleanup function                      |

## Dependency Array Scenarios

### 1. No dependency array — runs on every render

```jsx
useEffect(() => {
  console.log("Runs on every render");
});
```

### 2. Empty array — runs only on mount

```jsx
useEffect(() => {
  console.log("Component mounted - runs once");
}, []);
```

### 3. With dependencies — runs when dependency changes

```jsx
useEffect(() => {
  console.log("count changed");
}, [count]);
```

## Cleanup Function

Used to clean up subscriptions, timers, or event listeners to prevent memory leaks.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(timer); // cleanup on unmount
  };
}, []);
```

## useLayoutEffect vs useEffect

| Feature     | useEffect                | useLayoutEffect              |
| ----------- | ------------------------ | ---------------------------- |
| Timing      | After paint (async)      | Before paint (sync)          |
| Use case    | API calls, subscriptions | DOM measurements, animations |
| Performance | Non-blocking             | Can block visual updates     |

```jsx
useLayoutEffect(() => {
  // Runs synchronously after DOM update, before browser paints
  console.log("Layout effect");
  return () => {
    console.log("Cleanup layout effect");
  };
}, [count]);
```

## Common Use Cases

- Fetching data from an API
- Setting up event listeners
- Setting up timers (setTimeout, setInterval)
- Updating document title
- Subscribing to external data sources

## Key Takeaways

- useEffect runs after the component renders
- Always specify dependencies to avoid infinite loops
- Use cleanup functions to prevent memory leaks
- useLayoutEffect runs synchronously before the browser paints — use it for DOM measurements
- Don't call Hooks inside loops, conditions, or nested functions
