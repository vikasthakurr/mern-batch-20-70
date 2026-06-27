# React Router - Detailed Notes

## What is React Router?

React Router is a library for handling navigation and routing in React applications. It enables building Single Page Applications (SPA) with multiple views/pages without full page reloads.

## Installation

```bash
npm install react-router-dom
```

## Core Components

| Component       | Purpose                                     |
| --------------- | ------------------------------------------- |
| `BrowserRouter` | Wraps app to enable routing (uses URL path) |
| `Routes`        | Container for all Route definitions         |
| `Route`         | Defines a path and the component to render  |
| `Link`          | Navigation without page reload              |
| `NavLink`       | Link with active styling support            |
| `Outlet`        | Renders child routes in nested layouts      |
| `Navigate`      | Programmatic redirect                       |

## Basic Setup

```jsx
// main.jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

```jsx
// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};
```

## Navigation with Link & NavLink

```jsx
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        About
      </NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
};
```

## Dynamic Routes (URL Parameters)

```jsx
// Route definition
<Route path="/product/:id" element={<ProductDetail />} />;

// Access params in component
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  return <h1>Product ID: {id}</h1>;
};
```

## Nested Routes

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
  <Route path="profile" element={<Profile />} />
</Route>;

// DashboardLayout.jsx
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
};
```

## Programmatic Navigation

```jsx
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // after login success
    navigate("/dashboard");
    // navigate(-1) to go back
  };

  return <button onClick={handleLogin}>Login</button>;
};
```

## Key Hooks

| Hook              | Purpose                        |
| ----------------- | ------------------------------ |
| `useParams`       | Access URL parameters          |
| `useNavigate`     | Programmatic navigation        |
| `useLocation`     | Get current URL info           |
| `useSearchParams` | Access query string parameters |

## Key Takeaways

- React Router enables SPA navigation without page reloads
- Use `Link`/`NavLink` instead of `<a>` tags for internal navigation
- `useParams` for dynamic routes, `useNavigate` for programmatic navigation
- Nested routes with `Outlet` for layout patterns
- Always add a `path="*"` route for 404 handling
