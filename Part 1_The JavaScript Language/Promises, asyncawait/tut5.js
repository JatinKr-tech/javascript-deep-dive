//Promise API

//There are 6 static methods in the Promise class.

//..............................

//Promise.all

//Let’s say we want many promises to execute in parallel and wait until all of them are ready.
//That’s what Promise.all is for.

// The syntax is:

/*
let promise = Promise.all(iterable);
Promise.all takes an iterable (usually, an array of promises) and returns a new promise.
*/

// The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.

// For instance, the Promise.all below settles after 3 seconds, and then its result is an array [1, 2, 3]:

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log); // 1,2,3 when promises are ready: each promise contributes an array member

//note: the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it’s still first in the array of results.

//good way of fetching URL's:
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => console.log(`${response.url}: ${response.status}`)
  ));

//

let names = ['iliakan', 'remy', 'jeresig'];

let requests2 = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests2)
  .then(responses => {
    for(let response of responses){
        console.log(`${response.url}: ${response.status}`)
    };
    return responses;
  })
  .then(responses => Promise.all(responses.map(result => result.json())))
  .then(users => users.forEach(user => console.log(user.name)));

//If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.

//ex:
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(console.log); // Error: Whoops!

//Here the second promise rejects in two seconds. That leads to an immediate rejection of Promise.all, so .catch executes: the rejection error becomes the outcome of the entire Promise.all.

//

//In case of an error, other promises are ignored

// If one promise rejects, Promise.all immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

// For example, if there are multiple fetch calls, like in the example above, and one fails, the others will still continue to execute, but Promise.all won’t watch them anymore. They will probably settle, but their results will be ignored.

// Promise.all does nothing to cancel them, as there’s no concept of “cancellation” in promises. In another chapter we’ll cover AbortController that can help with that, but it’s not a part of the Promise API.

//

//important:
//Promise.all(iterable) allows non-promise “regular” values in iterable
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(console.log); // 1, 2, 3

//..........................................

//Promise.allSettled

//A recent addition, Old browsers may need polyfills.

let urls2 = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls2.map(url => fetch(url)))
/*[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]*/
  .then(results => { // (*)
    results.forEach((result, index) => {
      if (result.status == "fulfilled") {
        console.log(`${urls2[index]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        console.log(`${urls2[index]}: ${result.reason}`);
      }
    });
  });

// If the browser doesn’t support Promise.allSettled, it’s easy to polyfill:

if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}

//In this code, promises.map takes input values, turns them into promises (just in case a non-promise was passed) with p => Promise.resolve(p), and then adds .then handler to every one.

//.....................................

//Promise.race

// Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

// The syntax is:
// let promise = Promise.race(iterable);

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log); // 1

// The first promise here was fastest, so it became the result. After the first settled promise “wins the race”, all further results/errors are ignored.

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 500)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log)
  .catch(console.log); // Whoops!

//Promise.any
// Similar to Promise.race, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with AggregateError – a special error object that stores all promise errors in its errors property.

// The syntax is:
// let promise = Promise.any(iterable);

Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log); // 1

Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("WhoopsX1!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("WhoopsX2!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("WhoopsX3!")), 3000))
]).then(console.log)
  .catch(error => {
    console.log(error); //AggregateError: All promises were rejected
    console.log(error.constructor.name) //AggregateError
    console.log(typeof error.errors[0]) //object
    console.log(error.errors[0]) //Error: WhoopsX1! at tut5.js:177:60
    console.log(error.errors[1]) //Error: WhoopsX2! at tut5.js:178:60
    console.log(error.errors[2]) //Error: WhoopsX3! at tut5.js:179:60
  }); 

//................................

//Promise.resolve/reject

// Methods Promise.resolve and Promise.reject are rarely needed in modern code, because async/await syntax makes them somewhat obsolete.

//Promise.resolve

// Promise.resolve(value) creates a resolved promise with the result value.

//same as writing: let promise = new Promise(resolve => resolve(value));


let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}

//We can write loadCached(url).then(…), because the function is guaranteed to return a promise. We can always use .then after loadCached. That’s the purpose of Promise.resolve in the line (*).

//Promise.reject

// Promise.reject(error) creates a rejected promise with error.

//same as writing: let promis = new Promis((resolve, reject)=> reject(error));