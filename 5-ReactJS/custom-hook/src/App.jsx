// import "./App.css";
import Usecustom from "./Usecustom";

const App = () => {
  const [data] = Usecustom("https://dummyjson.com/products");
  console.log(data);

  return <div></div>;
};

export default App;
