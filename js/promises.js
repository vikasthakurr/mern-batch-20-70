// =============================================================
// PROMISES IN JAVASCRIPT -- NOTES
// =============================================================
//
// WHAT IS A PROMISE?
//   A Promise is a built-in JavaScript object that represents
//   the eventual completion (or failure) of an asynchronous
//   operation and its resulting value.
//
//   It is the cleaner alternative to deeply nested callbacks.
//   A Promise is a placeholder for a value we don't have yet
//   but expect to receive in the future.
//
// =============================================================
// PROMISE STATES
// =============================================================
//
//   A Promise can be in one of THREE states:
//
//   1. PENDING   -- Initial state. The async operation is still
//                   in progress. Neither fulfilled nor rejected.
//
//   2. FULFILLED -- The operation completed successfully.
//                   The promise has a resolved value.
//
//   3. REJECTED  -- The operation failed.
//                   The promise has a reason (error) for failure.
//
//   Once a promise is fulfilled or rejected, it is "settled"
//   and cannot change its state again.
//
// =============================================================
// CREATING A PROMISE
// =============================================================
//
//   const p = new Promise((resolve, reject) => {
//     // async work here...
//     if (success) resolve("data");
//     else reject("error");
//   });
//
// =============================================================
// PROMISE METHODS
// =============================================================
//
//   1. .then(onFulfilled)
//      Called when the promise is FULFILLED (resolved).
//      Returns a new promise, so you can chain .then() calls.
//      Example:
//        fetch(url).then(res => res.json()).then(data => console.log(data));
//
//   2. .catch(onRejected)
//      Called when the promise is REJECTED (fails).
//      Used for error handling in the promise chain.
//      Example:
//        fetch(url).catch(err => console.log("Error:", err));
//
//   3. .finally(onFinally)
//      Called regardless of whether the promise was fulfilled
//      or rejected. Used for cleanup tasks (e.g., hide loader).
//      Example:
//        fetch(url).finally(() => console.log("Done"));
//
//   -------------------------------------------------------
//   STATIC PROMISE METHODS (for multiple promises at once)
//   -------------------------------------------------------
//
//   4. Promise.all([p1, p2, p3])
//      Waits for ALL promises to resolve.
//      If ANY one rejects, the whole thing rejects immediately.
//      Use when all results are required to proceed.
//
//   5. Promise.allSettled([p1, p2, p3])
//      Waits for ALL promises to settle (resolve or reject).
//      Returns an array of results for each, regardless of outcome.
//      Use when you want results from all, even if some fail.
//
//   6. Promise.any([p1, p2, p3])
//      Resolves as soon as ANY ONE promise fulfills.
//      Only rejects if ALL promises reject (AggregateError).
//      Use when you just need the first successful result.
//      (See example below in commented code)
//
//   7. Promise.race([p1, p2, p3])
//      Resolves or rejects as soon as ANY ONE promise settles,
//      whichever comes first -- win or lose.
//      Use for timeout patterns or fastest-response scenarios.
//
//   8. Promise.resolve(value)
//      Returns an already-fulfilled promise with the given value.
//
//   9. Promise.reject(reason)
//      Returns an already-rejected promise with the given reason.
//
// =============================================================
// BENEFITS OF PROMISES
// =============================================================
//
//   1. AVOIDS CALLBACK HELL
//      Promises use chaining (.then().then()) instead of
//      deeply nested callbacks, making code flat and readable.
//
//   2. BETTER ERROR HANDLING
//      A single .catch() at the end of a chain can handle errors
//      from any step, unlike callbacks where each must handle its own.
//
//   3. CHAINING
//      Each .then() returns a new promise, enabling clean,
//      sequential async operations in a readable chain.
//
//   4. COMPOSABILITY
//      Static methods like Promise.all and Promise.race allow
//      running multiple async tasks in parallel with ease.
//
//   5. FOUNDATION FOR ASYNC/AWAIT
//      Promises are the underlying mechanism that async/await
//      is built on. Understanding promises is key to mastering
//      modern async JavaScript.
//
// =============================================================
// DRAWBACKS OF PROMISES
// =============================================================
//
//   1. STILL COMPLEX FOR BEGINNERS
//      Chaining and error propagation can still be confusing
//      without a solid understanding of how promises work.
//
//   2. ERROR SWALLOWING
//      If .catch() is not attached, rejected promises can fail
//      silently, making bugs hard to detect.
//
//   3. NOT CANCELLABLE
//      Once a Promise is created, it cannot be cancelled.
//      (AbortController is the workaround for fetch requests.)
//
//   4. DEBUGGING CAN BE TRICKY
//      Stack traces in promise chains are sometimes less
//      informative compared to synchronous code.
//
//   NOTE: async/await syntax (used in fetchMango below) is
//   the modern, cleaner way to work with Promises, making
//   async code look and behave more like synchronous code.
//
// =============================================================

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

 async function fetchMango() {
  const mango = await fetch("https://dummyjson.com/products");
  const jsondata = await mango.json();
  console.log(jsondata);
  //   console.log(mango);
}

fetchMango();
