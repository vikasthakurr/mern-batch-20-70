# useRef Hook - Detailed Notes

## What is useRef?

`useRef` is a React Hook that returns a mutable ref object whose `.current` property is initialized to the passed argument. The ref object persists across re-renders and does NOT cause a re-render when its value changes.

## Syntax

```jsx
const ref = useRef(initialValue);
// Access value: ref.current
```

## Two Main Use Cases

### 1. Accessing DOM Elements

```jsx
import { useRef, useEffect } from "react";

const App = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus(); // auto-focus on mount
  }, []);

  return <input ref={inputRef} placeholder="Auto focused!" />;
};
```

### 2. Storing Mutable Values (without re-render)

```jsx
import { useRef, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  return (
    <div>
      <h1>Count: {count}</h1>
      <p>Component rendered {renderCount.current} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

## useRef vs useState

| Feature     | useRef                     | useState                |
| ----------- | -------------------------- | ----------------------- |
| Re-render   | Does NOT trigger re-render | Triggers re-render      |
| Persistence | Persists across renders    | Persists across renders |
| Access      | `ref.current`              | Direct value            |
| Use case    | DOM access, mutable values | UI-affecting state      |

## Styling DOM Elements with useRef

```jsx
const headingRef = useRef();
const buttonRef = useRef();

useEffect(() => {
  headingRef.current.style.color = "red";
  buttonRef.current.style.backgroundColor = "green";
}, []);

return (
  <div>
    <h1 ref={headingRef}>Hello</h1>
    <button ref={buttonRef}>Click</button>
  </div>
);
```

## Common Use Cases

- Auto-focusing an input field
- Storing previous state value
- Tracking render count
- Accessing/manipulating DOM elements directly
- Storing timer/interval IDs
- Holding values that shouldn't trigger re-renders

## Key Takeaways

- `useRef` returns `{ current: initialValue }`
- Changing `ref.current` does NOT cause re-render
- Perfect for DOM manipulation and storing mutable values
- Persists between renders (unlike regular variables)
- Don't overuse — prefer state for values that affect the UI
