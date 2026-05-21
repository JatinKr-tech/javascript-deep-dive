//Arrow Function


let sum = function(a, b) {
    return a + b;
};
console.log(sum(1, 2));


//above function expression in arrow function.
let arrowSum = (a, b) => a + b;
console.log(arrowSum(1, 2));

let age = 21;

let checkAge = (age < 18)? 
            ()=> console.log("You are underage"): 
            ()=> console.log("You are old enough");

checkAge();

let arrowfunc = (a, b)=> {
    console.log("this is an arrowfunction inside parantheses");
    let addition = a + b;
    return addition;
}
console.log(arrowfunc(23, 27));
//When we have to run multiple lies of code inside arrow function then we have to use parantheses and hence we have to write "return" expression too when inside parantheses. Otherwise we will get undefined.

//......................

//task

/*
let ask = (question, yes, no) => {
    if (confirm(question)) {
        yes();
    } else {
        no()
    }
};

ask(
    "Is Sun a Star?",
    ()=> console.log("You are goddam right!"),
    ()=> console.log("Wrong!")
);
*/
let ask = (question, yes, no)=> confirm(question)? yes() : no();

ask(
    "is the Sun a Star?",
    ()=> console.log("You are goddam right"),
    ()=> console.log("Wrong!")
);

