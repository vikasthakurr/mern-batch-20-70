import { useSelector } from "react-redux";

const ViewTodo = () => {
  const todos = useSelector((state) => state.todo);
  console.log(todos)
  return <div>ViewTodo</div>;
};

export default ViewTodo;
