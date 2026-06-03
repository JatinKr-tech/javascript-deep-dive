//weakMap and weakSet and lesson on how garbage collection works for non primitive values.

//refer to doc for better understanding : 
//link: https://javascript.info/weakmap-weakset

let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

for(key of map.keys()){
    console.log(key); //{name: 'John'}
}

// john is stored inside the map,
// we can get it by using map.keys()

let Mikasa = { name: "Mikasa" };

let weakMap = new WeakMap();
weakMap.set(Mikasa, "...");

Mikasa = null; // overwrite the reference

// Mikasa is removed from memory!


//WeakMap does not support iteration and methods keys(), values(), entries(), so there’s no way to get all keys or values from it.

// WeakMap has only the following methods:

// WeakMap.set(key, value)
// WeakMap.get(key)
// WeakMap.delete(key)
// WeakMap.has(key)




//WeakMap and WeakSet 
//We can set/add only those keys in weakMap and weakSet which are object{} other wise we get an error. 

//.............................

//Use case : Caching
//WeakMap is a lot useful in cache

let obj1 = [
  {"Q1":"capital of India"},
  {"Q2":"capital of USA"},
  {"Q3":"capital of Germany"},
  {"Q4":"capital of UK"},
  {"Q5":"capital of Japan"},
];

let cache = new WeakMap();
cache.set(obj1[0], "Delhi");
cache.set(obj1[1], "WashingtonDC");

function cacheProcess (question){
  if (!(cache.has(question))){
    cache.set(question, "Just added");
  }
    return cache.get(question)
  
};

console.log(cacheProcess(obj1[0])); //Delhi
console.log(cacheProcess(obj1[1])); //WashingtonDC
console.log(cacheProcess(obj1[2])); //New Question!
console.log(cacheProcess(obj1[2])); //Just added

console.log(cache)
// obj1 = null; //cache will have no entries

// If we use Map instead of WeakMap, The Data Becomes "Ghosts" (Unreachable)
// This is the worst part of using a regular Map for this pattern: the data becomes completely useless but still consumes RAM.
//Caution//
//don't think about using cache[0], it is not an array with indexes, it is an object with no key named 0.


//.................................


//tasks

//task1

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// for (let item of messages){
//     readMessages.add(item);
// }
console.log(readMessages.add(messages[0]));
console.log(readMessages.add(messages[1]));
console.log(readMessages.add(messages[2]));

console.log(readMessages.has(messages[0]));
console.log(readMessages.has(messages[1]));

console.log(readMessages)

let symbolmethod = Symbol("Seen");
messages[1][symbolmethod] = true;

console.log(readMessages);

messages.shift(); //removed {text: "Hello", from: "John"} object from messages, which automatically got removed from readMessages too.
// messages.shift();
// console.log(readMessages.add(messages[0]));

//task2

let messages2 = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages2 = new WeakMap();
let Dates = "2nd of June";

// for (items of messages2){
//     readMessages2.set(items, Dates)
// };

readMessages2.set(messages2[0], "31st of May");
readMessages2.set(messages2[1], "1st of June");
readMessages2.set(messages2[2], new Date(1/1/2007));



console.log(readMessages2); //only two keys
messages2.shift();
console.log(readMessages2); //only two keys

