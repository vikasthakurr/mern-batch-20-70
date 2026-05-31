// function mail(to, sub, body) {
//   console.log(
//     `mail has been sent to ${to} with subject ${sub} with body ${body}`,
//   );
// }
// mail("welcome");

function mail(to) {
  return function (sub) {
    return function (body) {
      console.log(
        `mail has been sent to ${to} with subject ${sub} with body ${body}`,
      );
    };
  };
}
mail("abc@gmail.com")("welcome")("hi");
