// function searchWithDebounce(fn, delay) {
//   let timer;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   };
// }

//throttle....

function searchWithThrottle(fn, delay) {
  let Lastcall = 0;
  return function (...args) {
    let currentCall = Date.now();
    if (currentCall - Lastcall >= delay) {
      fn(...args);
      Lastcall = currentCall;
    }
  };
}
function googleSearch(name) {
  console.log(`searching of ${name}`);
}

let googleSearchwithDebounce = searchWithThrottle(googleSearch, 300);
googleSearchwithDebounce("vikas");
googleSearchwithDebounce("vikas thakur");
googleSearchwithDebounce("vikas kumar thakur");

// googleSearch("vikas");
// googleSearch("vikas thakur");
// googleSearch("vikas kumar thakur");
