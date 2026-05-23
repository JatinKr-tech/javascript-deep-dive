let key_fruitName = prompt("Which fruit to buy?", "Apple");

let bag = {
    [key_fruitName] : 5
};

console.log(bag.Apple); //5 //if key_fruitName = Apple then we will get 
console.log(bag.banana); //undefined

console.log(bag[key_fruitName]); //5 //whatever prompt we may enter.

//

function userOne(name, age) { //same as userTwo
    return {
        name : name,
        age : age,
    };
};
function userTwo(value, age) { //same as userOne
    return {
        name,   
        age,
    };
};

/*

let user = {
  name,  // same as name:name
  age: 30
};

 */

let name = "Jatin";
let age = 19;

console.log(userOne(name, age));
console.log(userTwo(name, age));

//..................

//Property name limitations
//As we know naming a variable comes with several restrictions but the same is not true for object properties. Cuz they are converted to string.

//here 0 : "Zero", 0 is converted to a string "0"

let obj = {
    for : "fds",
    let : "lsmo",
    return : 0,
    0 : "Zero",

    // #$@#$ : "fdsfds"     //This is not allowed, why??
};

console.log(obj);
console.log(obj[0]);    //works
console.log(obj["0"]);  //works

//

obj.__proto__ = 22;
console.log(obj.__proto__); //does not returns assigned value of 22, we will cover it's behaviour in later chapters.

//...................
//Property existance check, "in" operator

let ObjectForTesting = {
    fruit : "apple",
    car : "BMW GTR",
    "Bank Balance": undefined, //in real cases, we don't use undefined to show emptyness, we use null.
};
let cloth = "shirt";

console.log(ObjectForTesting.cloth === undefined); //true, meaning cloth property does not exist in ObjectForTesting. 
//we can simply use "in" to check, 
//
//it also eliminates the possibility of a property returning undefined which does exist in the object.
console.log(cloth in ObjectForTesting); //false, meaning cloth property does not exist in ObjectForTesting.
console.log("fruit" in ObjectForTesting); //true, meaning fruit property does exist in ObjectForTesting.
console.log("house" in ObjectForTesting); //false, meaning house property does not exist in ObjectForTesting.

console.log("Bank Balance" in ObjectForTesting); //true

console.log("\n");

//.......................
//The for..in loop

let userThree = {
    Name : "Leon S. Kennedy",
    Age : 50,
    Profession : "Fedral Agent",
    Department : "D.S.O.",
    "Access-granted" : true,
};

for (let key in userThree) {    //we can create any variable here, let key or let prop are used more, use these for better code writing practices and aesthetics.
    console.log(`${key} : ${userThree[key]}`);  //userThree.key returns undefined, so beware
};


//...................................
//Ordered like an Object, How objects are displayed, their order.
//non-integers are sorted as their creation order but integers are sorted like this:

console.log("\n");

let CountryCodes = {
    "91": "India",
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    "1": "USA",
    // ..,
    "2.5" : "Moon",
    "+2": "Mars",

    "30" : "REVillage",
};

for (let prop in CountryCodes){
    console.log(prop); //1, 30, 41, 44, 49, 91, 2.5, +1.5
};

//About builtin function trunc which converts to intigers.
/*

// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property

 */

let CountryCodesListTwo = {
    "+91": "India",
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    "+1": "USA",
    "+2": "Mars",
    "+30" : "REVillage",
    "1.5" : "moon",
    "0" : "Venus",  //This goes on the very top
};

for (let prop in CountryCodesListTwo){
    console.log(+prop); //Sorted as creation, this is a cheat so it works as intended.
};

//...................

//There are many other kinds of objects in JavaScript:

// Array, to store ordered data collections,
// Date, to store the information about the date and time,
// Error, to store the information about an error.

//.......................

console.log("\n");

//Task

let userFour = {
    name : "John",
    username : "Smith",
};

console.log(userFour); //name got deleted, only returns username : "Smith"


for (let key in userFour) {
    console.log(`${key} : ${userFour[key]}`)
};

console.log("\n");
userFour.name = "Pete";
console.log("\n");

for (let key in userFour) {
    console.log(`${key} : ${userFour[key]}`)
};

delete userFour["name"];

console.log("\n");

for (let key in userFour) {
    console.log(`${key} : ${userFour[key]}`)
};

console.log("\n");

//task

let schedule = {
    // name : "krish",
};



console.log("\n");

function isEmpty(value) {
    for (let key in schedule) {     //if object is empty then this won't run, if it is not empty then it will run.
        return `is empty : ${false}`
    };
    return `is empty : ${true}`
};

console.log(isEmpty(schedule));

console.log("\n");

//task

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};

function calculateSalaries(object) {
    let sum = 0;
    for(key in object) {
        sum += object[key];

    };
    return sum;
};

console.log(calculateSalaries(salaries));

console.log("\n");

//task

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

function multiplyNumeric(object){
    for(key in object) {
        if (typeof object[key] == "number"){
             console.log(`${key} = ${2*object[key]}`);
             // return `${key} = ${2*object[key]}`;     //runs for only one key width = 200; then stops 
        } else {
            console.log(`${key} = ${object[key]}`)
        }
        // return `${key} = ${object[key]}`;    
    };
};

multiplyNumeric(menu);