// function automail(to, sub, body) {
//   console.log(`mail sent to ${to} with subject ${sub} and body ${body}`);
// }
// // automail("welcome onboard", "hi from vikas");

// function sayHi(name) {
//   setTimeout(() => {
//     console.log("hi");
//     cb();
//   }, 2000);
// }
// // sayHi("vikas");
// function sayBye() {
//   console.log("bye");
// }
// sayHi("vikas", sayBye);

function makeMaggi(rawmaggi, cb) {
  console.log("maggi process started");
  cb();
}
function boilWater(cb) {
  console.log("water boiled");
  cb();
}
function addMasala(cb) {
  console.log("masala added");
  cb();
}
function serve(cb) {
  console.log("maggi served");
  cb();
}
makeMaggi("hakka", () => {
  boilWater(() => {
    addMasala(() => {
      serve(() => {
        console.log("maggi done and dusted");
      });
    });
  });
});
