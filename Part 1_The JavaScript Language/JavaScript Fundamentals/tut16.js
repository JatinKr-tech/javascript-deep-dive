function sayHi() {
  alert( "Hello" );
}

console.log( sayHi ); // shows the function code

let lmao = function () {
    console.log("Hello")
};
console.log(lmao) //shows the function code.
//semicolon is not a part of function syntax!

let lmao2 = lmao;
console.log(lmao2); //show the function code. 
lmao2() //Hello

//.....................

//callback

//
/*
let Q = "Is Earth a sphere?";
function showYes() {
    console.log("You are right");
}
function showNo() {
    console.log("You are wrong");
    
}

function ask (question, yes, no) {
    if(confirm(question)) {
        yes()
    } else {
        no()
    }
}

ask(Q, showYes, showNo);
*/

//another example of callback function.
function ask (question, yes, no){
    if(confirm(question)) {
        yes()
    } else {
        no()
    }
}

ask (
    "does earth have a magnetic field?",
    function(){ console.log("You are goddam right!");},
    function(){ console.log("Study hard kid!");}
)

//Strings, data are numbers while function is an action.

//...................

//Function expression vs Function declaration.

//Function declaration is more readable and we should use it but if our demands are different then use whatever suits you!!!!

/*
// Function Declaration
function sum(a, b) {
  return a + b;
}

// Function Expression
let sum = function(a, b) {
  return a + b;
};
*/

//

sayHello("John"); // Hello, John

function sayHello(name) {       //It is a global function, could be called anytime
  alert( `Hello, ${name}` );
}


// sayBye("John"); // error! won't work.
let sayBye = function(name) {  // (*) no magic any more, it is not a global function, could be called onlry after it has been defined.
    alert( `Bye, ${name}` );
};
sayBye("John")  //works

//
/*

let age = 16; // take 16 as an example

if (age < 18) {
  welcome();               // \   (runs)
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
  welcome();               // /   (runs)

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

welcome(); // Error: welcome is not defined
*/
/*

let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("You are not old");
  };

} else {

  welcome = function() {
    alert("Greetings! you are old");
  };

}

welcome(); // ok now
*/
/*

let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

welcome(); // ok now
*/