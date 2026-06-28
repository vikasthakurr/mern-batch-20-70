// let person = {
//   fname: "vikas",
//   lname: "thakur",
//   age: 26,
//   address: {
//     city: "agra",
//   },
// };

// let person2 = Object.assign({}, person);
// // console.log(person2);
// person2.address.city = "delhi";
// console.log(person);
// console.log(person2);

// let person2 = { ...person };
// let person2 = structuredClone(person);
// // let person2 = JSON.parse(JSON.stringify(person));
// let stringperson = JSON.stringify(person);
// // console.log(typeof stringperson);
// let original = JSON.parse(stringperson);
// // console.log(original);
// original.age = 56;
// console.log(original);
// console.log(person)
// person2.age = 56;
// person2.address.city = "etawah";
// console.log(person2);
// console.log(person);

// Object.freeze(person);
// Object.seal(person);
// console.log(person.age);
// person.age = 57;
// person.gender = "male";
// person.age = 56;
// console.log(person);

// console.log(person.fname);
// console.log(Object.keys(person));
// console.log(Object.values(person))
// console.log(Object.entries(person))
// person.gender = "male";
// console.log(person)

// let person2 = person;
// person2.lname = "kumar";
// console.log(person2);
// console.log(person);
// let person2 = new Object();

// let arr = ["apple", "mango", "banana"];
// // const [first, ...rest] = arr;//
// const [third, ...rest] = arr;
// console.log(third);
// console.log(first);
// console.log(rest[1]);

function sum(...args) {
  //   console.log(args);
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum = sum + args[i];
  }
  return sum;
  //   return a + b;
}
let res = sum(4, 5, 4, 6);
console.log(res);
