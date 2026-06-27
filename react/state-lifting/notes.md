# Lifting State Up - Detailed Notes

## What is "Lifting State Up"?

Lifting state up is a pattern in React where you move shared state from child components to their closest common parent. This allows multiple components to share and stay in sync with the same data.

## Why Lift State Up?

When two or more sibling components need to share or react to the same data, you:

1. Move the state to the parent component
2. Pass the state as props to children
3. Pass setter functions as props so children can update the state

## The Problem

```jsx
// Two siblings can't directly share state
const ChildA = () => {
  const [value, setValue] = useState(""); // isolated state
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
};

const ChildB = () => {
  // Can't access ChildA's value!
  return <p>Typed: ???</p>;
};
```

## The Solution: Lift State to Parent

```jsx
const Parent = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <ChildA value={value} onChange={setValue} />
      <ChildB value={value} />
    </div>
  );
};

const ChildA = ({ value, onChange }) => {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
};

const ChildB = ({ value }) => {
  return <p>Typed: {value}</p>;
};
```

## Data Flow

```
Parent (owns state)
├── ChildA (receives state + setter via props → can update)
└── ChildB (receives state via props → can display)
```

## Real-World Example: Temperature Converter

```jsx
const Parent = () => {
  const [celsius, setCelsius] = useState(0);

  return (
    <div>
      <CelsiusInput value={celsius} onChange={setCelsius} />
      <FahrenheitDisplay celsius={celsius} />
    </div>
  );
};

const CelsiusInput = ({ value, onChange }) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
  />
);

const FahrenheitDisplay = ({ celsius }) => <p>{(celsius * 9) / 5 + 32}°F</p>;
```

## When to Lift State

- Two or more components need the same data
- A child needs to update a sibling's display
- You need a single source of truth for shared data

## When NOT to Lift (Use Other Solutions)

- Deeply nested components → Use Context API
- Global app state → Use Redux or Zustand
- Only one component uses the state → Keep it local

## Key Takeaways

- State should live in the closest common ancestor of the components that need it
- Pass state down as props, pass updater functions to modify state
- Keeps data flow unidirectional (top → down)
- If prop drilling becomes too deep, consider Context API or state management libraries
