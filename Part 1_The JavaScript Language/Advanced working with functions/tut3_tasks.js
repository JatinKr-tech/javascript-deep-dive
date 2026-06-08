'use strict';
//tasks

//task1

let name1 = "John";

function sayHi() {
  console.log("Hi, " + name1);
}

name1 = "Pete";

sayHi(); // what will it show: "John" or "Pete or Ramsy"?

//answer is Pete

name1 = 'Ramsy';


//task 2

function makeWorker() {
  let name2 = "Pete";

  return function() {
    console.log(name2);
  };
}

let name2 = "John";

// create a function
let work = makeWorker();
// let name2 = "John"; //fine
// call it
work(); // what will it show?
// let name2 = "John"; //not fine, reference error, why?

//Reason: A closure can access a variable declared after it is born because it links to the live scope environment, not to a static snapshot of the values.
// When a closure is created, it captures a reference to the entire outer variable scope, which remains alive and active until the closure itself is called.

//answer is Pete. cuz of scope search. If name2 didn't exist in makeWorker() then the search would have progressed to script's lexical environment's Environment record and we would have got John

//task3

function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1

console.log( counter2() ); // ? //ans: 0
console.log( counter2() ); // ? //ans: 1

//The answer: 0,1.

// Functions counter and counter2 are created by different invocations of makeCounter.

// So they have independent outer Lexical Environments, each one has its own count.

//task 4

function stepCounter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counterObj = new stepCounter(); //both functions "up" and "down" born in the exact same lexical environment so they share the same lexical environment

console.log( counterObj.up() ); // 1
console.log( counterObj.up() ); // 2
console.log( counterObj.down() ); // 1

//task5

let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHello() {
    console.log(`${phrase}, ${user}`);
  }
}

// sayHello();  //in strict mode it throws an error as it should since it is outside the code block of 'if' but in non-strict mode it works

//task6

function sum(a){
    return function(b){
        return a + b; // takes "a" from the outer lexical environment
    }
}


console.log(sum(1)(2)); //3
console.log(sum(5)(-1)); //4

//task7

let x = 1;

function func2() {
//   console.log(x); //Reference Error, x = <uninitialized>

  let x = 2;
}

func2();

//task8

function inBetween(x, y){
    return function(item) {
        return (item >= x && y >= item)
    };
};

function inArray(array){
    return function(item){
        return array.includes(item);
    };
};

let arr = [1, 2, 3, 4, 5, 6, 7, 10];

console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

console.log( arr.filter(inArray([1, 2, 10, 342])) ); // 1,2

//task9

function byField(fieldName){
    return function(a, b) {
        return (a[fieldName] > b[fieldName])? 1 : -1;
    };
};

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

users.sort(byField('name'));
// users.sort(byField('age'));
console.log(users)

//task 10

function makeArmy() {
    let shooters = [];
    
    let i = 0;
    while (i < 10) {
        let k = i; //i is defined here, k simply taks value of i
        let shooter = function() { // create a shooter function,
            // let k = i; //i is not defined here, need to use outer reference to scope search outside.
            console.log( k ); // that should show its number
        };
        shooters.push(shooter); // and add it to the array
        i++;
    }

    // ...and return the array of shooters
    return shooters;
}

let army = makeArmy();

// all shooters show 10 instead of their numbers 0, 1, 2, 3...
// army[0](); // 10 from the shooter number 0
// army[1](); // 10 from the shooter number 1
// army[2](); // 10 ...and so on.

army[0](); // 0 from the shooter number 0
army[1](); // 1 from the shooter number 1
army[2](); // 2 ...and so on.

