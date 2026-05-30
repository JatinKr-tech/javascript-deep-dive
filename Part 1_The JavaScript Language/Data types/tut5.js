//Array Methods

//Push
//Shift
//Unshift
//Pop

//splice(arg1, arg2, arg3,.....n) //O(n) //Mutator
//arg1 = index
//arg2 = how many elem you wanna delete
//arg3,....n = what you wanna add at arg1 index

let arr1 = ["My", "name", "is"];
console.log(arr1.splice(0, 1)); //["My"]
console.log(arr1); //["name", "is"]

let arr2 = ["To", "study", "JavaScript", "You", "need", "to", "be", "consistent"];
console.log(arr2.splice(1, 2, "learn", "coding")); //['study', 'JavaScript']
console.log(arr2); //["to", "learn", "coding", "You", "need", "to", "be", "consistent"]

let arr3 = ["To", "study", "JavaScript", "You", "need", "to", "be", "consistent"];
console.log(arr3.splice(2, 0, "and", "to", "be", "good", "at")); //[]
console.log(arr3); //["To", "study", "and", "to", "be", "good", "at",  "JavaScript", "You", "need", "to", "be", "consistent"]

//Neg indexes allowed

let arr4 = [1,2,3,4,7];
console.log(arr4.at(-1)) //7
console.log(arr4.splice(-1, 1)) //[7]
console.log(arr4) //[1,2,3,4]

let arr5 = [1,2,3,4,7];
console.log(arr5.splice(-1, 0, 5, 6)) //[]
console.log(arr5); //[1,2,3,4,5,6,7]

//arr.slice(start, end), not including end, neg allowed //similar to slice method of string //O(n)
//It does not temper with original string, it only returns a copy of that string with elem's of our choice.

let arr6 = ["The Avengers", "The age of Ultron", "The Infinity War", "The Endgame", "Doomsday", "Secret Wars"];
console.log(arr6)
console.log(arr6.slice(0, 4)); //["The Avengers", "The age of Ultron", "The Infinity War", "The Endgame"]
console.log(arr6) //["The Avengers", "The age of Ultron", "The Infinity War", "The Endgame", "Doomsday", "Secret Wars"];
console.log(arr6.slice(-2)); //["Doomsday", "Secret Wars"]
console.log(arr6) //["The Avengers", "The age of Ultron", "The Infinity War", "The Endgame", "Doomsday", "Secret Wars"];

//concat, adds every array, premitive it is given and returns an array containing all of them //It takes copy of every array add them together and returns a new array.

let arr7 = [1,2];
let arr8 = [6, 7]
console.log(arr7.concat([3,4], 5)); //[1, 2, 3, 4, 5]
console.log(arr7.concat([3,4], 4, 5, arr8)); //[1, 2, 3, 4, 4, 5, 6, 7]


let IronMan = ["Iron Man 1", "Iron Man 2", "Iron Man 3"]
let Captian_America = ["Captian America", "Captian America Winter Soldier", "Captian America The Civil War"]
let Thor = ["Thor", "Thor The Dark World", "Thor Ragnarock", "Thor Love and Thunder"]

console.log(IronMan.concat(Captian_America, Thor)); //works
console.log(IronMan.concat(Captian_America).concat(Thor)); //works too
console.log(IronMan.concat(Captian_America).concat(Thor) === IronMan.concat(Captian_America, Thor)); //false, since they both returns seperate array even though every elem inside them is same.

console.log(IronMan); //It's same as it was, didn't change


//[1,2,{...}] or [1,2,...] for objects

let arr9 = [1, 2];
let obj1 = {
  name: "William Will Turner",
  age : "21",
  length: 1,
  lmao(){
    return this;
  },
};
let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true, //without length property it's useless
  length: 0, //matters, 
  length: 2, //length has been modified
  length: 4, //length has been modified again
  name : "Lmao",
  2: "is",
  age: 19,
  3: "happening",
//   [Symbol.isConcatSpreadable]: true, //it's position does not matter, 
};

console.log(arr9.concat(obj1)); //[1, 2, {..Everything inside obj..}], 

// console.log(arr9.concat(arrayLike)); //[1, 2]
// console.log(arr9.concat(arrayLike)); //[1, 2, 'something', 'else']
console.log(arr9.concat(arrayLike)); //[1, 2, 'something', 'else', 'is', 'happening']

//..................

//Iterate: forEach //O(n)

let arr10 = ["Apple", "Banana", "Grapes", "Pineapple", true, 'false'];

arr10.forEach((item, index, array) => {
    console.log(`${item} is of ${index} from ${array}`);
});

[11,12,13].forEach(function (i){console.log(i)}); //11 //12 //13

//...................

//Searching in Array

//indexOf/lastIndexOf and includes O(n)

//arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.

console.log(arr10.indexOf('Banana')); //1
console.log(arr10.indexOf('Banana', 1)); //1
console.log(arr10.indexOf('Banana', 2)); //-1
console.log(arr10.indexOf('Papaya')); //-1

//indexOf uses strict '===' equality
console.log(arr10.indexOf(false)); //-1
console.log(arr10.indexOf(true)); //4
console.log(arr10.indexOf('false')); //5


//arr.includes(item, from) – looks for item starting from index from, returns true if found.

console.log(arr10.includes('Grapes')) //true
console.log(arr10.includes('Grapes', 2)) //true
console.log(arr10.includes('Grapes', 3)) //false

//includes, uses strict '===' equality but behaves differently with 1 specific edge cases, so it uses comparison algorithm called 'SameValueZero'.
console.log(arr10.includes(false, 3)) //false
console.log(arr10.includes('false', 3)) //true

//The method arr.lastIndexOf is the same as indexOf, but looks from right to left.

let fruits = ['Apple', 'Orange', 'Apple']

console.log( fruits.indexOf('Apple') ); // 0 (first Apple)
console.log( fruits.lastIndexOf('Apple') ); // 2 (last Apple)

console.log(arr10);

//The two specific edge cases:
//The 'includes' method handles NaN correctly

let arr11 = [NaN];
console.log( arr11.includes(NaN));// true (correct)

//indexOf and lastIndexOf thinks we are entering 
console.log( arr11.indexOf(NaN)); // -1 (wrong, should be 0)  NaN is never  
console.log( arr11.lastIndexOf(NaN)); // -1 (wrong, should be 0)   
// reason:
console.log(NaN == NaN, NaN === NaN) //false //false

//find and findIndex/findLastIndex


//find(fn) O(n)
/*
let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});
*/


let arr12 = [11, 12, 13, 14, 15, 16, 17];
let arr12result = arr12.find(function(item){
    return !(item%4) === true;
})
console.log(arr12result); //12, stopped after returning 12

//Note : If it returns true, the search is stopped, the item is returned. If nothing is found, undefined is returned.

let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"},
  {id: 5, name: "Mary"},
];

let usersResult = users.find(item => item.id == 3);

console.log(usersResult.id, usersResult.name); //3 'Mary'

//Note that in the above example find(arg1, arg2, arg3) is provided with just one argument  'item => item.id == 1' which is for items. That’s typical, other arguments of this function are rarely used.


//findIndex(fn) / findIndexLast(fn)  O(n)

/*
let result = arr.findIndex(function(item, index, array){
    //if true is returned, index is returned and iteration is stopped.
    // for falsy scenario returns undefined
}) 
*/    

let usersIndexResult = users.findIndex(item => item.name === 'Mary');
console.log(usersIndexResult, users[usersIndexResult]); //2, {id: 3, name: 'Mary'}

let usersLastIndexResult = users.findLastIndex(item => item.name === 'Mary');
console.log(usersLastIndexResult, users[usersLastIndexResult]); //4, {id: 5, name: 'Mary'}

//filter(fn) O(n)

/*
let resultingArray = arr1.filter(function(item, index, array){
    //if true is returned, item is pushed to resultingArray, iteration is not stopped until all items are checked
    //for falsy scenario, empty array is returned.
})
*/

let arr13 = arr12;

let arr13result = arr13.filter(item => !(item%4) );
console.log(arr13result); //[12, 16]

let usersFilterResult = users.filter(item => item.name === 'Mary');
console.log(usersFilterResult); //[{…}, {…}]

let usersFilterResult2 = users.filter(item => item.name === 'Mary' || item.name === 'Pete');
console.log(usersFilterResult2); //[{…}, {…}, {…}]

//............................

//Transform an Array

//map(fn) O(n)

/*
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});
*/

//It calls the function for each element of the array and returns the array of results.
let arr14 = ['Elephant', 'Mammale', 'Python']
let arr14elemLengths = arr14.map(function (item){return item.length})
console.log(arr14elemLengths); //[8, 7, 6]
let arr14elemLengths2 = arr14.map(item => item.length);
console.log(arr14elemLengths2); //[8, 7, 6]

//sort(fn) //O(1) or O(n) or what depends on the fn //mutator

let arr15 = [ 1, 2, 15 ];

console.log(arr15); //[1, 15, 2]
// the method reorders the content of arr
let arr15sort = arr15.sort();
console.log(arr15sort); //[1, 15, 2]

//The order became 1, 15, 2. Incorrect. But why?
//The items are sorted as strings by default.
// Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed "2" > "15".

console.log("\n");

let arr16 = [ 1, 2, 15 ];
arr16.sort((a,b) => a-b); //if a-b is neg then a is before b
console.log(arr16);

let arr17 = [ 1, 2, 15 ];
arr17.sort((a,b) => b-a); //if b-a is neg then a is before b
console.log(arr17);

//sort for strings

let arr18 = ['Apple', 'Cat', 'Österreich', 'Door', 'Otovon', 'Vietnam', "Oqop", 'Bat'];
arr18.sort((a,b) => a < b ? -1 : 1); 
console.log(arr18); //['Apple', 'Bat', 'Cat', 'Door', 'Oqop', 'Otovon', 'Vietnam', 'Österreich']

//better use localeCompare

let arr19 = ['Apple', 'Cat', 'Österreich', 'Door', 'Otovon', 'Vietnam', "Oqop", 'Bat'];
arr19.sort((a,b)=> a.localeCompare(b)); 
console.log(arr19); //['Apple', 'Bat', 'Cat', 'Door', 'Oqop', 'Österreich', 'Otovon', 'Vietnam']

//reverse() //O(n) //mutator

let arr20 = [1, 2, 3, 4, 5];
arr20.reverse();
console.log(arr20); //[5, 4, 3, 2, 1]

let arr21 = [2, 4, 3, 'kaisermann', 23, 'fairech', 1];
arr21.reverse(); 
console.log(arr21); //[1, 'fairech', 23, 'kaisermann', 3, 4, 2]

//split(delim, arg2) O(n) and join(delim) O(n+m) ; m is the total sum of string elements(characters), Why? js engine have to copy character by character. Not because of nested Arrays.

//str.split(delim, arg2) splits the string into an array by the given delimiter. arg2 is optional as it can limit array length.

let names = " Jatin, 1, Harsha, Aryan";

console.log(names.split(',')); //[' Jatin', ' 1', ' Harsha', ' Aryan']

console.log(names.split(',', 2)); //[' Jatin', ' 1']

//split into letters
console.log("MINI".split("")); //['M', 'I', 'N', 'I']

//join

console.log(["Magnus", "is", "the", "GOAT"].join("?")); //Magnus?is?the?GOAT
console.log(["Magnus", "is", "the", "GOAT"].join(" ")); //Magnus is the GOAT
console.log(["Magnus", ["RCB", "CSK", "MI"], "is", "the", "GOAT"].join(" ")); //Magnus is the GOAT
console.log(typeof([1,2,3,4,5,6].join(""))); //string

//
//reduce/reduceRight //O(n)
/*
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
*/

//Arguments:
//accumulator – is the result of the previous function call, equals initial the first time (if initial is provided).

let arr22 = [1, 2, 3, 4, 5, 6];
let arr22Sum = arr22.reduce((acc, item) => acc + item, 0);
console.log(arr22Sum); //21

console.log(arr22.reduce((acc, item) => acc + item)); //21, if initial is not provided it takes on value of first result which will be first element but be cautious because:

//if array is empty then it would give an error
// console.log([].reduce((acc, item) => acc + item)); //error
console.log([].reduce((acc, item) => acc + item, 0)); //0
//So it’s advised to always specify the initial value.
// The method arr.reduceRight does the same but goes from right to left.

//..............................

// Array.isArray //O(1)
console.log(typeof {}); //Object
console.log(typeof []); //Object

console.log(Array.isArray({})); //false
console.log(Array.isArray([])); //true

//................................

// for sake of completion..

//Most methods support “thisArg” except sort().

// How it looks like 
/**
 arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
 */

// thisArg is the optional last argument
//The value/object of thisArg parameter is what 'this' from function 'func' is pointing to. for ex:

let obj2 = {
    maxAge : 27,
    minAge : 18,
    agecheck(user) {
        return user.age >= this.minAge && user.age <= this.maxAge;
    }
}

let recruits = [
    {age : 16},
    {age : 18},
    {age : 11},
    {age : 20},
    {age : 32},
]

console.log(recruits.filter(item => obj2.agecheck(item))); //used more since it's easier to understand.

console.log(recruits.filter(obj2.agecheck, obj2)); //obj2.check puts the function there but that function is alone so we won't able to use 'this' which was originally reffering to it's parent object, so what we did to solve this problem? We put a second argument to which 'this' of function is pointing to.

//................................

//Some more methods:

//arr.some(fn) works like '||' operator for elements inside array. returns true if even one element satisfies fn and so fn returns a truthy value //O(n)

//arr.every(fn) works like '&&' operator for elements inside array. returns false if even one element fails to satisfy fn. //O(n)

//arr.fill(value, start, end) – fills the array with repeating value from index start to end. //Mutator //O(n)

//arr.copyWithin(target, start, end) – copies its elements from position start till position end into itself, at position target (overwrites existing). //Mutator //O(n)

//arr.flat(depth)/arr.flatMap(fn) create a new flat array from a multidimensional array. //O(N); N = total number of elements present in the resulting flattened array


//arr.flat(depth)
let nested = [1, 2, [3, 4, [5, 6]]];

// Flattens one level deep (default)
console.log(nested.flat());
// Output: [1, 2, 3, 4, [5, 6]]

// Flattens two levels deep
console.log(nested.flat(2)); 
// Output: [1, 2, 3, 4, 5, 6]

// Flattens infinity levels deep
console.log(nested.flat(Infinity)); 
// Output: [1, 2, 3, 4, 5, 6]

//arr/flatMap(fn)
let sentences = ["Hello world", "JavaScript is fun"];

console.log((sentences.map(str => str.split(" ")))); //{{..}, {...}}

// Splits sentences into words and flattens the result
console.log(sentences.flatMap(str => str.split(" ")));
// Output: ["Hello", "world", "JavaScript", "is", "fun"]

// Equivalent to: 
console.log((sentences.map(str => str.split(" ")).flat()));

//There are many more methods other than this probablly