//global scope
// let a = 10;
// // console.log(a)
// {
//   console.log(a);
// }
// function b() {
//   console.log(a);
// }
// let a = 40;
// {
//   let a = 10;
//   const b = 40;
//   var name = "vikas";
// }
// console.log(a);
// var a = 10;
// function a() {

//   console.log(a);
// }
// console.log(a);

//a ->b->c->d

// var a=10;
// let c = 19;
// function b() {
//   function e() {
//     console.log(c);
//   }
//   e();
// }
// b();

// function outer() {
//   let a = 10;

//   function inner() {
//     console.log(a);
//   }
//   inner();
// }
// outer();

function outer() {
  let a = 10;

  function inner() {
    console.log(a);
  }
  return inner;
}
let result = outer();
console.log(result);
