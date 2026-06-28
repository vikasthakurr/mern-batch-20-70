# Conditional Rendering in React

## What is Conditional Rendering?

Conditional rendering in React means showing different UI elements or components based on certain conditions — just like how `if-else` works in JavaScript, but inside JSX.

React doesn't have a special syntax for conditions. You use regular JavaScript operators like `if`, ternary (`? :`), and logical AND (`&&`) to decide what to render.

---

## Why Do We Need Conditional Rendering?

- Show/hide components based on user authentication (Login vs Dashboard)
- Display loading spinners while data is being fetched
- Show error messages when something goes wrong
- Toggle UI elements based on user interactions
- Render different layouts for different user roles

---

## Methods of Conditional Rendering

### 1. Ternary Operator (Most Common in JSX)

```jsx
const App = () => {
  let isLoggedIn = true;
  return <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>;
};
```

- Best for inline conditions inside JSX
- Returns one of two expressions based on the condition
- Syntax: `condition ? trueExpression : falseExpression`

### 2. Logical AND (`&&`) Operator

```jsx
const App = () => {
  let showWarning = true;
  return <div>{showWarning && <p>Warning: Something went wrong!</p>}</div>;
};
```

- Use when you only want to render something OR nothing
- If the condition is `true`, the right side renders
- If the condition is `false`, nothing renders
- **Gotcha:** Avoid using `0` as condition — `{0 && <Component />}` renders `0` on screen

### 3. If-Else (Outside JSX)

```jsx
const App = () => {
  let isLoggedIn = true;

  if (isLoggedIn) {
    return <Dashboard />;
  } else {
    return <Login />;
  }
};
```

- Use when logic is complex or you need multiple conditions
- Cannot be used directly inside JSX (because `if` is a statement, not an expression)

### 4. Switch Statement

```jsx
const App = ({ role }) => {
  switch (role) {
    case "admin":
      return <AdminPanel />;
    case "user":
      return <UserPanel />;
    case "guest":
      return <GuestPanel />;
    default:
      return <Login />;
  }
};
```

- Best for multiple discrete conditions
- Cleaner than multiple `if-else` chains

### 5. Element Variables

```jsx
const App = () => {
  let isLoggedIn = true;
  let component;

  if (isLoggedIn) {
    component = <Dashboard />;
  } else {
    component = <Login />;
  }

  return <div>{component}</div>;
};
```

- Store the JSX in a variable, then render the variable
- Useful when you want to separate logic from JSX structure

---

## Preventing a Component from Rendering

Return `null` from a component to render nothing:

```jsx
const WarningBanner = ({ show }) => {
  if (!show) {
    return null; // renders nothing
  }
  return <div className="warning">Warning!</div>;
};
```

---

## Common Use Cases

### Authentication Flow

```jsx
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}
```

### Loading States

```jsx
function DataComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  if (loading) return <Spinner />;
  if (!data) return <p>No data found</p>;
  return <DataList items={data} />;
}
```

### Rendering Lists Conditionally

```jsx
function UserList({ users }) {
  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
```

---

## Best Practices

1. **Use ternary for simple conditions** inside JSX
2. **Use `&&` when you don't need an else case**
3. **Use `if-else` for complex multi-step logic** outside JSX
4. **Keep conditions readable** — extract complex logic into variables or functions
5. **Avoid deeply nested ternaries** — they become hard to read
6. **Consider early returns** to reduce nesting

---

## Key Points to Remember

- Conditional rendering works because React components are just JavaScript functions
- JSX only accepts expressions (not statements), so `if-else` can't be used directly inside `{}`
- The ternary operator and `&&` are expressions, so they work inside JSX
- Returning `null` prevents a component from rendering
- State changes trigger re-renders, which re-evaluate conditions automatically
