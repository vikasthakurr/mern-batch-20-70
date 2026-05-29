/**
 * Closure definition:
 * A closure is a function that retains access to its lexical scope
 * even when the function is executed outside that scope.
 * This allows the inner function to "remember" variables from the outer
 * function, as demonstrated below.
 *
 * Relation to encapsulation:
 * Closures provide a form of data privacy. The variable `a` is not
 * accessible from the global scope; it is encapsulated within the
 * `outer` function's scope and can only be accessed by the returned
 * inner function.
 */
function outer() {
    let a = 20;

    function inner() {
        console.log(a)
    }
    return inner;
    // The inner function forms a closure, capturing variable `a` from the outer function's scope
}

let res = outer();
res();