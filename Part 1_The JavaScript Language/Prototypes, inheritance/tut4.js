//Prototype methods, objects without __proto__

//Using obj.__proto__ is outdated, it's is now in Annex B of javascript meaning it is slow and should be avoided.

//Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
// Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto.

//The only usage of __proto__, that’s not frowned upon, is as a property when creating a new object: { __proto__: ... }.
//Although, there’s a special method for this too:
// Object.create(proto, descriptors);

let animal = {
    eat: true
};
let updated_animal = {
    eat: true,
    breaths: true
};

let rabbit = Object.create(animal); //same as {__proto__: animal};

console.log(rabbit.eat); //true

console.log(Object.getPrototypeOf(rabbit) === animal); //true

Object.setPrototypeOf(rabbit, updated_animal);

console.log(Object.getPrototypeOf(rabbit) === animal, Object.getPrototypeOf(rabbit) === updated_animal); //false, true

//The Object.create method is a bit more powerful, as it has an optional second argument: property descriptors.

// We can provide additional properties to the new object there, like this:

let lion = Object.create(updated_animal, {
    // jumps: true //error (must be an object)
    jumps: {
        value: "36x12 feets (WxH)",
        writable: false
    }
});

console.log(lion); //{jumps: '36x12 feets (WxH)'}
console.log(lion.breaths); //true

//We can use Object.create to perform an object cloning more powerful than copying properties in for..in:


let lion_clone = Object.create(
  Object.getPrototypeOf(lion), 
  Object.getOwnPropertyDescriptors(lion)
);

console.log(lion_clone, Object.getOwnPropertyDescriptor(lion_clone, 'jumps'))
//{jumps: '36x12 feets (WxH)'} 
// {value: '36x12 feets (WxH)', writable: false, enumerable: false, configurable: false}

console.log(Object.getPrototypeOf(lion_clone)); //{eat: true, breaths: true}

//.............................

//Brief History:

//Later, in the year 2012, Object.create appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. Some browsers implemented the non-standard __proto__ accessor that allowed the user to get/set a prototype at any time, to give more flexibility to developers.
// Later, in the year 2015, Object.setPrototypeOf and Object.getPrototypeOf were added to the standard, to perform the same functionality as __proto__. As __proto__ was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
// Later, in the year 2022, it was officially allowed to use __proto__ in object literals {...} (moved out of Annex B), but not as a getter/setter obj.__proto__ (still in Annex B).


//Why we should avoid using __proto__? :

//Improtant:

//Don’t change [[Prototype]] on existing objects if speed matters
// Technically, we can get/set [[Prototype]] at any time. But usually we only set it once at the object creation time and don’t modify it anymore: rabbit inherits from animal, and that is not going to change.

// And JavaScript engines are highly optimized for this. Changing a prototype “on-the-fly” with Object.setPrototypeOf or obj.__proto__= is a very slow operation as it breaks internal optimizations for object property access operations. So avoid it unless you know what you’re doing, or JavaScript speed totally doesn’t matter for you.

//...........................

//"Very plain" objects

let obj = {};


// let key = prompt("What's the key?", ""); //if user enters __proto__
let key = __proto__; //for my convinence i commented above code.
obj[key] = "some value"; //__proto__ must be either object or null, so since we are trying to set __proto__ value to a string which it can't take it sets to undefined.

console.log(obj.key); //undefined
// alert(obj.key); //undefined

//in real world when we try to store something inside __proto__ key and store some object then __proto__ would point to that object which might be problematic, there could be conflicts, we developers know it but non-developers don't know we should not store something inside __proto__ so to avoid this problem we could use Map to store key value pairs, there this problem doesn't appear.

let map = new Map();

// let key2 = prompt("What's the key?", ""); //if user enters __proto__
let key2 = __proto__; //for my convinence i commented above code.

map.set(key2, "some value");
console.log(map.get(key2)); //"some value"

//So __proto__ is a property inside Object.prototype it has get and set (not methods but similar), what it does is that it gets or sets [[Prototype]] of obj, we access it through chain as it lives inside Object.prototype. this is very circular, we are able to access __proto__ because [[Prototype]] of obj points to Object.prototype, what happens when we set __proto__ to null either through .create method or manually, we access __proto__ for one last time from Object.prototype, use it to set [[Prototype]] value to null and as soon as [[Prototype]] becomes null we are not able to access __proto__ and all other object methods ever again through prototype chaining, we can access it through Object.prototype.methodName (Object.prototype.__proto__). 

let obj21 = Object.create(null); //we set [[Prototype]] pointing to null instead of Object.prototype which contains __proto__ property having getter and setter.

obj21.__proto__ = "some value";

console.log(obj21.__proto__); //"some value"

obj21.name = "Jatin";
obj21.age = 19;

// alert(obj21); //error, can't access .toString sitting inside Object.prototype

console.log(Object.keys(obj21)); //['__proto__', 'name', 'age']