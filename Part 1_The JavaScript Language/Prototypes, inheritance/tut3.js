//Native prototypes

//Object.prototype

// 'use strict';

let obj1 = {};
console.log( obj1 ); //{}
// alert(obj1); //[object Object] 

console.log(Object.prototype); 
//What we get:
/**
 //constructor: ƒ Object()
 hasOwnProperty: ƒ hasOwnProperty()
 isPrototypeOf: ƒ isPrototypeOf()
 propertyIsEnumerable: ƒ propertyIsEnumerable()
 toLocaleString: ƒ toLocaleString()
 toString: ƒ toString()
 valueOf: ƒ valueOf()
 __defineGetter__: ƒ __defineGetter__()
 __defineSetter__: ƒ __defineSetter__()
 __lookupGetter__: ƒ __lookupGetter__()
 __lookupSetter__: ƒ __lookupSetter__()
 __proto__: (...)
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
 */

console.log(Object.prototype === obj1.__proto__); //true

//...............................

//Other built-in prototypes

console.log(Array.prototype); //all the array methods
console.log(Function.prototype);
console.log(Array.__proto__ === Function.prototype);
console.log(Function.__proto__ === Function.prototype);


//By specification, all of the built-in prototypes have Object.prototype on the top. That’s why some people say that “everything inherits from objects”.

//let's say we have an array [1,2,3] it's [[Prototype]] points to Array.prototype, Array.prototype's [[Prototype]] which is an object points to Object.prototype. Object.protototype's [[Prototype]] points to null.

//now Array which is a function (used as constructor) it's [[Prototype]] points to Function.prototype, Function.__proto__ points to Function.prototype cuz it is a function. But since Function.prototype is an object it's [[Prototype]] points to Object.prototype.

//It is complex to get it but it is what it is.

console.log(Object.prototype.__proto__); //null

//What does [[Prototype]]'s [[Prototype]] points to? easy, whatever object [[Prototype]] is pointing to we have to look at that's [[Prototype]].

console.log(Array.__proto__.__proto__ === Object.prototype);

//..................................

//Primitives

// As we remember, they are not objects. But if we try to access their properties, temporary wrapper objects are created using built-in constructors String, Number and Boolean. They provide the methods and disappear.

console.log(String.prototype); //{...}
console.log(Number.prototype); //{...}
console.log(Boolean.prototype); //{...}

//Values null and undefined have no object wrappers
// Special values null and undefined stand apart. They have no object wrappers, so methods and properties are not available for them. And there are no corresponding prototypes either.

//.................................

//Changing native prototypes

//Native prototypes can be modified. For instance, if we add a method to String.prototype, it becomes available to all strings:

String.prototype.show = function() {
    console.log(this);
};

"BOOM!".show(); // {'BOOM!'}

//Important:
// Prototypes are global, so it’s easy to get a conflict. If two libraries add a method String.prototype.show, then one of them will be overwriting the method of the other.

// So, generally, modifying a native prototype is considered a bad idea.

// In modern programming, there is only one case where modifying native prototypes is approved. That’s polyfilling.

//ex:

if (!String.prototype.repeat) { // if there's no such method
    // add it to the prototype

    String.prototype.repeat = function(n) {
        // repeat the string n times

        // actually, the code should be a little bit more complex than that
        // (the full algorithm is in the specification)
        // but even an imperfect polyfill is often considered good enough
        return new Array(n + 1).join(this);
    };
}

console.log( "La".repeat(3) ); // LaLaLa

//Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification, but is not yet supported by a particular JavaScript engine.

//...............................

//Borrowing from prototypes

let obj2 = {
    0: "Hello",
    1: "world!",
    length: 2,
};

obj2.join = Array.prototype.join;

console.log( obj2.join(',') ); // Hello,world!

//It works because the internal algorithm of the built-in join method only cares about the correct indexes and the length property. It doesn’t check if the object is indeed an array. Many built-in methods are like that.

//

// Another possibility is to inherit by setting obj.__proto__ to Array.prototype, so all Array methods are automatically available in obj.

// But that’s impossible if obj already inherits from another object. Remember, we only can inherit from one object at a time.