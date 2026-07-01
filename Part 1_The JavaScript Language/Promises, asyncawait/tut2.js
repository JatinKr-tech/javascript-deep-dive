//Promises

//Syntax:
let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});

// Its arguments resolve and reject are callbacks provided by JavaScript itself. Our code is only inside the executor.

//resolve(value) — if the job is finished successfully, with result value.
// reject(error) — if an error has occurred, error is the error object.

//

//The promise object returned by the new Promise constructor has these internal properties:

// state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
// result — initially undefined, then changes to value when resolve(value) is called or error when reject(error) is called.

let promise1 = new Promise(function(resolve, reject) {
    // the function is executed automatically when the promise is constructed

    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve("done"), 1000);
});
//state: pending--->fulfilled
//result: undefined--->done

let promise2 = new Promise(function(resolve, reject) {
    // after 1 second signal that the job is finished with an error
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});
//state: pending--->rejected
//result: undefined--->Error: Whoops!

//To summarize, the executor should perform a job (usually something that takes time) and then call resolve or reject to change the state of the corresponding promise object.

//Note: 
//There can be only a single result or an error
// The executor should call only one resolve or one reject. Any state change is final.
// All further calls of resolve and reject are ignored
//Also, resolve/reject expect only one argument (or none) and will ignore additional arguments.

//Note:
//Reject with Error objects
// In case something goes wrong, the executor should call reject. That can be done with any type of argument (just like resolve). But it is recommended to use Error objects (or objects that inherit from Error). The reasoning for that will soon become apparent.

//Note:
//The state and result are internal
// The properties state and result of the Promise object are internal. We can’t directly access them. We can use the methods .then/.catch/.finally for that.

//...................................

//Consumers: then, catch

//then

promise1.then(
    (result)=>console.log(result), //done
    (error)=>console.log(error) //ignored
);
promise1.then(
    console.log //done
);

promise2.then(
    (result)=>console.log(result), //ignored
    (error)=>console.log(error) //Error: Whoops! at tut2.js:31:29
);
promise2.then(
    null, //ignored
    console.log //Error: Whoops! at tut2.js:31:29
);

//catch

promise2.catch(console.log); //Error: Whoops! at tut2.js:31:29

//The call .catch(f) is a complete analog of .then(null, f), it’s just a shorthand.

//Cleanup: finally

//The call .finally(f) is similar to .then(f, f) in the sense that f runs always, when the promise is settled: be it resolve or reject.

//The idea of finally is to set up a handler for performing cleanup/finalizing after the previous operations are complete.

// E.g. stopping loading indicators, closing no longer needed connections, etc.


new Promise((resolve, reject) => {
  // do something that takes time, and then call resolve or maybe reject
  setTimeout(() => resolve("done"), 1000);
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => console.log("Finished"))
  // so the loading indicator is always stopped before we go on
  .then(result => console.log(result), err => console.log(err))


//1) A finally handler has no arguments. In finally we don’t know whether the promise is successful or not. 

//2) A finally handler “passes through” the result or error to the next suitable handler.

new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000);
})
    .finally(() => console.log("Promise ready")) // triggers first
    .then(result => console.log(result)); // <-- .then shows "value"

new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Whoops!")), 2000);
})
    .finally(() => console.log("Promise ready")) // triggers first
    .catch(err => console.log(err));  // <-- .catch shows the error


new Promise((resolve, reject) => {
    throw new Error("error");
})
    .finally(() => console.log("Promise ready")) // triggers first
    .catch(err => console.log(err));  // <-- .catch shows the error

//3) A finally handler also shouldn’t return anything. If it does, the returned value is silently ignored.

// The only exception to this rule is when a finally handler throws an error. Then this error goes to the next handler, instead of any previous outcome.

//note: 
//We can attach handlers to settled promises
// If a promise is pending, .then/catch/finally handlers wait for its outcome.
// Sometimes, it might be that a promise is already settled when we add a handler to it.
// In such case, these handlers just run immediately:

// the promise becomes resolved immediately upon creation
let promise3 = new Promise((resolve, reject) => {
    // resolve("done3!");
    setTimeout(() => resolve("done3!"), 2000);
});

promise3.then(console.log); // done3! (shows up right now)

//................................

//Example: loadScript

/**
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for  ${src}`));

    document.head.append(script);
}
 */

//Re-writing it but using promises

function loadScript(src){
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Script load error for  ${src}`));

        document.head.append(script);
    });
};

// let promise4 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
let promise4 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.jssssssssss");

promise4.then(
    result => console.log(`We have loaded the script: ${result} successfully!`),
    err => console.log(err.message)
);

// promise4.then(
//     result => console.log('lmao ', result) 
// )
//error uncaught message in above promise4.then without err argument

promise4.then(
    result => console.log(`We have loaded the script but showing the message 2nd time: ${result} successfully!`),
    err => console.log(err.message, ' fjdlsjfdl')
);

//We can call .then on a Promise as many times as we want.

promise4.catch(
    err => console.log(err.name)
);

promise4.catch(
    err => console.log(err.name)
);