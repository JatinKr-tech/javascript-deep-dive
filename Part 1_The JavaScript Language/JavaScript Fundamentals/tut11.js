//Or "||"
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  console.log('The office is closed.' ); // it is the weekend
}


//Or "||" finds the first truthy value or last falsy value

console.log( 1 || 0 ); // 1 (1 is truthy)

console.log( null || 1 ); // 1 (1 is the first truthy value)
console.log( null || 0 || 1 ); // 1 (the first truthy value)

console.log( undefined || null || 0 ); // 0 (all falsy, returns the last value)

//

let userName = "";
// let id = "AJ345";
let id = "";
let dob = "";

let identification = console.log(userName || id || dob || "Anonymous");

//

//Short-circut evaluation
//Or function if detects truthy value then it returns that value and ignores the rest.

true || console.log("it won't show, it has been ignored, because Or function got a truthy value in the very beginning ");
false || console.log("This would show");

//.......................

//And "&&", && has higher priority (precedence) than ||
//"&&" returns last truthy value if and only if all the values are truthy, it returns first falsy value if some values are truthy and some are falsy.

let hr = 12;
let minute = 30;

if (hr == 12 && minute == 30){
    console.log("it's 12:30");
} else {
    console.log("it's not 12:30");
};

hr == 12 && minute == 30 && console.log("12:30") //Better use if else function for this as it is not good looking.

//............................

//Not "!", it returns boolean always

console.log(!true); // false
console.log(!false); // true
console.log(!!true); // true

console.log("\n"); //new line

console.log(Boolean(null));
console.log(Boolean(""));
console.log(Boolean("non empty string"));

console.log("\n");

console.log(!null);
console.log(!0);

console.log("\n");

console.log(!"not an empty string");
console.log(!"");
console.log(!!"");
console.log(!undefined);

//...........................

//Task


//took time for me to grasp at first. Read it properly!!!!!!
// alert( alert(1) || 2 || alert(3) ); //alert(1) is not a boolean so it's value will be undefined, so we will get alerts for both 1 and 2. why first? because it starts from left operand, meaning it doesn't see && at first, it executes alert(1) and then sees it that's why.

//alert( alert(1) && alert(2) ); //alert(1) executes then script sees && and returns undefined, becuase alert() is not a boolean.


// alert( null || 2 && 3 || 4 ); //3
/*
let age = prompt("", "");
if (!(age >= 14 && age <= 90)) {
    console.log("You are allowed here");
} else {
    console.log("You ain't allowed here");
};

if (age < 14 || age > 90) {
    console.log("You are welcome here");
} else {
    console.log("You ain't welcome here");
};
*/

//I somehow got stuck in this once, lmao:
/*
// Runs.
// The result of -1 || 0 = -1, truthy
if (-1 || 0) alert( 'first' );

// Doesn't run
// -1 && 0 = 0, falsy
if (-1 && 0) alert( 'second' );

// Executes
// Operator && has a higher precedence than ||
// so -1 && 1 executes first, giving us the chain:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'third' );
 */

//

let user = prompt("", "");

if (user === "Admin") {
    let password = prompt("","");   

    if (password === "TheMaster") {
    alert("Welcome!");
    } else if (password === "" && password === null) {
    alert("Canceled");
    } else {
    alert("Wrong password!");
    };

} else if (user === "" || user === null) {
    alert("Canceled");
} else {
    alert("I don't know you!!");
};



