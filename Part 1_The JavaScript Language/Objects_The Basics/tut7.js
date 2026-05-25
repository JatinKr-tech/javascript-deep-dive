// Symbol("discription")

//Why we use Symbol() instead of normal string:
let lib = {
name: "ABC",
};

lib["id"] = 5;
lib["id"] = 6; // The value is changed because it is String [KEY]!!

lib[Symbol("id")] = 123;
lib[Symbol("id")] = 124; //Not changed

console.log(lib); // { name: "ABC", id: 6, Symbol(id): 123, Symbol(id): 124 }



let user1 = {
    name : "Borris"
}
let impId = Symbol("id");
console.log(impId.description); //id

user1[impId] = 101;
console.log(user1);
console.log(user1[impId]);

let hisId = Symbol("id");
let user2 = {
    name : "Ford",
    [hisId] : 7011, //like, Symbol("id") : 7011,
}
 console.log(user2);

for (key in user2) {
    console.log( key, user2[key]); //name Ford, ignores Symbol("").
};

console.log(user2[hisId]); //7011

let cloneOfUser2 = Object.assign({}, user2); //Object.assign() even copies Symbol()
cloneOfUser2.name = "Ferrari";
console.log(cloneOfUser2); //same id, it has been purposfully designed like that.

console.log(hisId === impId) //false
//...................

//Global Symbol

//Symbols inside the registry are called global symbols. If we want an application-wide symbol, accessible everywhere in the code – that’s what they are for.

// we can read or create a global symbol this way...Symbol.for(); as the name says Symbol for "description"(key).

// read from the global registry
let TheId1 = Symbol.for("Id");  // if the symbol did not exist, it is created
// read it again (maybe from another part of the code)
let TheId2 = Symbol.for("Id");

// the same symbol
console.log(TheId1 === TheId2); //true

// we can read the key of already registered 'global' (it won't work for localsymbol) symbol this way... Symbol.keyFor(); as the name says Symbol for key ("description").

let ourSymbol1 = Symbol.for("name");
let ourSymbol2 = Symbol.for("age");
let localSymbol1 = Symbol("work");

console.log(Symbol.keyFor(ourSymbol1)); //name
console.log(Symbol.keyFor(ourSymbol2)); //age
console.log(Symbol.keyFor(localSymbol1)); //undefined since localSymbol1 is not a global symbol.
//we can use this way to get key for local symbol
console.log(localSymbol1.description); //work

//.................

//System Symbols
//There are many system symbols used by JavaScript which are accessible as Symbol.*. We can use them to alter some built-in behaviors. For instance, later in the tutorial we’ll use Symbol.iterator for iterables, Symbol.toPrimitive to setup object-to-primitive conversion and so on.


//Technically, symbols are not 100% hidden. There is a built-in method Object.getOwnPropertySymbols(obj) that allows us to get all symbols. Also there is a method named Reflect.ownKeys(obj) that returns all keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don’t use these methods.








