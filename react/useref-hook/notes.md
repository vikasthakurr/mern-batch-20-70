# useRef Hook in React

## What is useRef?

`useRef` is a React hook that returns a **mutable ref object** with a `.current` property. The key feature is that changing `.current` does **NOT** trigger a re-render, unlike `useState`.

```jsx
const ref = useRef(initialValue);
// ref = { current: initialValue }
```

---

## Why Do We Need useRef?

1. **Access DOM elements directly** — focus inputs, scroll to elements, measure dimensions
2. **Persist values across renders** — without causing re-renders (like instance variables in classes)
3. **Store previous values** — keep track of what something was before a re-render
4. **Hold mutable values** — timers, intervals, subscription IDs

---

## useRef vs useState

| Feature                      | useRef                      | useState             |
| ---------------------------- | --------------------------- | -------------------- |
| Triggers re-render on change | No                          | Yes                  |
| Persists across renders      | Yes                         | Yes                  |
| Mutable                      | Yes (direct assignment)     | No (must use setter) |
| Access                       | `ref.current`               | Direct value         |
| Use case                     | DOM access, silent counters | UI-visible data      |

---

## Two Main Use Cases

### 1. Accessing DOM Elements

You can attach a ref to a JSX element using the `ref` attribute. After the component mounts, `ref.current` points to the actual DOM node.

```jsx
import { useEffect, useRef } from "react";

const App = () => {
  const inputRef = useRef();
  const headingRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    // Focus the input on mount
    inputRef.current.focus();

    // Change styles directly
    headingRef.current.style.color = "red";
    buttonRef.current.style.backgroundColor = "green";
  }, []);

  return (
    <div>
      <h1 ref={headingRef}>Hello World</h1>
      <input ref={inputRef} type="text" />
      <button ref={buttonRef}>Click Me</button>
    </div>
  );
};
```

### 2. Persisting Values Without Re-rendering

```jsx
import { useRef, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // This increments every render but doesn't cause another render
  renderCount.current = renderCount.current + 1;

  return (
    <div>
      <h1>Count: {count}</h1>
      <p>This component rendered {renderCount.current} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

---

## Practical Examples

### Tracking Previous State Value

```jsx
const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current; // returns the value from the previous render
};

// Usage
const App = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>
        Current: {count}, Previous: {prevCount}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### Storing Timer/Interval IDs

```jsx
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // cleanup on unmount
  }, []);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

### Scroll to Element

```jsx
const ScrollExample = () => {
  const sectionRef = useRef();

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <button onClick={scrollToSection}>Scroll to Section</button>
      {/* ...lots of content... */}
      <div ref={sectionRef}>
        <h2>Target Section</h2>
      </div>
    </div>
  );
};
```

### Uncontrolled Form Input

```jsx
const Form = () => {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", nameRef.current.value);
    console.log("Email:", emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## How useRef Works Internally

```
Initial Render:
  const ref = useRef(0);  → creates { current: 0 }

Re-render:
  const ref = useRef(0);  → returns the SAME object { current: ... }
```

- React stores the ref object internally
- On re-renders, it returns the same object reference (not a new one)
- This is why mutations to `.current` persist across renders
- And why changing `.current` doesn't trigger re-renders — React doesn't track it

---

## useRef vs Creating a Variable Outside the Component

```jsx
// This is shared between ALL instances of the component
let globalValue = 0;

const App = () => {
  // This is unique per component instance and persists across renders
  const ref = useRef(0);

  // This is recreated on every render (lost on re-render)
  let localValue = 0;
};
```

|                         | `useRef` | Module variable | Local variable |
| ----------------------- | -------- | --------------- | -------------- |
| Per instance            | Yes      | No (shared)     | Yes            |
| Persists across renders | Yes      | Yes             | No             |
| Triggers re-render      | No       | No              | No             |

---

## Common Mistakes

### 1. Reading/Writing ref.current During Render

```jsx
// BAD — don't read ref.current for rendering logic during render phase
return <p>{ref.current}</p>; // value might be stale

// OK — reading in event handlers or effects
const handleClick = () => {
  console.log(ref.current);
};
```

### 2. Expecting Re-renders After Changing ref.current

```jsx
// This won't update the UI
ref.current = ref.current + 1;
// If you need the UI to update, use useState instead
```

### 3. Using ref on Unmounted Component

```jsx
// Always check if ref.current exists before using
useEffect(() => {
  if (ref.current) {
    ref.current.focus();
  }
}, []);
```

---

## When to Use useRef vs useState

**Use `useRef` when:**

- You need to access a DOM element
- You want to store a value that doesn't affect the visual output
- You need a mutable container that persists across renders
- You're storing timer/interval IDs

**Use `useState` when:**

- The value should be displayed in the UI
- Changing the value should trigger a re-render
- You want React to track and manage the value reactively

---

## Key Points to Remember

- `useRef` returns `{ current: initialValue }` — a plain JavaScript object
- Changing `ref.current` does NOT trigger re-renders
- The ref object stays the same across renders (same reference)
- Use `ref` attribute on JSX elements to get DOM access
- Always clean up refs to DOM elements in useEffect cleanup if needed
- Refs are essentially "escape hatches" from React's declarative model
