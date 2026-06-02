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

// weakMap.set(key, value)
// weakMap.get(key)
// weakMap.delete(key)
// weakMap.has(key)




//weakMap and weakSet 
//We can set/add only those keys in weakMap and weakSet which are object{} other wise we get an error. 

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

