//The “class” syntax

// The basic syntax is:

/*
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
*/

//Then use new MyClass() to create a new object with all the listed methods.

// The constructor() method is called automatically by new, so we can initialize the object there.

class User {
    constructor(name){
        this.name = name;
    }
    sayPhrase(phrase){
        return(`${phrase} ${this.name}`);
    }
}

let user = new User("Jatin")

console.log(user);
console.log(user.sayPhrase("Hi"));

console.log(typeof User); //function
console.log(Object.getPrototypeOf(User) === Function.prototype); //true
console.log(Object.getPrototypeOf(user) === User.prototype); //true

console.log(Object.getOwnPropertyNames(User.prototype)); //['constructor', 'sayPhrase'] //Constructor which points to User function itself, not the same constructor which we wrote, See code line 58 below.

//imp: No comma between class methods

//..............................

//What is a Class?

//In JavaScript, Class is a kind of a function

//Here is how Class works:

//When you declare a Class named User and call it with 'new' syntax, Here is the step by step execution that results in an object:

//1) The User function is created (its body is your constructor code). All your other methods are assigned to User.prototype.
//2)  An empty object is created (since we called User with 'new syntax)
//3) Function User executes constructor function/method and binds it's 'this' to that empty object. That way constructor assigns the properties to that object.
//4) that object's [[Prototype]] points to User.prototype and that way we are able to access all the methods (through chaining).

//step 1, more explanation:
//I totally forgot that there would be a conflict, every function (excluding Arrow function) get's a prototype property, which has a constructor property which points to the function itself.

//.........................................

//Not just a syntactic sugar

function User2(name){
    this.name = name;
};

User2.prototype.sayHi = function(){
    return `Hi ${this.name}`
};

let user2 = new User2("John");

console.log(user2.sayHi()); //Hi John

//What's the difference between creating obj using classes and without classes using constructor function?

//1) a function created by class is labelled by a special internal property [[IsClassConstructor]]: true. So it’s not entirely the same as creating it manually.

    //The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with new

    //Also, a string representation of a class constructor in most JavaScript engines starts with the “class…”

    class User3 {
        constructor() {}
    }

    // User3(); //error
    // alert(User3); // class User3 { constructor() {} }

//2) Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype".

    console.log(Object.getOwnPropertyDescriptor(User.prototype, 'sayPhrase')); //{writable: true, enumerable: false, configurable: true, value: ƒ}

//3) Classes always use strict. All code inside the class construct is automatically in strict mode.

//........................................

//Class Expression

// Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

let Admin = class Admin342 {
    constructor(name){
        this.name = name;
    }
    sayHi(){
        return `Hi ${this.name}`;
    }
    show(){
        return Admin342;
    }
};

let admin = new Admin("Yala"); 

console.log(admin) // Admin342 {name: 'Yala'}
console.log(admin.sayHi()) //Hi Yala

//Similar to Named Function Expressions, class expressions may have a name.
// If a class expression has a name, it’s visible inside the class only:

console.log(Admin); //class Admin342 { constr... }
// console.log(Admin342); //ReferenceError: Admin342 is not defined

console.log(admin.show()) //class Admin342 { constr... }

//We can even make classes dynamically “on-demand”, like this:

function onDemand(){
    return class {
        constructor(name){
            this.name = name;
        }
        sayHi(phrase){
            return `${phrase} ${this.name}`
        }
    };
};

let User4 = onDemand();
console.log(User4); //class { constr... }

let user4 = new User4("Jatin")

console.log(user4); //{name: 'Jatin'}
console.log(user4.sayHi("Hello")); //Hello Jatin

//.....................................

//Getters/setters

class User5 {
    constructor(name){
        this.name = name;
    }
    get name(){
        return this._name;
    }
    set name(value){
        if(value.length < 4){
            console.log("Name's too short boii");
        } else {
            this._name = value;
        };
    }
};

let user5 = new User5(""); //Name's too short boii
console.log(user5); //User5 {}

let user51 = new User5("Jatin");
console.log(user51); //User5 {_name: 'Jatin'}

//............................

//Computed names […]

class User6 {
    constructor(name){
        this.name = name;
    }
    ['say' + 'Phrase'](phrase){
        return `${phrase} ${this.name}`
    }
};

console.log(new User6("Jatin").sayPhrase('Hi')); //Hi Jatin

//....................................

//Class fields

//Old browsers may need a polyfill
// Class fields are a recent addition to the language.

class User7 {
    name = "Jatin"

    sayHi(){
        console.log( `Hi ${this.name}` );
    }
};

let user7 = new User7();

user7.sayHi(); //Hi Jatin

//we can use class field instead of writing inside constructor method if we ain't passing arguments (or if our property ain't dynamic).
//class fields executes first before everything else

//We know methods get assigned to className.prototype, so they are shared and their 'this' is dynamic.

setTimeout(user7.sayHi, 1000); //Hi  //'this' has context of window/global, not user7

//

class User8 {
    name = "Jatin"
    sayHi = ()=>{console.log(`Hi ${this.name}`)} //works
    // sayHi = function(){console.log(`Hi ${this.name}`)} //fails
};

let user8 = new User8();

setTimeout(user8.sayHi, 1000); //Hi Jatin,

//since arrow function or any other non-arrow function stores it's parent's lexical environment pointed by internal hidden property [[Enviornment]] of that function. In case of non-Arrow function, context of 'this' is calculated when it is called but in case of arrow function that can't happen and a complete different thing happens, scope search, and context of 'this' is taken from that lexical environment  pointed by [[Environment]] property of that arrow function. 

//In case of arrow function, context of 'this' is searched (scope search) in different way, than for non-arrow function where context of 'this' is derived/calculated/searched completely different way.


//summary
//syntax of class looks like this:

/**
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
 */