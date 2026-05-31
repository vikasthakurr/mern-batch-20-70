// const result = fetch("https://dummyjson.com/products");
//promises

// result
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err))
//   .finally(() => {
//     console.log("process done");
//   });

// const p1 = Promise.reject("hello from 1");
// const p2 = Promise.reject("hello from 2");
// const p3 = Promise.reject("due to some error");

// Promise.any([p1, p2, p3])
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

 function fetchMango() {
  const mango = await fetch("https://dummyjson.com/products");
  const jsondata = await mango.json();
  console.log(jsondata);
  //   console.log(mango);
}

fetchMango();
