//Rest Parameters and Spread Syntax

function showName(firstName, lastName, ...titles) {
  console.log( firstName + ' ' + lastName ); // Julius Caesar

  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  console.log( titles[0] ); // Consul
  console.log( titles[1] ); // Imperator
  console.log( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");

//The “arguments” variable
//Arguments are objects which store all the arguments we give to the function(not arrow) automatically, and we can access it, can't use array methods on it as it is not an array, it is simple plain object. 

function showName2() {
  console.log( arguments.length );
  console.log( arguments[0] );
  console.log( arguments[1] );

  // it's iterable
  // for(let arg of arguments) console.log(arg);
}

// shows: 2, Avenger, Titan
showName2("Avenger", "Titan");

// shows: 1, Ilya, undefined (no second argument)
showName2("Ilya");
//

/*
showName3 = ()=> {
    console.log(arguments.length); //error, arguments are not defined inside an arrow function.
};
showName3(1,2,3,4,5,6,7,8)
*/

function showName4(){
    let arrowFunc = ()=>{
        console.log(arguments.length); //8 //'arguments' is difened thanks to outer function.
    }
    arrowFunc()
}

showName4(1,2,3,4,5,6,7,8);

//..........................

//Spread Syntax

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

let merge1 = [1, ...arr1, 43, 65, ...arr2, 453]
console.log(merge1); //[1, 1, -2, 3, 4, 43, 65, 8, 3, -8, 1, 453]

console.log( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

//

let str = "Hello";

console.log( ...str ); // "H","e","l","l","o"
console.log( [...str] ); // ['H', 'e', 'l', 'l', 'o']
//we can use spread syntax to convert iterables into an array like above but Array.from is preferred highly for this as it not just work with iterables, it works with Array like objects too.
console.log(Array.from(str)); //['H', 'e', 'l', 'l', 'o']

//..............................

//Copy an array/object

let arr = [1, 2, 3];

let arrCopy = [...arr]; // spread the array into a list of parameters
// then put the result into a new array, completely new array in memory

// do the arrays have the same contents?
console.log(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
console.log(arr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
console.log(arr); // 1, 2, 3, 4
console.log(arrCopy); // 1, 2, 3

//

let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // spread the object into a list of parameters
// then return the result in a new object, different memory

//imp
//1. Object Spread vs. Iterable Spread
// Object Spread ({ ...obj }): This is a specific feature introduced in ES2018. It copies own enumerable properties directly from one object to another. It does not look for or require an iterator.
// Iterable Spread ([ ...obj ] or func(...obj)): This requires the target to implement the Symbol.iterator protocol (like Arrays, Strings, Maps, and Sets). Standard objects lack this by default, which throws an error.


console.log(obj);
console.log(objCopy);

// do the objects have the same contents?
console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
console.log(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
console.log(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}


//Note: Ultra important

// Note: This memory separation only goes one level deep. If your object contains nested objects, only the top-level keys get new memory allocation. The nested objects will still share the same reference (shallow copy).