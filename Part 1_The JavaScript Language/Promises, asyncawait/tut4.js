//Error handling with promises

fetch('https://no-such-server.blabla') // rejects
  .then(response => response.json())
  .catch(err => console.log(err)) // TypeError: failed to fetch (the text may vary)

//.catch doesn’t have to be immediate. It may appear after one or maybe several .then

fetch('/script3.js')
// fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => console.log(error.message));

//Normally, such .catch doesn’t trigger at all. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.

//.............................

//Implicit try…catch

//The code of a promise executor and promise handlers has an “invisible try..catch” around it. If an exception happens, it gets caught and treated as a rejection.

new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(console.log); // Error: Whoops!

// …Works exactly the same as this:
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(console.log); // Error: Whoops!

//The “invisible try..catch” around the executor automatically catches the error and turns it into rejected promise.

// This happens not only in the executor function, but in its handlers as well

new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
//   throw new Error("Whoops!"); // rejects the promise
  blabla(); // no such function
}).catch(console.log); // Error: Whoops!

//The final .catch not only catches explicit rejections, but also accidental errors in the handlers above.

//...............................

//Rethrowing

// the execution: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    console.log("Can't handle such error");

    throw error; // throwing this or another error jumps to the next catch
  }

}).then(function() {
  /* doesn't run here */
}).catch(error => { // (**)

  console.log(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way

});

//...........................

//Unhandled rejections


new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
    // successful promise handlers, one or more
  }); // without .catch at the end!

//What happens when a regular error occurs and is not caught by try..catch? The script dies with a message in the console. A similar thing happens with unhandled promise rejections.

//In the browser we can catch such errors using the event unhandledrejection:

window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  console.log(event.promise); // [object Promise] - the promise that generated the error
  console.log(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error

//script still dies out!!

//Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report the incident to the server.

// In non-browser environments like Node.js there are other ways to track unhandled errors.

//...........................................

//Summary:

//.catch handles errors in promises of all kinds: be it a reject() call, or an error thrown in a handler.
// .then also catches errors in the same manner, if given the second argument (which is the error handler).
// We should place .catch exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
// It’s ok not to use .catch at all, if there’s no way to recover from an error.
// In any case we should have the unhandledrejection event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never “just dies”.

//................................

//Tasks:

//task1

// What do you think? Will the .catch trigger? Explain your answer.

/*
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);

*/

//no, the error is generated not while the executor is running, but later. So the promise can’t handle it.