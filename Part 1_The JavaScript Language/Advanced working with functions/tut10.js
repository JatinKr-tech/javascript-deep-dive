'use strict';

//Function binding

//Losing “this”

let user = {
    userName : "Jatin",
    sayHi() { 
        console.log("Hi " + this.userName);
    }
};
window.userName = "John";

user.sayHi(); //Hi Jatin
//sayHi already exists in memory and we are pointing it's address under user. So when v8 decides value of 'this' it points to user.

setTimeout(user.sayHi, 1000); //Hi John
//sayHi already exists in memory and we are pointing it's address under setTimeout. So when v8 decides value of 'this' it points to window, why not setTimeout? we will see.

//...............................

//Solution 1: a wrapper

setTimeout(()=>{user.sayHi()},1100); //Hi Jatin
//here we are not pointing to the address of sayHi sitting in memory, here we are calling the method of user named sayHi, understand the difference.

//Problem with solution 1.

let user2 = {
    userName : "Jatin",
    sayHi() { 
        console.log("Hi " + this.userName);
    }
};

setTimeout(()=>{user2.sayHi()},1100); //Yooo hi Jatin, it's is not a problem it is simple logic

user2.sayHi = function (){console.log("Yooo hi " + this.userName)};

//...........................

//Solution 2: bind

//Functions provide a built-in method bind that allows to fix this.
//Syntax
/**
let boundFunc = func.bind(context);
 */

function func1(word){
    console.log(`What is your ${word} ${this.userName}?`)
};

let bindFunc1 = func1.bind(user);

bindFunc1("goal"); //What is your goal Jatin?

//

let user3 = {
    userName : "Butterfly",
    sayHi() { 
        console.log("Hi " + this.userName);
    }
};

let sayHi1 = user3.sayHi.bind(user3);

setTimeout(sayHi1,1100); //Hi Butterfly,

user3.sayHi = function (){console.log("Yooo hi " + this.userName)};

//note for convinence "bindAll"

//If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop:

/**
for (let key in user) {
    if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
    };
};
 */

//....................

//Partial functions

//We can bind not only this, but also arguments. That’s rarely done, but sometimes can be handy.

//the full syntax of "bind"
/**
let bound = func.bind(context, [arg1], [arg2], ...);
 */

function funcArg(a, b){
    console.log(`${a} is the father of ${b}`);
};

let funcArgBound = funcArg.bind(null,"Harvard Stark", "Tony Stark");

funcArgBound(); //Harvard Stark is the father of Tony Stark
funcArgBound("fsd", "sd"); //Harvard Stark is the father of Tony Stark

let funcArgBound2 = funcArg.bind(null, "Gandhi");

funcArgBound2("The Republic of India"); //Gandhi is the father of The Republic of India

// "partial function application" – we create a new function by fixing some parameters of the existing one.

//..................................

//Going partial without context

function partial(func, ...Arg1Bound){
    return function wrapper(...Arg2){
        return func.call(this, Arg1Bound, Arg2);
    };
};

let user4 = {
    name: "Shakira",
    sayHello(a, b){
        console.log(`${this.name} is ${a} years old and ${b} dollars rich.`);
    }
};

user4.sayHello = partial(user4.sayHello, 38);
user4.sayHello("55 Million"); //Shakira is 38 years old and 55 Million dollars rich.