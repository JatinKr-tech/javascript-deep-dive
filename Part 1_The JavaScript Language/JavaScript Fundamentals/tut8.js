// "+", "-", "*", "/", "**"

let one = 1;
let negTwo = -2;

console.log(one);
console.log(negTwo);
console.log(+negTwo); //-2
console.log(-negTwo); //2

//

let stringOne = "Apple";
let stringTwo = "Banana";

let stringThree = "4";
let stringFour = "8";

console.log(stringThree + stringFour); //4 + 8 = 48, because we are adding two strings.
console.log(+stringThree + +stringFour); //4 + 8 = 12, because we converted strings to numbers by adding a prefix "+" (which we call unary plus) as seen above in the example.

console.log(stringOne + stringTwo);
console.log(+stringOne + +stringTwo); //NaN, because stringOne and stringTwo does not contain a mathable quantity so they can't be converted to a number.

//

console.log(+true) //converts non-numbers to numeric value
console.log(+"")

//Note - Unary operators has higher precedence than binary operators, meaning +string has higher priority than num**num

//..............

/*
let a, b, c     
    a = b = c = 3**2
console.log(a, b, c);
*/
//better way to write the above script!!
/*
let a = 3**2;
let b = a;
let c = a;
console.log(a, b, c)
*/

/*
let num1 = 4
 num1 = num1 + 4 //8
 num1 = num1 + 4 //12
 console.log(num1);
*/
//better way to write the above script!!
let num1 = 4;
num1 += 4;
num1 += 4;
console.log(num1);

//....................

//Increment/Decrement

let counter = 0;
//++
// console.log(counter++); //returns 0 but the actual return we will get after this is 1
// console.log(counter); //returns 1
//console.log(++counter); //returns 1 and actual return we will get after this is 1

//--
// console.log(counter--); //returns 0 but the actual return we will get after this is -1
// console.log(--counter); //returns -1 and the actual return we will get after this is also -1

console.log(4*counter++); //0
console.log(counter); //1
console.log(4*counter); //4

//......................

//Bitwise operator
//read on MDN, not much useful in web development but useful in cryptography

//there are many more other than these Bitwise operators given below.
let num11 = 4;
let num12 = 6;

console.log(num11 < num12 && num11 != 5 && num12 == 6); //true, because all the conditions are true

console.log(num11 < num12 && num11 == 5 && num12 == 6); //false, because not all the conditions are true like num11 is not equal to 5

console.log(num11 < num12 || num11 == 5 || num12 != 6); //true, because atleast 1 conditions is true
console.log(num11 > num12 || num11 == 5 || num12 != 6); //false, because no condition is true

//.......................

//"," comma
let num21 = (1 + 2 , 3 + 4);
console.log(num21);

//it works like this:
// let num21 = 1+2;
//  num21 = 3+4;

//it does not improve the readability so use it by keeping in mind.

//Used a lot like this:
for(a=2, b=4, c=a*b; c>10; c++){

};

//........................

//Task
/*
let a1 = prompt("First number?", 2);
let b1 = prompt("Second number?", 3);

alert(+a1 + +b1);
*/

console.log(" \t \n" - 2); //an empty string
console.log(name = "\tJatin") //tab
console.log(name = "\nJatin") //newline







  

