//Map and Set

//Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type. Meaning it does not automatically convert key to string.

//if we add another set with same key but different value then Map.set() will update with new value to that key.

//common mistake: Array, objects containing exact same everything inside are treated as different keys

let ourMap = new Map();
let john = {name: "John", age: 21};

/*
ourMap.set('1', "str");
ourMap.set(1, 1);
ourMap.set(true, "Bool");
ourMap['two'] = "2";
ourMap.set(john, {"Ph-no": 3243_43_3234});
*/

//Chaining
ourMap.set('1', "str")
    .set(1, 1)
    .set(true, "Bool")
    .set(true, 1)
    .set(john, {"Ph-no": 3243_43_3234})
    ['two'] = "2";



console.log(ourMap['1']); //undefined
console.log(ourMap[1]); //undefined
console.log(ourMap[true]); //undefined
console.log(ourMap['two']); //"2"
console.log(ourMap[john]); //undefined

console.log(ourMap.get("1")); //str
console.log(ourMap.get(1)); //1
console.log(ourMap.get(true)); //1
console.log(ourMap.get('two')); //undefined
console.log(ourMap.get(john)); //{Ph-no: 3243433234}

console.log(ourMap.size); //4

console.log(ourMap); //{'1' => 'str', 1 => 1, true => 'Bool', {…} => {…}}

//We should not use ourMap[], 
//Map can take object as key too. //Objects can't
//Map uses SameValueZero Algorithm which is almost like "===" but also considers two NaN equal(edge case). So we can have NaN as key too.

console.log("\n");

//iteration over Map


for (key of ourMap.keys()){
    console.log(key); //"1" //1 //true //{name: 'John', age: 21}
};

console.log("\n")

for(value of ourMap.values()){
    console.log(value) //"str" //1 //"Bool" //{Ph-no: 3243433234}
};

console.log("\n")

for(entries of ourMap){
    console.log(entries) //['1', 'str'] //[1, 1] //[true, 'Bool'] //[{…}, {…}]
};
/*
for(entries of ourMap.entries()){
    console.log(entries)
}
*/

//The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object.

//..........................

//Object.entries: Map from Object

let recipeMap = new Map([
  ['cucumber', 500],
  [1, true],
  [false, 0]
]);
console.log(recipeMap); //{'cucumber' => 500, 1 => true, false => 0}


let ourObj = {
    name: "John",
    age: 21,
    'Building level 10 access?': false,
};

let ourMap2 = new Map(Object.entries(ourObj));
console.log(ourMap2); //{'name' => 'John', 'age' => 21, 'Building level 10 access?' => false}

//.........................

//Object.fromEntries: Object from Map
// expects every single iteration to return an element that contains exactly two parts: a key and a value (like [key, value]).

let obj1 = Object.fromEntries([
    ["Orange", true],
    ["Banana", 19],
    [true, true],
    ["Mango", "50"],
])
console.log(obj1) //{Orange: true, Banana: 19, true: true, Mango: '50'}


let obj3 = Object.fromEntries(ourMap2.entries());
console.log(obj3); //{name: 'John', age: 21, Building level 10 access?: false}

//A call to map.entries() returns an iterable of key/value pairs, exactly in the right format for Object.fromEntries.

//but we can do it without .entries()

let obj2 = Object.fromEntries(ourMap2);
console.log(obj2); //{name: 'John', age: 21, Building level 10 access?: false}

//.............................

//set

let Amy = {name: "Amy"};
let Kalas = {name: "Kalas"};
let Rayan = {name: "Rayan"};
let Koby = {name: "Koby"};
let Harry = {};

let ourSet = new Set();

ourSet.add(Amy);
ourSet.add(Kalas);
ourSet.add(Rayan);
ourSet.add(Koby);
ourSet.add(Koby); //not added since we already added it.

console.log(ourSet);
console.log(ourSet.size); //4

console.log(ourSet.delete(Rayan)); //true
console.log(ourSet.delete(Harry)); //false
console.log(ourSet.size); //3

console.log(ourSet.has(Kalas)); //true
console.log(ourSet.has(Rayan)); //false
console.log(ourSet.has(Harry)); //false

for(user of ourSet) {
    console.log(user); 
};

console.log(ourSet.clear()); //undefined
console.log(ourSet.size); //0


// A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

// Its main methods are:

// new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
// set.add(value) – adds a value, returns the set itself.
// set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
// set.has(value) – returns true if the value exists in the set, otherwise false.
// set.clear() – removes everything from the set.
// set.size – is the elements count.

//The alternative to Set could be an array of users, and the code to check for duplicates on every insertion using arr.find. But the performance would be much worse, because this method walks through the whole array checking every element. Set is much better optimized internally for uniqueness checks.


let ourSet2 = new Set(["banana", "Mango", 3, true, null]);
let ourSet3 = new Set([
    ["name", "Ymir"],
    ["age", 19],
    ["titan", true],
]);
// let ourSet3 = new Set([Amy, Kalas, Rayan]);



for(item of ourSet2) {
    console.log(item); //whole item
};
//same
for(item of ourSet2.entries()) {
    console.log(item); //whole item
};
console.log("\n")
for(key of ourSet3.keys()) {
    console.log(key); //whole item, set is just collection of unique values.
};
for(value of ourSet3.values()) {
    console.log(value); //whole item
};

console.log("\n");
ourSet2.forEach((value, valueAgain, set) => console.log(value));




