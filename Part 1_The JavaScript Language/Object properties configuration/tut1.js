// "use strict";
//Property flags and descriptors


//Property flags

// Object properties, besides a value, have three special attributes (so-called “flags”):

// writable – if true, the value can be changed, otherwise it’s read-only.
// enumerable – if true, then listed in loops, otherwise not listed.
// configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.

//Object.getOwnPropertyDescriptor

// let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

let obj1 = {
    name: "Jatin",
    age: 19
};

let obj1_name_descriptor = Object.getOwnPropertyDescriptor(obj1, "name");
let obj1_age_descriptor = Object.getOwnPropertyDescriptor(obj1, "age");

console.log(obj1_name_descriptor); //{value: 'Jatin', writable: true, enumerable: true, configurable: true}
console.log(JSON.stringify(obj1_name_descriptor, null, 2))

console.log(obj1_age_descriptor); //{value: 'Jatin', writable: true, enumerable: true, configurable: true}
console.log(JSON.stringify(obj1_age_descriptor, null, 2))

//
//To change the flags, we can use Object.defineProperty.

//Object.defineProperty(obj, propertyName, descriptor)

//If the property exists, defineProperty updates its flags. Otherwise, it creates the property with the given value and flags; in that case, if a flag is not supplied, it is assumed false.

let obj2 = {
    name: "Ramanujan"
};

console.log(Object.getOwnPropertyDescriptor(obj2, "name")); //{value: 'Ramanujan', writable: true, enumerable: true, configurable: true}

Object.defineProperty(obj2, 'name', {somethingInsideName: "rip"}); //Neither anything changes, nor anything gets added, 
console.log(Object.getOwnPropertyDescriptor(obj2, "name")); //{value: 'Ramanujan', writable: true, enumerable: true, configurable: true}

Object.defineProperty(obj2, 'name', {value: "Chandra Sekhar"}); //we can change value
console.log(Object.getOwnPropertyDescriptor(obj2, "name")); //{value: 'Chandra Sekhar', writable: true, enumerable: true, configurable: true}


//when we add/define property which has not been defined in object before:
Object.defineProperty(obj2, "nationality", {value: "Indian"});
console.log(Object.getOwnPropertyDescriptor(obj2, "nationality")) //{value: 'Indian', writable: false, enumerable: false, configurable: false}

//As you can see all flags are falsy

//....................................

//Non-writable

let obj3 = {
    name: "Tony Stark"
};

Object.defineProperty(obj3, "name", {writable: false});

console.log(Object.getOwnPropertyDescriptor(obj3, "name")); //{value: 'Tony Stark', writable: false, enumerable: true, configurable: true}

obj3.name = "Dr Banner"; //in strict mode this would throw error too but in non-strict mode it does't throw error. But in both cases we can't change the value because writable: false
console.log(obj3); //{name: 'Tony Stark'} 

//can't change name property's value since it is not writable, only readable, only way to change name property's value is through Object.defineProperty

Object.defineProperty(obj3, "name", {value: "Steve Rogers"});
console.log(obj3); //{name: 'Steve Rogers'} 

//...........................

//Non-enumerable

let obj4 = {
    name: "Scarlett Johanson",
    age: 35,
    toString(){
        return this.name;
    },
    valueOf(){
        return this.age;
    }
};

for(let key in obj4) console.log(key); //name, age, toString, valueOf
console.log(Object.keys(obj4)); //['name', 'age', 'toString', 'valueOf']
console.log("\n");

Object.defineProperty(obj4, "toString", {enumerable: false})

for(let key in obj4) console.log(key); //name, age, valueOf
console.log(Object.keys(obj4)); //['name', 'age', 'valueOf']
console.log("\n");

Object.defineProperty(obj4, "valueOf", {enumerable: false})

for(let key in obj4) console.log(key); //name, age
console.log(Object.keys(obj4)); //['name', 'age']
console.log("\n");

//..................................

//Non-configurable

//Please note: configurable: false prevents changes of property flags and its deletion, while allowing to change its value writable flag's (true to false only) and property's own value (writable decides that so that explaines).

let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
console.log(descriptor); //{value: 3.141592653589793, writable: false, enumerable: false, configurable: false}

Math.PI = 3; //in strict mode it will throw an error
console.log(Math.PI); //3.141592653589793

// Object.defineProperty(Math, "PI", {writable: true}); //TypeError: Cannot redefine property: PI, //Why? because we can change writable only one way true to false, not other way round.

let obj5 = {
    name: "Charles Xavier"
};

Object.defineProperty(obj5, "name", {configurable: false});

console.log(obj5.name); // Charles Xavier

obj5.name = "Magneto";
console.log(obj5.name); //Magneto

Object.defineProperty(obj5, "name", {writable: false});

console.log(Object.getOwnPropertyDescriptor(obj5, "name")); //{value: 'Magneto', writable: false, enumerable: true, configurable: false}`

delete obj5.name; //can't delete since configurable: false

console.log(obj5.name); //Magneto

//.................................

//Object.defineProperties

//Syntax: 
/**
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
 */

//allows to define many properties at once.

let obj6 = {
    name: "Bucky Barns",
    codeName : "Winter Soldier",
    age: 123
};

Object.defineProperties(obj6, {
    name : {value: "Steve Rogers", writable: false},
    codeName: {value: "Captian America", enumerable: false},
    Rank: {value: "Leader of the Avengers Initiative", configurable: true}
});

console.log(Object.getOwnPropertyDescriptor(obj6, "name"));
//{value: 'Steve Rogers', writable: false, enumerable: true, configurable: true}

console.log(Object.getOwnPropertyDescriptor(obj6, "codeName"));
//{value: 'Captian America', writable: true, enumerable: false, configurable: true}

console.log(Object.getOwnPropertyDescriptor(obj6, "age"));
//{value: 123, writable: true, enumerable: true, configurable: true}

console.log(Object.getOwnPropertyDescriptor(obj6, "Rank"));
//{value: 'Leader of the Avengers Initiative', writable: false, enumerable: false, configurable: true}

//......................................

//Object.getOwnPropertyDescriptors

console.log(Object.getOwnPropertyDescriptors(obj6)); //{name: {…}, codeName: {…}, age: {…}, Rank: {…}} // with value and all the flags

//Together with Object.defineProperties it can be used as a “flags-aware” way of cloning an object:

let obj7 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj6));

console.log(obj7); //{name: 'Steve Rogers', age: 123, codeName: 'Captian America', Rank: 'Leader of the Avengers Initiative'} //note: it's properties has the same flags as obj6's properties.

//usually we clone objects like this:
/**
for (let key in user) {
    clone[key] = user[key]
}
 */
// But this way we can't copy flags of properties, and also we can't copy enumerable: false flagged properties, and also symbols. 
// But through Object.defineProperties and using Object.getOwnPropertyDescriptors we copy all properties with flag values, it also copy's ennumerable: false and symbol properties.

//.........................................

//Sealing an object globally

let obj = {};

Object.preventExtensions(obj);
// Forbids the addition of new properties to the object.

Object.seal(obj);
// Forbids adding/removing of properties. Sets configurable: false for all existing properties.

Object.freeze(obj);
// Forbids adding/removing/changing of properties. Sets configurable: false, writable: false for all existing properties.

//And also there are tests for them:

console.log(Object.isExtensible(obj));
// Returns false if adding properties is forbidden, otherwise true.

console.log(Object.isSealed(obj));
//Returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.

console.log(Object.isFrozen(obj));
// Returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.

//These methods are rarely used in practice.

//my points: 

//so ennumerable flag is false in case of symbol by default? can we change that with Object.defineProperty? Will it come in for in loop?

//yes but won't come in 'for in' loop becuase to ensure compatibility with older javascript but we can use Object.assign to copy symbol too which it won't copy in normal case.