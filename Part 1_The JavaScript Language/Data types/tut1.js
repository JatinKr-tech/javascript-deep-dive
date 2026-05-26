//Methods of primitives

//Objects store many properties, it stores functions too as methods and we can use them however and whenever we want.
//But we might need methods(functions) for primitives(except null and undefined) too like converting all cases of a string to upper case, or to round of number.
//We don't wanna create Objects everytime as they are bulky and use a lot of system resources, but primitives are fast.

//There are Methods for every data type except null and undefined.

//
let str = "Prabhas";

console.log(str.toUpperCase()); //PRABHAS
//So lets see what happens...
//JavaScript 'temporarely' wraps variable string into an object, then runs the method, destroyes the object and returns the string in here with all the cases being upper case.

let num = 2.944534;

console.log(num.toFixed(2)); //2.94

//...................
//We can create permanent object wrappers around primitives this by using new for primitives.
//It is highly discouraged to do this, cuz it creates many problems.

let zero = new Number(0);
console.log(typeof zero); //Object
if (zero) {
    console.log("it is an object and even though it has zero inside it it is a truthy value because all objects are truthy empty or non-empty");
}

let ourStr = new String("Jonnah");
console.log(typeof ourStr); //Object


let str2 = "Hello";

str.test = 5;

alert(str.test); //error (in strict mode) or undefined (in non strict mode), cuz it is a string not an object and here we are trying to add and then read a property of a primitive which is just not possible. 

//What happens: When we try to access property of a primitive, we know javascript creates a temporary object wrapper, in this case it creates an object wrapper around str2 then we add a property named test inside, but then that object wrapper disappears and now we can't access that test property or we can say it simply does not exist cuz the object (which was temporary) does not exist.