//function inside an object is called a "method". 

//

let userOne = {
    name : "Jatin",
    age : 19,
    // function patrik() {};       //not syntax like this
    func1 : function() {
        console.log(userOne.name)
    },


};

userOne.func1();

let adminOne = userOne;

userOne = null;

// adminOne.func1();     //error, so how it works is that it looks for global variable userOne then look for name inside the object it is pointing to.

adminOne.funcNew1 = function() {
    console.log(adminOne.name);
};
adminOne.funcNew1(); //Jatin, works, so how it works is that it looks for global variable adminOne then looks for name inside the object it is pointing to.

//

let userTwo = {
    name : "Leon",
    age : 50,
    func2 : function() {
        console.log(this.name);
    },
};

userTwo.func2(); //Leon, works //so how it works is that, it looks for parent object and then look for name.

let adminTwo = userTwo;

userTwo = null;

adminTwo.func2(); //Leon, works

//"this" is not bound.

let userThree = {
    name : "Light Yagami",
}

let adminThree = {
    name : "L Lawliet",
};

function callingName () {
    console.log(this.name);
};

// "this" inside the function is the object "before the dot"

userThree.aFunction = callingName;
adminThree.aFunction = callingName;

userThree.aFunction(); //Light Yagami
adminThree["aFunction"](); //L Lawliet

//Calling without an Object

let objectOne = function() {
    console.log(this);
};
objectOne();

function callingWithoutAnObject () {
    console.log(this);
};
callingWithoutAnObject();

//In this case this is undefined in strict mode. If we try to access this.name, there will be an error.

// In non-strict mode the value of this in such case will be the global object (window in a browser, we’ll get to it later in the chapter Global object). This is a historical behavior that "use strict" fixes.

// Usually such call is a programming error. If there’s this inside a function, it expects to be called in an object context.

//"this" works differently in other coding languages, it is bound there, meaning it has memory but not in javascript.

//
//Arrow function don't have their own this, meaning if we refrence this from an arrow function, it's taken from outer function/outer context, here is an example:

let userFour = {
    name : "Eren Jaeger",
    exampleFunc() {
        let arrowFunc = () => {
            console.log(this.name); //Eren Jaeger, value of "this" is coming from reference not from arrowFunc but through reference through exampleFunc of object userFour.
        };
        arrowFunc();
    },
};

userFour.exampleFunc();

//tasks in tut4_tasks.js file






