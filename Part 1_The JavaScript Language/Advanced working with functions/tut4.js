//The old 'Var'

// “var” has no block scope

if (true) {
  var test = true; // use "var" instead of "let"
}

console.log(test); // true, the variable lives after if

// If we used let test instead of var test, then the variable would only be visible inside if:

/**
 if (true) {
  let test = true; // use "let"
}

alert(test); // ReferenceError: test is not defined
 */

// The same thing for loops: var cannot be block- or loop-local:

for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

console.log(i);   // 10, "i" is visible after loop, it's a global variable
console.log(one); // 1, "one" is visible after loop, it's a global variable

// If a code block is inside a function, then var becomes a function-level variable:

function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  console.log(phrase); // works
}

sayHi();
// console.log(phrase); // ReferenceError: phrase is not defined

//As we can see, var pierces through if, for or other code blocks. That’s because a long time ago in JavaScript, blocks had no Lexical Environments, and var is a remnant of that.

//............................

//“var” tolerates redeclarations

/**
let user;
let user; // SyntaxError: 'user' has already been declared
 */

var name1 = "Pete";
var name1 = "John";
console.log(name1); //John

//...............................

// “var” variables can be declared below their use

console.log(animal); //undefined
animal = "Elephant"

console.log(animal); //works
var animal;

//
function sayHello() {
  phrase = "Hello";

  if (false) {
    var phrase;
  }

  console.log(phrase); //works
}
sayHello();

//
console.log(actor); //undefined
var actor = "Cllian Murphy";

//People also call such behavior “hoisting” (raising), because all var are “hoisted” (raised) to the top of the function.
//Declarations are hoisted, but assignments are not.

//in the example:

function sayHi2() {
  console.log(phrase); //undefined

  var phrase = "Hello";
}

sayHi2();

// The line var phrase = "Hello" has two actions in it:

// Variable declaration 'var'
// Variable assignment '='.
// The declaration is processed at the start of function execution (“hoisted”), but the assignment always works at the place where it appears.

//Because all var declarations are processed at the function start, we can reference them at any place. But variables are undefined until the assignments.
//In both examples above, alert runs without an error, because the variable phrase exists. But its value is not yet assigned, so it shows undefined.

//............................

//IIFE  "immediately-invoked function expressions"

(function() {

  var message = "Hello";

  console.log(message); // Hello

})();


//So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it’s a Function Expression: it needs no name and can be called immediately.

/**
// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
 */

/**
 // syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
 */

//Ways to create IIFE

// Ways to create IIFE

(function() {
  console.log("Parentheses around the function");
})();

(function() {
  console.log("Parentheses around the whole thing");
}());

!function() {
  console.log("Bitwise NOT operator starts the expression");
}();

+function() {
  console.log("Unary plus starts the expression");
}();

//Don't use IIFE's unless needed





