//BigInt

//A recent addition

const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // same as 10n

console.log(bigint);
console.log(sameBigint);
console.log(bigintFromNumber);

//..........................

//Math Operators

console.log(1n + 2n); // 3n

console.log(5n / 2n); // 2n

//Important:

// console.log(1n + 2); // Error: Cannot mix BigInt and other types

let bigint1 = 1n;
let number1 = 2;

// number to bigint
console.log(bigint1 + BigInt(number1)); // 3n

// bigint to number
console.log(Number(bigint1) + number1); // 3

//The conversion operations are always silent, never give errors, but if the bigint is too huge and won’t fit the number type, then extra bits will be cut off

//Important:

// The unary plus is not supported on bigints

// console.log(+bigint1); //TypeError: Cannot convert a BigInt value to a number

//.................................

//Comparisons

// Comparisons, such as <, > work with bigints and numbers just fine

console.log(1n < 5n); //true
console.log(1n == 1n); //true
console.log(1n === 1n); //true

console.log(2 > 1n); //true
console.log(1 == 1n); //true
console.log(1 === 1n); //false

//.................................

//Boolean operations

//When inside if or other boolean operations, bigints behave like numbers.

if (0n) {
    console.log("XYZ"); //Never executes
};

console.log(1n || 2n); //1n
console.log(0n || 2n); //2n
console.log(0n || 2); //2

//.................................

//Polyfills

//Polyfilling bigints is tricky
//We gotta write code in JSBI