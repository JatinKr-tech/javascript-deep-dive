//Constructor functions or, briefly, constructors, are regular functions, but there’s a common agreement to name them with capital letter first.


function Constructor (nameValue) {
    //this = {}; automatically because of "new"
    this.name = nameValue;
    this.admin = false;
    //return this; automatically because of "new"
};


let userOne = new Constructor("Jill");
let userTwo = new Constructor("Ashley")

console.log(userOne); // name: Jill, admin false
console.log(userTwo); //name: Ashley, admin false
console.log(userTwo.name); //Ashley

//What "new" does? "new" creates an empty object, ("this" refers to that empty object), so we get an object with name and admin properties inside it.

//
let userThree = new function(){
    this.name = "Leon";
    this.admin = true;
};

console.log(userThree) 
//

//..................

//Constructor mode test: new.target

function ForTestOne() {     //using Capital letter for first word for name of the function is industrial practice.
    console.log(new.target);
}; 

ForTestOne(); //"new.target" return undefined
new ForTestOne(); //"new.target" returns whole function syntax

//

let ForTestTwo = function() {
    console.log(new.target);
};

new ForTestTwo();

//

function UserFour() {       //
    if (!new.target) {  //! converts to boolean and flips it's value
        return new UserFour();
    }

    this.name = "Gotham";
};

console.log(UserFour());
console.log(new UserFour());

//

//let's check what we get if we add return something, if that something is premitive then it will be ignored by new func(), if it is a different object then we will get that different object

function WhatWillItReturn1 () {
    this.name = "Will";
    this.age = 40;

    return "lmao";
};

console.log(WhatWillItReturn1()); //lmao
console.log(new WhatWillItReturn1()); //object, return "lmao"; got ignored because lmao is primitive;

function WhatWillItReturn2 () {
    this.name = "Jonnah";
    this.age = 50;

    return {name : "Jacob"};
}

console.log(WhatWillItReturn2()); //{name: jacob}
console.log(new WhatWillItReturn2()); //{name: jacob}
console.log(new WhatWillItReturn2); //{name: jacob} //We can ommit parantheses'()' while using 'new', it is same as the above one. But it is not good habit to do so.

//


//..................

//Methods(Functions) in Constructor

function MethodsInConstructor() {
    this.name = "Grace Ashcroft"
    this.introduction = function() {
        return "My name is " + this.name
    };
};

let graceProfile = new MethodsInConstructor();

console.log(graceProfile.introduction());

//...........................
console.log("\n");
//Tasks

//task1
let externalObj = {name : "kaiju"};
function Profile1(obj) {
    this.name = "Steve";
    return obj;
};

function Profile2(obj) {
    this.name = "Steve";
    return obj;
};

let a = new Profile1(externalObj);
let b = new Profile2(externalObj);

console.log(a == b) //true only if these constructor functions are returning same external object.

//task2

function Calculator() {
    this.read = function() {
        this.a = +prompt("Enter Value of a", "8")
        this.b = +prompt("Enter Value of a", "4")
    };
    this.sum = function() {
        return this.a + this.b
    };
    this.mul = function() {
        return this.a * this.b
    };
};

let calculator = new Calculator();
// calculator.read();
// console.log(calculator.sum());
// console.log(calculator.mul());

//task3

function Accumulator(startingValue) {
    this.value = +startingValue;
    this.read = function() {
        let ask = +prompt("Enter a valid number", "4")
        this.value = this.value + ask;
    };
}


let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

console.log(accumulator.value); // shows the sum of these values