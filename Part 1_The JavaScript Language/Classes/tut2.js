//Class inheritance

//Class inheritance is a way for one class to extend another class.

//............................

//The “extends” keyword

class Animal {
    name = "Animal";
    eat(){
        console.log(`${this.name} definetly eats!`)
    }
};

new Animal().eat(); //Animal definetly eats!

class Rabbit extends Animal {
    name = "Rabbit";
    jumps(){
        console.log(`${this.name} definetly jumps!`)
    }
};

//Rabbit.prototype instead of pointing to Object.prototype is now pointing to Animal.prototype because of syntax 'extends'

new Rabbit().jumps(); //Rabbit definetly jumps!
new Rabbit().eat(); //Rabbit definetly eats!

//Any expression is allowed after extends

function func1(){
    return class {
        sayHi(){
            console.log('Hi ' + this.name)
        }
    };
};

class Anonymous extends func1() {
    name = "anonymous"
    sayHello(){
        console.log('Hello ' + this.name)
    }
};

new Anonymous().sayHello(); //Hello anonymous
new Anonymous().sayHi(); //Hi anonymous

//...................................

//Overriding a method

/**
class Rabbit extends Animal {
  eat() {
    // ...now this will be used for rabbit.eat()
    // instead of eat() from class Animal
  }
}
 */

//'super' keyword

class Animal1 {
    constructor(breaths, eats, immortal){
        this.breaths = breaths;
        this.eats = eats;
        this.immortal = immortal;
    }
    name = "Animal";
    eat(){
        console.log(`${this.name} definetly eats!`)
    }
};

class Lion extends Animal1 {
    constructor(...args){
        // this.array = args;
        super(...arguments)
        this.array = args;
    }
};

console.log(new Lion(true, true, false))

class User {
    constructor(name) {
        this.name = name;
    }
    sayHi(){
        console.log(`Hi ${this.name}`)
    }
};

class User_Jatin extends User {
    /*
    constructor(name){
        this.name = this.name;
    }
        */

    sayWelcome(){
        console.log(`Welcome ${this.name}`)
    }
    sayHi() {
        super.sayHi();
        this.sayWelcome()
    }
    
};

let user_jatin = new User_Jatin("Jatin");
user_jatin.sayHi();

//Arrow functions have no super
// As was mentioned in the chapter Arrow functions revisited, arrow functions do not have super.

// If accessed, it’s taken from the outer function. For instance:

/*
class Rabbit2 extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}
  */

// The super in the arrow function is the same as in stop(), so it works as intended. If we specified a “regular” function here, there would be an error:

// Unexpected super

/*
class Rabbit3 extends Animal {
  stop() {
    setTimeout(function() {super.stop()}, 1000); //SyntaxError: 'super' keyword unexpected here
  }
}
  */

//............................

//Overriding constructor

//According to the specification, if a class extends another class and has no constructor, then the following “empty” constructor is generated:

class Rabbit4 extends Animal {
  // generated for extending classes without own constructors
  constructor(...args) {
    super(...args);
  }
};

class Rabbit5 extends Animal {
  constructor (name) {
    this.name = name;
  }
};

// new Rabbit5(); //ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

//Why this error?

//because there is a difference between function of a inheriting class (so called derived constructor) and normal constructor function.
//A derived constructor has a special internal property : [[ConstructorKind]]:"derived", when we call derived constructor with 'new' it doesn't create an empty object, it expects object to be created by parent constructor, to whose it's 'this' points to.

class Animal6 {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit6 extends Animal6 {

  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }

  // ...
}

// now fine
let rabbit6 = new Rabbit6("White Rabbit", 10);
console.log(rabbit6); //{speed: 0, name: 'White Rabbit', earLength: 10}
console.log(rabbit6.name); // White Rabbit
console.log(rabbit6.earLength); // 10

//Overriding class fields: a tricky note

class Animal7 {
    name = "Animal";
    constructor(){
        console.log(this.name);
    }
};

class Rabbit7 extends Animal7 {
    name = 'Rabbit';
    constructor(){
        super();
        // this.name = 'Rabbit'; 
    }
};

let rabbit7 = new Rabbit7(); //Animal
console.log(rabbit7); //Rabbit7 {name: 'Rabbit'} //when line 203 commented, : //{name: 'Animal'}

//So constructor runs first because v8 automatically puts class field at top of rest of the constructor body. In case of derived constructor, 'super' is placed higher and just below it is class fields in the execution context


//.......................................

// Super: internals, [[HomeObject]]

let Animal8 = {
    name : 'Animal',
    eat(){
        return `${this.name} eats`
    }

};

let Rabbit8 = {
    name: 'Rabbit',
    __proto__: Animal8,
    eat(){
        return this.__proto__.eat.call(this)
    }
};

console.log(Rabbit8.eat()); //Rabbit eats

let Animal9 = {
    name : 'Animal',
    eat(){
        return `${this.name} eats`
    }

};

let Rabbit9 = {
    name: 'Rabbit',
    __proto__: Animal9,
    eat(){
        return this.__proto__.eat.call(this)
    }
};

let Jumps9 = {
    name: 'Jumps',
    __proto__: Rabbit9,
    eat(){
        return this.__proto__.eat.call(this)
    }
};

// console.log(Jumps9.eat()); //RangeError: Maximum call stack size exceeded

//it happens cuz we gave eat() 'this' context which points to Jumps9, so it infinitely keeps calling Jumps9.__proto__.eat.call(Jumps9). 

//.......................

//[[HomeObject]]

//To solve the above issue of infinite recursion, javascript does the following:
//It adds one more internal property to every function '[[HomeObject]]'. 
//When a function is specified as a class or object method, its [[HomeObject]] property becomes that object.
//Then super uses it to resolve the parent prototype and its methods.

let Animal10 = {
    name : 'Animal',
    eat(){      //[[HomeObject]] = Animal10
        return `${this.name} eats`;
    }

};

let Rabbit10 = {
    name: 'Rabbit',
    __proto__: Animal10,
    eat(){      //[[HomeObject]] = Rabbit10
        return super.eat();
    }
};

let Jumps10 = {
    name: 'Jumps',
    __proto__: Rabbit10,
    eat(){      //[[HomeObject]] = Jumps10
        return super.eat();
    }
};

console.log(Jumps10.eat()); //Jumps eats

//It works as intended, due to [[HomeObject]] mechanics. A method, such as Jumps10.eat, knows its [[HomeObject]] and takes the parent method from its prototype. Without any use of this.

let Animal11 = {
    name : 'Animal',
    eat(){      //[[HomeObject]] = Animal11
        return `${this.name} eats Plants`;
    }

};

let Rabbit11 = {
    name: 'Rabbit',
    __proto__: Animal11,
    eat(){      //[[HomeObject]] = Rabbit11
        return super.eat();
    }
};

let Plant11 = {
    name : 'Trees',
    eat(){      //[[HomeObject]] = Plant11
        return `${this.name} Grows`;
    }
}

let Tree11 = {
    name: 'Tree',
    __proto__: Plant11,
    // eat(){       //[[HomeObject]] = Tree11
    //     return Rabbit11.eat()
    // }
    eat : Rabbit11.eat //eat points to Rabbit11.eat
    // For Rabbit11.eat, [[HomeObject]] = Rabbit11, as it was created in rabbit. There’s no way to change [[HomeObject]].
};

console.log(Tree11.eat()); //Tree eats Plants

//.............................................

//Methods, not function properties

// [[HomeObject]] is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as method(), not as "method: function()".

// The difference may be non-essential for us, but it’s important for JavaScript.

// In the example below a non-method syntax is used for comparison. [[HomeObject]] property is not set and the inheritance doesn’t work:

"use strict";

let Animal12 = {
    sayHi: function() { //intentionally writing like this, for show purposes, not any different
        return `Hi Animal`
    }
};

let Rabbit12 = {
    __proto__: Animal12,

    sayPhrase() {
        return super.sayHi();
    },
    /*
    sayHi: function(){
        return super.sayHi(); //SyntaxError: 'super' keyword unexpected here
    }
        */
};

console.log(Rabbit12.sayPhrase()); //Hi Animal
// console.log(Rabbit12.sayHi());

//I am gonna explain all about super() and super.method(), along with all the things i learned in this lesson, 

//The SUMMARY!!:

//every Function has a special internal property '[[HomeObject]]' (static), in case of non-methods generic-functions it points to undefined, but in case of methods it points to Object/class where the method was created.

//every class constructor function has a special internal property '[[ConstructorKind]]', In case of generic class constructor function it's value is "base", In case of inheriting class constructor function it's value is "derived". When we call class or function with syntax 'new', v8 engine looks for this specific property, if [[ConstructorKind]] value is "base" then a new object is created in memory and "this" of class constructor points to that object. if it's value is "derived", class (inheriting) constructor function doesn't create a new object and it's "this" is uninitialized. (chaining works here if parent is also an inheriting class)

//super() passes arguments and new.target, what is new.target? new.target references the class which was called with new, we can say the inheriting class.
//super() invokes [[Construct]] instead of [[Call]] (that's why no need of 'new' here) of parent class constructor function and if it's [[ConstructorKind]] : "base", that constructor function creates a brand new object, assign's all the properties to it. (chaining works here if parent is also an inheriting class)
//That object's [[Prototype]] property points to new.target.prototype V8 engine does it automatically but there are several edge cases which could be googled.
//super() returns that object and initializes 'this' or inheriting class constructor function, and assigns it to that object's address in memmory



//super.method() passes arguments and 'this' (context)
//How it works like:
/**
method(){ //[[HomeObject]] = obj (where this method was specified), 'this' (context) 
        return [[HomeObject]].__proto__.method.call(this)
        //or
        return Object.getPrototypeOf([[HomeObject]]).method.call(this) //more precise
    }
 */
//super.method() invokes [[Call]] of parent class/object's method and returns whatever that method returns.