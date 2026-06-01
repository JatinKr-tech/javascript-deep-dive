//Symbol.iterator

/**
 let range = {
  from: 1,
  to: 5
};

// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5
 */

//To make the range object iterable (and thus let for..of work) we need to add a method to the object named Symbol.iterator (a special built-in symbol just for that).

// When for..of starts, it calls that method once (or errors if not found). The method must return an iterator – an object with the method next.
// Onward, for..of works only with that returned object.
// When for..of wants the next value, it calls next() on that object.
// The result of next() must have the form {done: Boolean, value: any}, where done=true means that the loop is finished, otherwise value is the next value.

let range = {
    from: 1,
    to: 5
}

range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last){
                return {done: false, value: this.current++}
            } else{
                return {done: true}
            };
        },
    };
};

for (let item of range){
    console.log(item); //1, then 2, 3, 4, 5
};

//We can do it this way too

let range2 = {
    from: 11,
    to: Infinity,
    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },
    next(){
        if(this.current <= this.to){
            return {done: false, value: this.current++}
        } else{
            return {done: true};
        };
    },
};

//We can break this loop at whatever value we want to.
for(let item of range2){
    console.log(item);
    if (item === 50) {break};
}

//...........................

//Strings are Iterable

for(let char of 'Santa'){
    console.log(char);
}
for(let char of 'Santa😂'){
    console.log(char);
}

//...........................

//Calling an iterator explicitly

// rarely needed, but gives us more control over the process than for..of. For instance, we can split the iteration process: iterate a bit, then stop, do something else, and then resume later.

let str = "Hello World";
let iterator = str[Symbol.iterator]();

while (true) {
    let Ne = iterator.next();
    if (Ne.done) break;
    console.log(Ne.value); //H, then e,l,l,o, ,W,o,r,l,d

}

//...............................

//Iterables and Array likes

//A String is both iterable and Array like, as it is indexed and have length property
//But an object below is also Array like but not iterable.

let ArrayLike = {
    0: 'lmao',
    1: 'the',
    2: 'world',
    length: 3,
    Odd: 'Three',
}

//Type Error
// for(let item of ArrayLike) {
//     console.log(item);
// }


//Note: Both iterables and array-likes are usually not arrays, they don’t have push, pop etc. That’s rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with range using array methods. How to achieve that?

//..............................

//Array.from(arg1, arg2, Arg3)

//arg1 is our iterable object or arraylike obj or string
//arg2 is mapfn which runs for each element that is getting added to the array
//Arg3 is what 'this' will point to

//possible on Array like and iterables.

let arr1 = Array.from(ArrayLike);

console.log(arr1); //['lmao', 'the', 'world', 'is']
arr1.push('is');
console.log(ArrayLike); //no changes here

let str1 = 'Pur';
let arr2 = Array.from(str1);

arr2.push('Rrrr');
console.log(arr2); //['P', 'u', 'r', 'Rrrr']
console.log(str1); //no changes here

let arr3 = Array.from(range);
arr3.push(6);
console.log(arr3); //[1, 2, 3, 4, 5, 6]

let arr4 = Array.from(range, (item) => item*2, range);
console.log(arr4); //[2, 4, 6, 8, 10]

//
let str2 = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str2);

console.log(chars[0]); // 𝒳
console.log(chars[1]); // 😂
console.log(chars.length); // 2

//We can do it this way too:
/**
 let chars = []; 
for (let char of str) {
  chars.push(char);
}

console.log(chars);
 */

//shorter one allows us to code in really short

let str3 = '𝒳😂$#%@';

function Slicing(str, start, end) {
    return Array.from(str).slice(start, end).join("");
}
console.log(Slicing(str3, 1, 5)); //😂$#%

//Note:
//The Symbol.iterator method is called automatically by for..of, but we also can do it directly.
// Built-in iterables like strings or arrays, also implement Symbol.iterator.
// String iterator knows about surrogate pairs. What is surrogate pair?