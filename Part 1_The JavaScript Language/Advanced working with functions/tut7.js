//The "new Function" syntax

//let func = new Function ([arg1, arg2, ...argN], functionBody);

let func1 = new Function('a' , 'b' , 'console.log(a + b)');
let func2 = new Function('a , b' , 'console.log(a + b)');
let func3 = new Function(['a' , 'b'] , 'console.log(a + b)');
let func4 = new Function(['a , b'] , 'console.log(a + b)');
func1(1,2) //3
func2(1,2) //3
func3(1,2) //3
func4(1,2) //3

function parentfunc1() {
    let int = 5;
    let childfunc1 = new Function(`console.log(int)`); //34 //new Function [[Environment]] property points to lexical environment of script. 
    return childfunc1;
};
let int = 34;
parentfunc1()();

//compared to

function parentfunc2() {
    let int2 = 5;
    let childfunc1 = function(){
        console.log(int2);   //5
    }
    return childfunc1;
};
let int2 = 34;
parentfunc2()();

//where new Function is used? when we are getting functions from an API it is in string form so using new Function is our only choice to execute it in our script.

//minifier is a program that renames all our variables in order to make them less lengthy while running on server. So this is a really important reason why new Function is not a 'Closure'. 

//Summarized:
//Functions created with new Function, have [[Environment]] referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that’s actually good, because it insures us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
