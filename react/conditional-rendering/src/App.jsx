// import "./App.css";

import Dashboard from "./Dashboard";
import Login from "./Login";

const App = () => {
  let isloggedIn = true;
  return (
    <div>
      <h1>{isloggedIn ? <Dashboard /> : <Login />}</h1>
    </div>
  );
};

export default App;
