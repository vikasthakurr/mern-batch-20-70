# Lifting State Up - Detailed Notes

## What is "Lifting State Up"?

Lifting State Up is a pattern where you **move state from a child component to its parent component** so that multiple children can share and synchronize that state.

In simple terms: When a child component needs to **send data back to the parent**, we lift the state up to the parent and pass the setter function down as a prop.

---

## The Problem: Child to Parent Communication

In React, data flows **one-way** (parent → child via props). But what if a child component has data that the parent needs?

```
Parent wants to display data
       ↑ (How does data go UP?)
       │
Child has an input field
```

Props can't send data **upward**. So how do we solve this?

---

## The Solution: Lift State Up

Instead of keeping state in the child, we:

1. **Define the state in the parent** component.
2. **Pass the setter function** as a prop to the child.
3. The child **calls the setter** to update the parent's state.

---

## Our Project Example

### App.jsx (Parent - Owns the State)

```jsx
import { useState } from "react";
import Child from "./Child";

const App = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <Child setName={setName} name={name} />
      <h1>the value of name coming from child: {name}</h1>
    </div>
  );
};
```

### Child.jsx (Child - Updates the Parent's State)

```jsx
const Child = (props) => {
  const handleChange = (e) => {
    props.setName(e.target.value);
  };

  return (
    <div>
      <h2>the value loaded in child is: {props.name}</h2>
      <input onChange={handleChange} type="text" placeholder="enter name" />
    </div>
  );
};
```

---

## How It Works - Step by Step

```
1. Parent (App) creates state: [name, setName] = useState("")

2. Parent passes setName and name as props to Child
   <Child setName={setName} name={name} />

3. User types in the input field inside Child

4. Child's handleChange fires:
   props.setName(e.target.value)  → updates parent's state

5. Parent re-renders with new name value

6. Both Parent and Child show the updated value
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────┐
│ App (Parent)                            │
│                                         │
│ State: [name, setName] = useState("")   │
│                                         │
│  ┌─────────────┐                        │
│  │  Props:     │                        │
│  │  setName ───┼──→ Child uses it to    │
│  │  name ──────┼──→ display value       │
│  └─────────────┘                        │
│                                         │
│ <h1>{name}</h1>  ← Shows updated value  │
└─────────────────────────────────────────┘
         ↑
         │ setName(newValue)
         │
┌─────────────────────────────────────────┐
│ Child                                   │
│                                         │
│ <input onChange={handleChange} />        │
│                                         │
│ handleChange = (e) => {                 │
│   props.setName(e.target.value) ←───────── Updates parent!
│ }                                       │
└─────────────────────────────────────────┘
```

---

## Why is it Called "Lifting State Up"?

Before lifting:

```
App
 └── Child (state lives here - name)
```

After lifting:

```
App (state lives here - name) ← LIFTED UP
 └── Child (uses props.setName to update)
```

The state was "lifted" from the child up to the parent.

---

## When to Use Lifting State Up

✅ **Use it when:**

- A child needs to send data to its parent.
- Two sibling components need to share the same state.
- You need a "single source of truth" for related data.

### Sibling Communication Example:

```jsx
const App = () => {
  const [text, setText] = useState("");
  return (
    <div>
      <InputChild setText={setText} /> {/* Writes */}
      <DisplayChild text={text} /> {/* Reads */}
    </div>
  );
};
```

Both siblings share the same state through their parent.

---

## Common Pattern: Form Inputs

Lifting state up is extremely common with forms:

```jsx
// Parent manages form state
const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password); // Parent has all data
  };

  return (
    <div>
      <EmailInput value={email} onChange={setEmail} />
      <PasswordInput value={password} onChange={setPassword} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// Child just renders UI and calls parent's setter
const EmailInput = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Email"
    />
  );
};
```

---

## Lifting State Up vs Props Drilling

| Concept            | Lifting State Up                   | Props Drilling                |
| ------------------ | ---------------------------------- | ----------------------------- |
| Direction          | Child → Parent (via setter)        | Parent → Child (via props)    |
| Purpose            | Share state between components     | Pass data down the tree       |
| Problem it solves  | Child-to-parent communication      | Reusability                   |
| Problem it creates | Can lead to props drilling if deep | Messy intermediate components |

---

## Controlled vs Uncontrolled Components

When you lift state up for form inputs, the input becomes a **controlled component**:

```jsx
// Controlled - React state drives the input value
<input value={props.name} onChange={handleChange} />

// Uncontrolled - Input manages its own internal state
<input defaultValue="hello" ref={inputRef} />
```

In our example, the input in Child is controlled by the parent's state.

---

## Key Takeaways

1. **Lifting state up** = moving state to the nearest common ancestor.
2. Pass the **setter function** as a prop so children can update parent state.
3. This enables **child-to-parent** and **sibling-to-sibling** communication.
4. The parent becomes the **single source of truth**.
5. This is the foundation for understanding more advanced patterns like Context API and Redux.
6. It's the standard React way to handle **forms** and **shared UI state**.
