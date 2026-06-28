import { memo } from "react";

const Child = () => {
  console.log("child component loaded");
  return <div>Child</div>;
};

export default memo(Child);
