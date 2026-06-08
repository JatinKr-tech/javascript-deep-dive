//Variable scope, closure

//Code block {}

//inside code block if we have variable then it is defined only inside, and accessable only inside the code block

//for loop is special case, as i is outside of code block '{}' but that i is only defined only inside that foor loop
//for(let i = 0; i < 5; i++){

    //i could be used only here

// }

//i could not be used here




//.......................

//Nested functions

function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return "bababoy";
    // return firstName + " " + lastName;
  }
}

// console.log( "Hello, " + getFullName() ); //error, getFullName is defined only inside the function sayHiBye, so it's usable only inside that function.
// console.log( "Bye, " + getFullName() ); //error
console.log( "Bye, " + sayHiBye() ); //works

function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
//   console.log(count)
}

let counter = makeCounter();
console.log(counter);

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2

let counter2 = makeCounter();
console.log(counter2()); //0
console.log(counter2()); //1
console.log(counter2()); //2

//let me summarize my explanation: 
// Lexical environment have two properties, 1) environment record and 2) outer reference which points to function's hidden property [[Environment]] which points to parent's lexical environment where the function was born (if there is any parent, in case of script there is no parent so it's Lexical Environment's property outer reference points to null). 
// A new Lexical Environment of that function is formed every time a function is called and is destroyed after it's execution. 
// But not to confuse our function's hidden property [[Environment]] points to that specific lexical environment of it's parent when our function was born (counter1's and counter2's [[Environment]] don't point to same lexical environment ), 
// Garbage collector can't remove that parent's lexical environment as it is being referenced by [[Environment]] property  of our function (basic logic of garbage collector). 
// Search for variable starts from local Environment record then Environment record of lexical environment of parent where our function was born(as outer reference points to [[Environment]] property) then outer reference points to parents [[Environment]] property so search now begins in Environment record of Parent's Parent's lexical Environment where Parent function was first born, we can see its a chain.

//Summary of the terms

//Lexical Environment: The actual physical memory bucket (Registry + Pointer) existing at any given moment.

// Scope Chain: The process of searching through these environments from local to outer.

// Closure: The architectural feature where a function permanently holds onto its birthplace environment, allowing the Scope Chain search to work even after the parent function has stopped running.

//So Closure is a word we use for a function which can do these three things, form a registry every time of execution(Lexical Environment), have hidden property [[Environment]] pointing to it's birthplace and be able to perform search(Scope Chain). So every function is a closure (in JavaScript) but developers use Closure for these nested functions only. 

//A function which remembers it's birthplace and can search through it is called Closure. //Very brief description of Closure

//......................................

// Garbage collection

function f() {
  let value = Math.random();

  return function() { console.log(value); };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run

// let sfd = f();
// sfd();

let arr1 = [f(), f(), f()];
console.log(arr1)

//A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there’s at least one nested function referencing it.

function f1() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f1(); // while g function exists, the value stays in memory

g = null; // ...and now the memory is cleaned up

//Real life optimization, //didn't understand what this topic tryna teach

let value = "Surprise!";

function func() {
    // console.log(value) //ReferenceError: Cannot access 'value' before initialization
    let value = Math.random();

    console.log(value); //some random number

    function gunc() {
    // console.log("This is gunc")
    debugger; // in console: type alert(value); Surprise!
    }


    return gunc;
}

console.log(value); //Surprise!

let gunc = func();
gunc();

