//Class checking: "instanceof"

//The instanceof operator allows to check whether an object belongs to a certain class. It also takes inheritance into account.

//.............................

//The instanceof operator

//The syntax is:
// obj instanceof Class

//It returns true if obj belongs to the Class or a class inheriting from it.

class Rabbit {}
let rabbit = new Rabbit();

// is it an object of Rabbit class?
console.log( rabbit instanceof Rabbit ); // true

// instead of class
function Rabbit2() {}

console.log( new Rabbit2() instanceof Rabbit2 ); // true

//…And with built-in classes like Array:
let arr = [1, 2, 3];
console.log( arr instanceof Array ); // true
console.log( arr instanceof Object ); // true

//note:
//arr also belongs to the Object class. That’s because Array prototypically inherits from Object.

//Normally, instanceof examines the prototype chain for the check. We can also set a custom logic in the static method Symbol.hasInstance.

// The algorithm of obj instanceof Class works roughly as follows:

//1) If there’s a static method Symbol.hasInstance, then just call it: Class[Symbol.hasInstance](obj). It should return either true or false, and we’re done. That’s how we can customize the behavior of instanceof.

//ex:

// set up instanceof check that assumes that
// anything with canEat property is an animal
class Animal {
    static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
    }
}

let obj = { canEat: true };

console.log(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called

//2) Most classes do not have [Symbol.hasInstance]. In that case, the standard logic is used: obj instanceof Class checks whether Class.prototype is equal to one of the prototypes in the obj prototype chain.

//what it looks like:
/**
obj.__proto__ === Class.prototype?
obj.__proto__.__proto__ === Class.prototype?
obj.__proto__.__proto__.__proto__ === Class.prototype?
...
// if any answer is true, return true
// otherwise, if we reached the end of the chain, return false
 */

//ex:
class Animal3 {}
class Rabbit3 extends Animal3 {}

let rabbit3 = new Rabbit3();
console.log(rabbit3 instanceof Animal3); // true

// rabbit.__proto__ === Animal.prototype //false //(no match)
// rabbit.__proto__.__proto__ === Animal.prototype //true //(match!)

//we can use .isPrototypeOf too instead:
console.log(Animal3.prototype.isPrototypeOf(rabbit3)); //true

//Interesting consequences when a prototype property is changed after the object is created.

function Rabbit4() {}
let rabbit4 = new Rabbit4();

// changed the prototype
Rabbit4.prototype = {};

// ...not a rabbit any more!
console.log( rabbit4 instanceof Rabbit4 ); // false

//.........................................

//Bonus: Object.prototype.toString for the type

let obj2 = {};

// alert(obj2); // [object Object]
console.log(obj2.toString()); // [object Object]

//We can use it as an extended typeof and an alternative for instanceof.

//By specification, the built-in toString can be extracted from the object and executed in the context of any other value. And its result depends on that value.

// For a number, it will be [object Number]
// For a boolean, it will be [object Boolean]
// For null: [object Null]
// For undefined: [object Undefined]
// For arrays: [object Array]
// …etc (customizable).

//ex

let objectToString = Object.prototype.toString;

// what type is this?
let arr1 = [];

console.log( objectToString.call(arr1) ); // [object Array]
//we are tricking 'this' of Object method '.toString' 
//already explained in lesson : Decorators and forwarding, call/apply

console.log( objectToString.call(123) ); // [object Number]
console.log( objectToString.call(null) ); // [object Null]
console.log( objectToString.call(alert) ); // [object Function]

//Symbol.toStringTag

//The behavior of Object toString can be customized using a special object property Symbol.toStringTag.

let user = {
  [Symbol.toStringTag]: "User"
};

console.log( {}.toString.call(user) ); // [object User]

// toStringTag for the environment-specific object and class:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]

//As you can see, the result is exactly Symbol.toStringTag (if exists), wrapped into [object ...].

// At the end we have “typeof on steroids” that not only works for primitive data types, but also for built-in objects and even can be customized.

// We can use {}.toString.call instead of instanceof for built-in objects when we want to get the type as a string rather than just to check.