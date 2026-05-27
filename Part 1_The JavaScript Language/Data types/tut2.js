console.log(1_000_000_000); //js ignores '_' between numbers
console.log(1e9) //1000000000
console.log(1e9 === 1_000_000_000) //true

console.log(1.23e6 === 1230000) //true
console.log(1.23e6 === 1_230_000) //true

console.log(0.005)
console.log(5e-3) //0.005
console.log(5e-3 === 0.005) //true
console.log(5e-3 === 0.0_05) //true
console.log(5e-3 === 5/1000) //true
console.log(1234e-2 === 1234/100) //true

//Hex, Binary and Octal numbers

console.log(0xFF, 0xff, 0xFf, 0xfF); //255
console.log(0b11111111); //255
console.log(0o377); //255

console.log(0xFF && 0b11111111 && 0o377) //255, all are truthy

// There are only 3 numeral systems with such support. For other numeral systems, we should use the function parseInt

let num = 255;
console.log(num.toString(16)) //ff
console.log(num.toString(2)) //11111111
console.log(num.toString(10)) //255
console.log(num.toString(36)) //useful when to convert a large number to something shorter like this:

console.log(146384945983655454..toString(36)) //141d4rt7d6ow
//even while using .toString we have to be careful to not exceed 2^{53} - 1 if we have to then use BigInt 'n' like below:
//Why double dots? So javascript knows decimal part is empty.
console.log(233546565432432563324324n.toString(36)) //12149bbz3bv45wv8

//we can put anynumber between 2 and 36:
console.log(num.toString(7)) //513
console.log(num.toString(24)) //af

console.log("\n");
//.......................

//Math.floor,   Math.ceil,      Math.round,                 Math.trunc
//gives us floor, gives us ceiling, rounds to closest integer, removes anything beyond decimal

console.log(Math.floor(3.1), Math.floor(3.5), Math.floor(3.6), Math.floor(-1.1), Math.floor(-1.5), Math.floor(-1.6));
//3 //3 //3    //-2 //-2 //-2

console.log(Math.ceil(3.1), Math.ceil(3.5), Math.ceil(3.6), Math.ceil(-1.1), Math.ceil(-1.5), Math.ceil(-1.6));
//4 //4 //4     //-1 //-1 //-1

console.log(Math.round(3.1), Math.round(3.5), Math.round(3.6), Math.round(-1.1), Math.round(-1.5), Math.round(-1.6));
//3     //4 //4     //-1 //-1   //-2

console.log(Math.trunc(3.1), Math.trunc(3.5), Math.trunc(3.6), Math.trunc(-1.1), Math.trunc(-1.5), Math.trunc(-1.6));
//3 //3 //3     //-1 //-1 //-1

//

//We need a number upto nth decimal places then we can do it the following ways..

let numOne = 1.2345;
console.log(Math.round(numOne * 100)/100);
console.log(numOne.toFixed(2)); //Note : We will get a string, "1.23", we can use unary plus operator to convert it to number '+'
console.log(numOne.toFixed(10)); //1.2345000000

//..........................

//Imprecise Calculations because of internal computation

//64 bits : 52bits for numbers, 11 bits for storing position of decimal place and 1 bit for storing sign. 

//Large numbers:
console.log(1e500); //infinity

//Counting decimals is highly unreliable:
console.log(0.1 + 0.2 == 0.3); //false, 
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1.toFixed(20)) //0.10000000000000000555

//best practice is to use .toFixed(), we can do multiply and divide by 10 or 100 or ... but it is also unreliable

console.log( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
console.log( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001

let sum = 0.28 + 0.14;
console.log( +sum.toFixed(2) ); // 0.42

//
//Because of internal computation there exists two zeros
//0 and -0

console.log(0 == -0, 0 === -0); //true, true, cuz operators are tuned to consider 0 and -0 as equals.
console.log(0 == -null); //Why True? What's the internal working happening? '-' operators is unary minus which forces null to become a number and it becomes -0 that's why!!

console.log("\n")

//.............................
//Tests: isNaN and isFinite

//isNaN() does implicit type coercion meaning it tries to convert our value to a number and in the process if it gets NaN then it returns true otherwise false. 

console.log(isNaN(0)); //false
console.log(isNaN("345")); //false
console.log(isNaN(true)); //false cuz it became 1 
console.log(isNaN(null)); //false cuz it became 0
console.log(isNaN("Jatin")); //true cuz it became NaN
console.log(isNaN({})); //true cuz it became NaN
console.log(isNaN(undefined))//true cuz it became NaN
console.log(isNaN(NaN)); //true cuz it is NaN
console.log(isNaN("str"/2)); //true cuz it became NaN

console.log("\n");

//Number.isNaN() doesn't try to convert our value (does not do implicit type coercion) to number. It is not for checking whether our value is a Number but it is for checking whether our value is NaN or not, if it is a NaN or value is resulting in NaN (example value: "str"/2) only then it returns true otherwise false. 

console.log(Number.isNaN(0)); //false
console.log(Number.isNaN("345")); //false
console.log(Number.isNaN(true)); //false
console.log(Number.isNaN(null)); //false
console.log(Number.isNaN("Jatin")); //false 
console.log(Number.isNaN({})); //false 
console.log(Number.isNaN(undefined)); //false 
console.log(Number.isNaN(NaN)); //true cuz it is a NaN
console.log(Number.isNaN("str"/2)); //true cuz it results in a NaN

console.log("\n");

//Why we need isNaN and Number.isNaN methods? because we can't do NaN == under if else.
console.log(NaN == NaN, NaN === NaN); //false //false

console.log("\n");
//

let numInfi = Infinity; 
//isFinite, does implicit type coersion 
console.log(isFinite(15)); //true
console.log(isFinite("782")); //true
console.log(isFinite(true)); //true
console.log(isFinite(null)); //true
console.log(isFinite("Jatin")); //false
console.log(isFinite(numInfi)); //false
console.log(isFinite({})); //false
console.log(isFinite(undefined)); //false
console.log(isFinite(NaN)); //false
console.log(isFinite("str"/2)); //false

console.log("\n");

//Number.isFinite(), does not do implicit type coersion
console.log(Number.isFinite(15)); //true
console.log(Number.isFinite("782")); //false
console.log(Number.isFinite(true)); //false
console.log(Number.isFinite(null)); //false
console.log(Number.isFinite("Jatin")); //false
console.log(Number.isFinite(numInfi)); //false
console.log(Number.isFinite({})); //false
console.log(Number.isFinite(undefined)); //false
console.log(Number.isFinite(NaN)); //false
console.log(Number.isFinite("str"/2)); //false

console.log("\n");

//.......................................

//Object.is(), works like '===' comparison but is more reliable (works differently) espicially for these two edge cases :

console.log(Object.is(NaN, NaN)); //true
console.log(Object.is(0, -0)); //false

console.log("\n");

//...........................

//parsInt and parseFloat

console.log(parseInt(145)); //145
console.log(parseInt("145")); //145
console.log(parseInt("145$")); //145
console.log(parseInt("$145")); //NaN
console.log(parseInt("1.45")); //1
console.log(parseInt("1.45$")); //1
console.log(parseInt("$1.45")); //NaN
console.log(parseInt("432str")); //432
console.log(parseInt("s432str")); //NaN
console.log(parseInt("str")); //NaN
console.log(parseInt(true)); //NaN
console.log(parseInt(null)); //NaN
console.log(parseInt(undefined)); //NaN
console.log(parseInt(Infinity)); //NaN

//parseInt can convert to integer from other Numerical systems too like from hex, Binary, octal numbers to integers 
console.log(parseInt('0xFF', 16)); //255, 
console.log(parseInt('FF', 16)); //255 
console.log(parseInt('2n90', 36)); //123444

console.log("\n");
//
console.log(parseFloat(145)); //145
console.log(parseFloat("145")); //145
console.log(parseFloat("145$")); //145
console.log(parseFloat("$145")); //NaN
console.log(parseFloat("1.45")); //1.45
console.log(parseFloat("1.45$")); //1.45
console.log(parseFloat("$1.45")); //NaN
console.log(parseFloat("432str")); //432
console.log(parseFloat("s432str")); //NaN
console.log(parseFloat("str")); //NaN
console.log(parseFloat(true)); //NaN
console.log(parseFloat(null)); //NaN
console.log(parseFloat(undefined)); //NaN
console.log(parseFloat(Infinity)); //Infinity

//parseFloat can not convert other numerical systems to integer. But it does not give us an error even if we try to.
console.log(parseFloat('0xFF', 16)); //0
console.log(parseFloat('FF', 16)); //NaN
console.log(parseFloat('2n90', 36)); //2

console.log("\n");

//..........................

//Other Math operators

//Math.random()
console.log(Math.random()); //returns a random number between [0,1) meaning it can return 0 but never 1.

console.log("\n");

//Min Max
console.log(Math.max(1, 2, -5, 0, 4)); //4
console.log(Math.max(1, 2, -5, -0, 4)); //4
console.log(Math.max(-1, -2, -5, 0, -4)); //0
console.log(Math.max(-1, -2, -5, -0, -4)); //-0

console.log("\n");

console.log(Math.min(1, 2, -5, 0, 4)); //-5
console.log(Math.min(1, 2, -5, -0, 4)); //-5
console.log(Math.min(+1, +2, +5, 0, +4)); //0
console.log(Math.min(+1, +2, +5, -0, +4)); //-0
console.log(Math.min(+1, +2, null, -0, +4)); //-0
console.log(Math.min(+1, +2, null, 8, +4)); //0
console.log(Math.min(3, +2, true, 8, +4)); //1
console.log(Math.min(3, +2, undefined, 8, +4)); //NaN
console.log(Math.min(3, +2, -Infinity, 8, +4)); //-Infinity

console.log("\n");

//Math.pow(n, power)
console.log(Math.pow(2,4)); //16
console.log(Math.pow(2, -0)); //1
console.log(Math.pow(-0, 0)); //1
console.log(Math.pow(0, -0)); //1
console.log(Math.pow(2, null)); //1
console.log(Math.pow(2, true)); //2
console.log(Math.pow(2, Infinity)); //Infinity
console.log(Math.pow(2, undefined)); //NaN

// There are more functions and constants in Math object, including trigo, Log.... Link : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
