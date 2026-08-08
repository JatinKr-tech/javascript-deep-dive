//Currying

//Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).

function curry1(f) { // curry(f) does the currying transform
    return function(a) {
        return function(b) {
            return f(a, b);
        };
    };
}

// usage
function sum1(a, b) {
    return a + b;
}

let curriedSum = curry1(sum1);

console.log( curriedSum(1)(2) ); // 3

//_.curry from lodash library, return a wrapper that allows a function to be called both normally and partially:

function sum2(a, b) {
  return a + b;
}

let curriedSum2 = _.curry(sum2); // using _.curry from lodash library

console.log( curriedSum2(1, 2) ); // 3, still callable normally
console.log( curriedSum2(1)(2) ); // 3, called partially

//...........................

//Currying? What for?

function log(date, importance, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
};

log = _.curry(log);

log(new Date(), "DEBUG", "some debug"); //[HH:mm] [DEBUG] some debug // log(a, b, c)
log(new Date())("DEBUG")("some debug"); //[HH:mm] [DEBUG] some debug // log(a)(b)(c)

let logNow = log(new Date());

// use it
// logNow("INFO", "message"); // [HH:mm] INFO message

let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message

//......................................

//Advanced curry implementation

function curry2(func) {
    return function curried(...args1){
        if(args1.length >= func.length){
            return func.apply(this, args1);
        } else {
            return function(...args2){
                return curried.apply(this, args1.concat(args2))
            };
        };
    };
};

function sum3(a, b, c) {
  return a + b + c;
}

let curriedSum3 = curry2(sum3);

console.log(curriedSum3(1, 2, 3)); //6
console.log(curriedSum3(1, 2)(3)); //6
console.log(curriedSum3(1)(2)(3)); //6

//Note:

//Fixed-length functions only
//A function that uses rest parameters, such as f(...args), can’t be curried this way.

//Note:

//A little more than currying
//Advanced Currying is used mostly, callable in the multi-argument variant.