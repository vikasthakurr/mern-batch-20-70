// let arr = [1, 2, 3, 4, 5];

// let arr2 = [];
// for (let i = 0; i < arr.length; i++) {
//   arr2.push(arr[i] * 2);
// }
// return arr2;

// arr.map(double);
// function double(ele) {
//   console.log(ele * 2);
// }

// arr.forEach((ele) => {
//   console.log(ele);
// });

// function show(ele) {
//   console.log(ele);
// }

// arr.forEach(show);
let salary = [1000, 2000, 3000, 4000, 5000];

//ten percent
//twenty percent

function calculateTenPercent(salary) {
  return salary * 0.1;
}

function calculateTwentyPercent(salary) {
  return salary * 0.2;
}
// console.log(salary.map(calculateTenPercent));

Array.prototype.calculateTax = function (cb) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i]));
  }
  return result;
};

// console.log(calculateTax(salary, calculateTwentyPercent));
// console.log(salary.calculateTax(calculateTenPercent));
// const res = salary.calculateTax(calculateTenPercent);
const salary2 = [4000, 5000, 6000];
// const res = salary2.calculateTax(calculateTwentyPercent);
const res = salary2.map(calculateTwentyPercent);

console.log(res);
