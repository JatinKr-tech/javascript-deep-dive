//Microtasks

let promise = Promise.resolve();

promise.then(() => console.log("promise done!"));

console.log("code finished"); // this alert shows first

// If you run it, you see code finished first, and then promise done!.
// That’s strange, because the promise is definitely done from the beginning.

// Why did the .then trigger afterwards? What’s going on?

//...............................

//Microtasks queue

//My explanation: 

// runtime environment looks through the code, it the pushes the task in callstack or microtask queue or macrotask queue,
//  {step 1} as soon as a task enters callstack it is checked by runtime environment (its inner tasks is again either put above the callstack or put into queue), this process repeats until there are no more tasks inside. 
// {step 2} In callstack execution happens from top (LIFO: Last In First Out). This way execution happens and once the environment have completed all the non-queued tasks the execution of queued tasks begin, 
// {step 3} the task inside microtask queue are pushed to the call stack one by one, for every task {step 1} repeats (every new microtask inside those tasks being executed inside callstack is pushed at the very bottom of the same microtask queue) (FIFO: First In First Out), once the microtask queue is empty--- 
// {step 4} execution of tasks of macrotask queue begins (what are those tasks? setTimeout or setInterval whose timer has reached 0, runtime environment pushes them to macrotask queue they wait there to wait for microtask queue to empty, runtime environment is responsible for pushing to macrotask queue), tasks are pushed into callstack, all the previous steps from step 1 repeat like a loop, note: microtask and macrotask queues are dynamic. 

//Same explanation, Language Refined by AI:
// {Step 1 - The Setup}: The runtime environment reads the script file. Synchronous code goes to the Call Stack. Promises handlers go to the Microtask Queue. Timers are handed off to the Browser/Node APIs to count down.

// {Step 2 - The Stack}: The Call Stack executes code from the top down (LIFO). When a function calls another function, it stacks on top. This runs until the main script finishes and the Call Stack hits 0.

// {Step 3 - The Microtasks}: The Event Loop pulls tasks from the front of the Microtask Queue (FIFO) and pushes them onto the Call Stack. If executing a microtask creates a new microtask, it goes to the back of the line, and the Event Loop will stay here until the queue is completely empty.

// {Step 4 - The Macrotasks}: Only when the Microtask queue is entirely empty, the Event Loop goes to the Macrotask queue (which holds ready-to-go setTimeout/setInterval callbacks pushed there by the Browser/Node APIs). It takes exactly ONE macrotask, pushes it to the Call Stack, and then immediately goes back to Step 3 to check for microtasks again.

//.............................

//Unhandled rejection

//An “unhandled rejection” occurs when a promise error is not handled at the end of the microtask queue.

let promise2 = Promise.reject(new Error("Promise Failed!"));
promise2.catch(err => console.log('caught'));

// doesn't run: error handled
// window.addEventListener('unhandledrejection', event => console.log(event.reason));

// But if we forget to add .catch, then, after the microtask queue is empty, the engine triggers the event:

let promise3 = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
// window.addEventListener('unhandledrejection', event => console.log(event.reason));

// What if we handle the error later? Like this:

let promise4 = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise4.catch(err => console.log('caught error of promis4')), 1000);

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => console.log(event.reason));

//Since we understand how callstack, microtask queue, macrotask queue works, it becomes obvious why  we get both in the console : 'Error: Promise Failed! at tut7.js:56:31' and 'caught error of promis4'.

//some important points:

//Promise handling is always asynchronous
//In most Javascript engines, including browsers and Node.js, the concept of microtasks is closely tied with the “event loop” and “macrotasks”. As these have no direct relation to promises, they are covered in another part of the tutorial, in the article Event loop: microtasks and macrotasks.