//Eval: run a code string

//The built-in eval function allows to execute a string of code.

let code = 'console.log("Hello")';
eval(code);

//The result of eval is the result of the last statement.

//for example:

let value1 = eval('1+1');
console.log(value1); //2

let value2 = eval('let i = 0; ++i'); 
console.log(value2); //1

//The eval’ed code is executed in the current lexical environment, so it can see outer variables: 

function f1() {
    let a1 = 3;
    eval('console.log(a1 + 2)')
};

f1(); //5 

//In strict mode, eval has its own lexical environment. So functions and variables, declared inside eval, are not visible outside:

eval(`let b1 = 5; console.log(b1 + 5)`);
// console.log(b1); //ReferenceError: b1 is not defined

//...................................

//Using “eval”

//using eval is considered bad now, it's really a headache when we use minifiers, using outer variables inside eval is considered a bad habit

//There are two ways how to be totally safe from such problems.

//1) If eval’ed code doesn’t use outer variables, please call eval as window.eval(...):

let x = 1;
{
  let x = 5;
  window.eval('console.log(x)'); // 1 (global variable)
};

//If eval’ed code needs local variables, change eval to new Function and pass them as arguments:

let f = new Function('a', 'console.log(a)');

f(11); // 5

//The new Function construct is explained in the chapter The "new Function" syntax. It creates a function from a string, also in the global scope.

let prompt1 = prompt("Write expression to calculate", "");

console.log(eval(prompt1));