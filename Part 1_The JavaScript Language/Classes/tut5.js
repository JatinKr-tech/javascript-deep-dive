//Extending built-in classes

class PowerArray extends Array {
    isEmpty(){
        return this.length === 0;
    }
}

let arr1 = new PowerArray(1,6.23,2,90,10,22,200);
console.log(arr1); //[1, 6.23, 2, 90, 10, 22, 200]
console.log(arr1.isEmpty()); //false

let arr1Filtered = arr1.filter((item)=> item>=10);
console.log(arr1Filtered); //[90, 10, 22, 200]
console.log(arr1Filtered.isEmpty()); //false

//Please note a very interesting thing. Built-in methods like filter, map and others – return new objects of exactly the inherited type PowerArray. Their internal implementation uses the object’s constructor property for that.

console.log(arr1.__proto__ === PowerArray.prototype); //true

//don't confuse constructor function of class with constructor property of class.prototype / obj.__proto__.constructor.

class myArray extends Array {
    isEmpty(){
        return this.length === 0;
    }
    static get [Symbol.species](){
        return Array;
    }
};

let arr2 = new myArray(1,52,23,74,885,26,17);

console.log(arr2);
console.log(arr2.isEmpty()); //false
console.log(arr2.__proto__ === myArray.prototype); //true

let arr2Filtered = arr2.filter((item)=> item>50);

console.log(arr2Filtered); //[52, 74, 885]
// console.log(arr2Filtered.isEmpty()); //Error
console.log(arr2Filtered.__proto__ === Array.prototype); //true

//arr2Filtered is Array not myArray
//As you can see, now .filter returns Array. So the extended functionality is not passed any further.

//static get [Symbol.species] is a getter that tells JavaScript:

// "Hey engine! Whenever a built-in method needs to spin up a new instance under the hood, don't use PowerArray. Use standard Array instead."

//detailed explanation by me:

//So what actually is happening is that when we call array method which returns a new array, i mean which needs a constructor, what happens step by step: 
// prototypal search for the method happens, 
// now we need a constructor, for that javascript engine always checks for className.prototype.constructor[Symbol.species], if it's value points to something then it uses that something's constructor, it is a two step process (no chaining here). 
// In our case [Symbol.species] returns Array, now javascript uses Array's constructor to construct the empty array and assigns values to it using Array method it have already searched through prototypal search. 
// 
// Now what happens if there is no [Symbol.species] property? javascript invokes [[construct]] of arr.prototype.constructor which points to className, to create the object which means it will inherit all the methods for that className. 



//....................................

//No static inheritance in built-ins

//Normally, when one class extends another, both static and non-static methods are inherited.

//But built-in classes are an exception. They don’t inherit statics from each other.

//For example, both Array and Date inherit from Object, so their instances have methods from Object.prototype. But Array.[[Prototype]] does not reference Object, so there’s no, for instance, Array.keys() (or Date.keys()) static method.

//explanation simple and easy: 

//Array is like a stand alone class but with code similar to Array.prototype.__proto__ = Object.prototype; runs internally. This explains why Array can inherit non-static Object methods but can't inherit static methods.
