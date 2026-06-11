//Scheduling: setTimeout and setInterval

// We may decide to execute a function not right now, but at a certain time later. That’s called “scheduling a call”.

// There are two methods for it:

// setTimeout allows us to run a function once after the interval of time.
// setInterval allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.

//These methods are not a part of JavaScript specification. But most environments have the internal scheduler and provide these methods. In particular, they are supported in all browsers and Node.js.

//.......................

//setTimeout

//Syntax
// let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

//func|code: Function or a string of code to execute. string of code is not recommended.

function sayHi(arg1, arg2) {
    console.log(`Hi ${arg1} and ${arg2}.`);
};
setTimeout(sayHi, 1000, "John", "Sarah"); //function sayHi runs after 1000ms or 1 second.

//wrong
// setTimeout(sayHi(),1000,"Reevs", "Nolan"); //Hi undefined and undefined. that too instantly

setTimeout("console.log('Jatin is 19 years old')", 2000); //runs after 2 seconds

//But using strings is not recommended, use arrow functions instead of them, like this:

setTimeout(() => {
    console.log("Jatin is 19 years old, LMAO.")
}, 1000); //runs after 1 seconds

//Canceling with clearTimeout

let timerId1 = setTimeout(() => console.log("never happens"), 1000);
console.log(timerId1); //4 // timer identifier

clearTimeout(timerId1);
console.log(timerId1); //4 // same identifier (doesn't become null after canceling)

// why number 4? cuz it's 4th setTimeout we have written in this script. in Node or other languages it could be different.

//..............................

// setInterval

//Syntax
//let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)

//function will keep running in timeinterval we set for an infinite period of time. To stop this we must use clearInterval

let interval1 = setInterval(() => {
    console.log("repeating after every 2 seconds");
}, 2000);

setTimeout(() => {
    clearInterval(interval1)
}, 5000);

// since we set a clearInterval after 5s, interval1 stops executing arrow function after 5s, in total it is able to execute it only 2 times in our example.

//Time goes on while alert is shown
//In most browsers, including Chrome and Firefox the internal timer continues “ticking” while showing alert/confirm/prompt.

//Nested setTimeout
/*
let timerId6 = setTimeout(function func2(){
    console.log("Hare Krishna");
    timerId6 = setTimeout(func2, 2000);
}, 2000);
*/

let someProblem = null;
let delay = 1000;
let timerId7 = setTimeout(function someReq(){
    if(someProblem == null){
        delay *= 2;
    }
    console.log(`Requesting the server because of ${someProblem}`)
    timerId7 = setTimeout(someReq, delay)
}, 1000);

// Nested setTimeout allows to set the delay between the executions more precisely than setInterval.

let i = 0

/*
setInterval(() => {
    console.log(i++);
}, 1000);
*/

//setTimeout gives us more control
/*
setTimeout(function increasingfunc(){
    console.log(i++);
    setTimeout(increasingfunc, 1000);
}, 2000);
*/

//Nested setTimeout plans next execution after end of previous execution of function, but setInterval plans out next execution from the begning of execution of previous function. the gap between executions is strict in setinterval but in case of nested setTimeout, gap between end of previous and starting of execution of next function is strict. That's the difference. 

//In simple terms, in case of Nested setTimeout we will get fixed amount of breathing period between executions but in setInterval, we won't.

//.................

//Garbage collection

//So i am going to explain how garbage collection works when using setTimeout or setIntervals,
//functions inside setTimeout or setInterval are not garbage collected cuz they are automatically internaly referenced by the v8 engine, 
//but since these functions [[Environment]] property reference to script's lexical environment, all the variables which would have been garbage collected in a normal case, are protected from being garbage collected and stay alive in memory, 
//if we want to avoid such memory leakage as i mentioned we must call methods clearTimeout or clearInterval.

//........................

//Zero delay setTimeout
//runs after script's all non-async code is done executing


setTimeout(() => console.log("World")); //runs after Hello
setTimeout(() => console.log("Namaste")); //runs after Hello and World

console.log("Hello");

//some important points:


//explaination in code
/**
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // remember delay from the previous call

  if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
  else setTimeout(run); // else re-schedule
});

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
 */

//Zero delay is in fact not zero (in a browser)
//nested zero delay setTimeout executes every 1 millisecond gap for 4 consecutive times then every 4ms (only in browser, not in node).
//similar thing happens with zero delay setInterval(f), f executes every 1ms for few times and then every 4ms (only in browser, not in node)

//because of historical reasons.

//in Node we have other better methods like 'setImmediate' to handle such async functions.

//does setTimeout(func, 0) not hit the 4ms wall and setTimeout(func) does? ans: no, both do


//Note:

//Please note that all scheduling methods do not guarantee the exact delay.

// For example, the in-browser timer may slow down for a lot of reasons:

// The CPU is overloaded.
// The browser tab is in the background mode.
// The laptop is on battery saving mode.
// All that may increase the minimal timer resolution (the minimal delay) to 300ms or even 1000ms depending on the browser and OS-level performance settings.