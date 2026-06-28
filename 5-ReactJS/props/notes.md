# React Props - Detailed Notes

## What are Props?

Props (short for **Properties**) are the mechanism by which data flows from a **parent component** to a **child component** in React. They are **read-only** — a child component cannot modify the props it receives.

Think of props like **function arguments** — just as you pass arguments to a function, you pass props to a component.

---

## Why Do We Need Props?

Without props, every component would be **static and hardcoded**. For example:

```jsx
// Without Props - Hardcoded (BAD - not reusable)
const Card1 = () => {
  return (
    <div>
      <h1>my name is: sparsh</h1>
      <h2>my age is 24</h2>
    </div>
  );
};

const Card2 = () => {
  return (
    <div>
      <h1>my name is aryan</h1>
      <h1>my age is 24</h1>
    </div>
  );
};
```

This approach means you need a **separate component** for every card. With props, one component handles all:

```jsx
// With Props - Dynamic and Reusable (GOOD)
const Card = (props) => {
  return (
    <div>
      <h1>My name is {props.fullname}</h1>
      <h1>my age is {props.myage}</h1>
    </div>
  );
};
```

---

## How to Pass Props

Props are passed as **attributes** on the JSX tag:

```jsx
const App = () => {
  return (
    <div>
      <Card fullname="sparsh" myage="26" />
      <Card fullname="aryan" myage="26" />
      <Card fullname="vikas" myage="26" />
    </div>
  );
};
```

---

## How to Receive Props

The child component receives all props as a **single object**:

```jsx
const Card = (props) => {
  console.log(props); // { fullname: "sparsh", myage: "26", sum: f }
  return (
    <div>
      <h1>My name is {props.fullname}</h1>
      <h1>my age is {props.myage}</h1>
    </div>
  );
};
```

---

## Destructuring Props

Instead of writing `props.fullname`, you can destructure:

```jsx
const Card = ({ fullname, myage }) => {
  return (
    <div>
      <h1>My name is {fullname}</h1>
      <h1>my age is {myage}</h1>
    </div>
  );
};
```

---

## What Can You Pass as Props?

You can pass **anything** as props:

| Type          | Example                             |
| ------------- | ----------------------------------- |
| String        | `<Card name="vikas" />`             |
| Number        | `<Card age={26} />`                 |
| Boolean       | `<Card isActive={true} />`          |
| Array         | `<Card items={[1, 2, 3]} />`        |
| Object        | `<Card user={{ name: "vikas" }} />` |
| Function      | `<Card sum={sum} />`                |
| JSX/Component | `<Card icon={<Icon />} />`          |

### Passing Functions as Props

```jsx
const App = () => {
  function sum(a, b) {
    return a + b;
  }
  return <Card fullname="sparsh" myage="26" sum={sum} />;
};

const Card = (props) => {
  return (
    <div>
      <h2>the value of sum of 2 and 2 is {props.sum(2, 2)}</h2>
    </div>
  );
};
```

---

## Important Rules of Props

1. **Props are Read-Only** — You cannot modify props inside a child component.
2. **Unidirectional Flow** — Data flows only from parent → child (top to bottom).
3. **Props are an Object** — All props are collected into a single object.
4. **Strings don't need curly braces** — `name="vikas"` works. But numbers, booleans, arrays, objects, and functions need `{}`.
5. **Default Props** — You can set default values:

```jsx
const Card = ({ name = "Guest", age = 0 }) => {
  return (
    <h1>
      {name} - {age}
    </h1>
  );
};
```

---

## Props vs Variables

| Feature             | Props                        | Variables                |
| ------------------- | ---------------------------- | ------------------------ |
| Source              | Comes from parent            | Defined inside component |
| Mutable?            | No (read-only)               | Yes                      |
| Triggers re-render? | Yes (when parent re-renders) | No                       |
| Scope               | Accessible in child          | Local to component       |

---

## Data Flow Diagram

```
App (Parent)
 │
 │── passes props ──→ Card (Child)
 │                      │
 │                      └── uses props.fullname, props.myage
 │
 │── passes props ──→ Card (Child)
```

---

## Key Takeaways

- Props make components **reusable** and **dynamic**.
- Props flow **one-way** (parent to child).
- You can pass **any JavaScript value** as a prop, including functions.
- Always think of props as the **input** to a component.
- If the same component needs different data, use props instead of creating multiple hardcoded components.
