//Global Object

//The global object has a universal name globalThis.
//…But more often is referred by “old-school” environment-specific names, such as window (browser) and global (Node.js).

console.log("Hello");
// is the same as
window.console.log("Hello");


//In a browser, global functions and variables declared with var (not let/const!) become the property of the global object:
var gVar = 5;

console.log(window.gVar); // 5 (became a property of the global object)

//

let gLet = 5;

console.log(window.gLet); // undefined (doesn't become a property of the global object)

//If a value is so important that you’d like to make it available globally, write it directly as a property:

// make current user information global, to let all scripts access it
window.currentUser = {
    name: "John"
};

// somewhere else in code
console.log(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
console.log(window.currentUser.name); // John
console.log(globalThis.currentUser.name); // John

globalThis.currentUser2 = {
    name: "William"
};

console.log(currentUser2.name)
console.log(globalThis.currentUser2.name)
console.log(window.currentUser2.name)

//.................................

//Using for polyfills

// We use the global object to test for support of modern language features.

// For instance, test if a built-in Promise object exists (it doesn’t in really old browsers):

if (!window.Promise) {
  console.log("Your browser is really old!");
} else {
  console.log("Your browser is really new");
};

//If there’s none (say, we’re in an old browser), we can create “polyfills”: add functions that are not supported by the environment, but exist in the modern standard.

if (!window.Promise) {
  window.Promise = ""; // custom implementation of the modern language feature
};

// Function declaration become property of globalThis object but Function expressions don't as you can see below:

function lmao(){
    return "LMAO";
};

console.log(window.lmao()); //"LMAO"

let someFunc = function (){
    return "printing someFunc";
}

// console.log(window.someFunc()); //TypeError


