//Array


//.........................
//Declaration

// let arr = new Array();
let arr = []; //We use this one more often

let fruits = ["Apple", "Orange", "Plum"];

console.log( fruits[0] ); // Apple
console.log( fruits[1] ); // Orange
console.log( fruits[2] ); // Plum

//we can replace
fruits[2] = 'Pear';

//we can add
fruits[3] = 'Banana';

console.log(fruits);

//Array length property
console.log(fruits.length); //4

//An array can store elements of any type.
let arrCanStoreAnything = [
    'lmao',
     0, 
     true, 
     null, 
     undefined, 
     {name : 'Jatin', age : 19}, 
     [true, 0, 'Hardy']
    ];
console.log(arrCanStoreAnything);

//at (recent addition, older browser may need polyfills) supports neg numbers
console.log(arrCanStoreAnything[arrCanStoreAnything.length-1]); //we can do this with at 
console.log(arrCanStoreAnything.at(-1)); 

//.......................

//Arrays can work as both Queue and Stack meaning(deque)

//Queue: First In First Out (FIFO) 
//
//Push : appends(add) an element to the end.
// Shift : get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st.

//Stack: Last In First Out (LIFO)
//
//Push : appends(add) an element to the end.
//Pop : takes an element from the end.

//Performance : Methods push/pop run fast, while shift/unshift are slow.

let animals = ['Lion', 'Tiger', 'Cheetah'];    
console.log(animals)

console.log(animals.push('Elephant')); //returns length of the array
console.log(animals.shift());
console.log(animals.pop());
console.log(animals.unshift('Crocodile')); //appends(add an element to the start) and returns length of the array.
console.log(animals.unshift()); //only returns length of the array and don't add anything.

console.log(animals);

//..........................

//Internals

//An Array is an Ordered Object with special methods available. It's keys are numbers (in order);

let animals1 = animals;

animals1.push('Seal'); //Seal get added in array animals too, it means both are pointing to the same array meaning array is an object

console.log(animals1 === animals); //true

animals[22] = 'Crab'; //works
animals.age = 25; //works

//What happens when we treat array as regular object and destroy it's order?
//Ans: the engine will see that we’re working with the array as with a regular object. Array-specific optimizations are not suited for such cases and will be turned off, their benefits disappear.

//.................................

//Loops

//for in, 

let chocolates = ['Burborn', 'Dark Fantsy', 'Dairy Milk', 'KitKat'];

for (key in chocolates) {
    console.log(key, chocolates[key])
}

//for of, could be used only with iterable object such as an array or array like objects(numeric indices and some non-numeric keys which will be ignored) or we could use it on string too since it is iterable.

for (value of chocolates) {
    console.log(value); 
};

//Generally we shouldn't use for in loop with arrays as it is 10-100 times slower than for of loop and that for of loop ignores non-numeric keys in array like objects which is useful.

//..............................

//Length property, can't be used with standard javascript objects

//The length property automatically updates when we modify the array. To be precise, it is actually not the count of values in the array, but the greatest numeric index + 1.

let arr1 = [];
arr1[14] = "Ace";
console.log(arr1.length); //15

//length can do irreversible damage to your array, it can truncate it:

let arr2 = [101, 102, 103, 104, 105];

arr2.length = 2;
console.log(arr2); //101, 102


arr2.length = 5;
console.log(arr2) //101, 102, emptyx3

// So, the simplest way to clear the array is: arr.length = 0;. 

//............................

//new Array()

let arr3 = new Array("Apple", "Pear", "etc");
console.log(arr3);


//How one can shoot themselves in the foot
let arr4 = new Array(4);
console.log(arr4); //emptyx4
console.log(arr4.length); //4

//Because of above example of shooting in the foot and that [] way is shorter and easier, no one uses new Array();

//.......................

//Multidimensional arrays

//storing arrays inside an array

let matrix = [
  [11, 12, 13],
  [24, 25, 26],
  [37, 38, 39]
];

console.log(matrix);
console.log(matrix[0][2]); //13

//toString, arrays have there own string conversion way.

let arr5 = [11, 12, 13];
console.log(String(arr5));
console.log(String(arr5) === '11,12,13'); //true

console.log([] + 1); //1
console.log([11] + 1); //112
console.log([11, 12, 13] + 1); //11,12,131
console.log(([11, 12, 13] + 1) === '11,12,131'); //11,12,131 //true

//Note: Arrays do not have Symbol.toPrimitive, neither a viable valueOf, they implement only toString conversion

//Don't compare Arrays with '==', 
//
//'==' does type coercion to primitive (and primitives to numbers as last step) before comparing if and only if both operands are of different type, 
//'==' returns true if both operands point to same object/array, otherwise false.

console.log([] == []); //no type coercion sinse both operands are of same type. 

let arr6 = ['cat'];
let arr7 = arr6;

console.log(arr6 == arr7); //true

//'==' is strange:

console.log([] == 0); //true, type coercion  to '' == 0 (still not of same type), 0 == 0
console.log([] == '0') //false, type coercion to '' == '0'

//So, how to compare arrays?
//That’s simple: don’t use the == operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.




//To compare arrays, don’t use the == operator (as well as >, < and others), as they have no special treatment for arrays. They handle them as any objects, and it’s not what we usually want.

// Instead you can use for..of loop to compare arrays item-by-item.

// We will continue with arrays and study more methods to add, remove, extract elements and sort arrays in the next chapter Array methods.