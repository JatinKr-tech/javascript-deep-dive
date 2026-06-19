//task2

function func(name){
    this.name = name;
};
func.prototype = {};

let obj1 = new func("Lemon");
console.log(obj1);
console.log(obj1.constructor);


let obj2 = new obj1.constructor("str"); //chain searches constructor in obj1 doesn't find then searches it in obj referenced by [[Prototype]] again doesn't find it there then searches in object referenced by [[Prototype]] of obj, there it finds constructor property which is referencing Object() { [native code] } function, (this function is used by javascript as constructor to create objects). 
console.log(obj2); //{0: "s", 1: "t", 2: "r"}

for(let key in obj2) console.log(key);

console.log(obj2.constructor); //ƒ String() { [native code] }

//When you pass other data types into new Object(), JavaScript applies that same "wrapper factory" logic.

//So let me get this straight, when we call constructor function Object("str") the function Object sees that the argument is string and return String("str"), and instead of new Object("str") we can call new String("str")? And that explains why [[Prototype]] points to String() native function?

//yea

let original = { name: "Alice" }; //same object, original
// let original = null; //{}
// let original = undefined; //{}
// let original = true; //{true}
let obj3 = new Object(original);

console.log(obj3)

console.log(original === obj3); // true (It's the exact same reference!)

console.log(obj3.constructor); //Object() { [native code] }

//When typeof arg = object, Object(arg) returns arg. 