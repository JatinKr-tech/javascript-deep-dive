let num = "not a number" / 2;
console.log(num + 2); //We will get "NaN"

//Mathematical operations in javascript is never fatal, code never dies, at worst we will get a "NaN"

console.log(1/0); //Infinity

//BigInt// We don't use BigInt unless we need to calculate beyond 2**53 - 1,
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992, it is wrong answer!!


console.log(9007199254740991n + 2n);

//.........................

//Strings
//"" and '' are same but `` is different as it allowes several functionalities and gives us a string.

let Name = "Jatin";
console.log("Age of ${Name} is ${19} Years"); //Age of ${Name} is ${19} Years
console.log(`Age of ${Name} is ${10+9} Years`); //Age of Jatin is 19 Years

//.........................

//Boolean
//The boolean type has only two values: true and false.

let value1 = true;
let value2 = false;
console.log(value1, value2);

let isGreater = 4 > 3.9;
console.log(isGreater);

//...........................

//null and undifined

let age = undefined;
let name = null;
console.log(age, name);


//...........................

//Symbol
let Id = Symbol('ID');
console.log(Id);

//...........................

// typeof
//syntax: 'typeof x' or 'typeof (x)'

// let typeofA = typeof undefined;
// let typeofA = typeof 10;
// let typeofA = typeof 10n;
// let typeofA = typeof value1;
// let typeofA = typeof isGreater;
// let typeofA = typeof (2 + 2);
// let typeofA = typeof (console.log(1/2)); //undefined
// let typeofA = typeof ('name');
// let typeofA = typeof 'name';
// let typeofA = typeof Math; //Object
// let typeofA = typeof null; //Object, so the story is it is not correct but it has been like this since the bigning of JS.
let typeofA = typeof alert; //later on we will study there is no type as function in JS but here typeof returns functions as function, they are actually objects. We will study about functions later on.

console.log(typeofA);

// Task 

let namee = "Ilya";

console.log( `hello ${1}` ); // hello 1