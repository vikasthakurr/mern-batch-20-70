import { lazy, Suspense } from "react";
import Card from "./Card";
import Skelton from "./Skelton";
import { useEffect, useState } from "react";
// const Card = lazy(() => import("./Card"));
// const Skelton = lazy(() => import("./Skelton"));
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  });
  return loading ? <Skelton /> : <Card />;
  // return (
  //   <div>
  //     <Suspense fallback={<Skelton />}>
  //       <Card />
  //     </Suspense>
  //   </div>
  // );
};

export default App;
