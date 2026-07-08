//Async/await

//.............................

// Async functions

//async ensures that the function returns a promise, and wraps non-promises in it.

async function f() {
    return 'test';
}

f().then(result => console.log(result)); // 'test'

//..................................

// Await

// works only inside async functions

new Promise((resolve, reject)=>{
    resolve(1)
}).then(result => console.log(result));

console.log("Meow"); //Prints before 1 and even 'test'

//

async function f21() {
    let promise = Promise.resolve(21)
    let result = promise;
    console.log(result) //Promise {<fulfilled>: 21}
    console.log(`prints after the object result points`)
}
f21()


async function f22() {
    let promise = Promise.resolve(22)
    let result = await promise; //instead of pointing to promise object, result points to resolve of promise because await tells javascript to settle promise to asign value of result to promise resolve.
    console.log(result)
    console.log(`prints after 22`)
}
f22()

// Let’s emphasize: await literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn’t cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

//Important points:
//Can’t use await in regular functions

/**
function f() {
    let promise = Promise.resolve(1);
    let result = await promise; // Syntax error
}
 */

//Let’s take the showAvatar() example from the chapter Promises chaining and rewrite it using async/await:

//We’ll need to replace .then calls with await.
// Also we should make the function async for them to work.

async function showAvatar() {

  // read our JSON
  let response = await fetch('/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();

//Important

//In modern browsers, await on top level works just fine, when we’re inside a module. We’ll cover modules in article Modules, introduction.

// we assume this code runs at top level, inside a module
/*
let response = await fetch('/user.json');
let user = await response.json();

console.log(user);
*/

//If we’re not using modules, or older browsers must be supported, there’s a universal recipe: wrapping into an anonymous async function.

// Like this:

(async () => {
    let response = await fetch('/user.json');
    let user = await response.json();
    console.log(user);
})();

//Important

//await accepts “thenables”

class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function fthenable() {
  // waits for 1 second, then result becomes 8
  let result = await new Thenable(4);
  console.log(result);
}

fthenable();

//Async class methods
// To declare an async class method, just prepend it with async:

class Waiter {
  async wait() {
    return await Promise.resolve(100);
  }
}

new Waiter()
  .wait()
  .then(console.log); // 100 (this is the same as (result => alert(result)))

//..........................

//Error handling

async function f31() {
  await Promise.reject(new Error("Whoops!"));
}

// f31()

async function f32() {
    try {
        let response = await fetch('http://no-such-url');
        let user = await response.json();
    } catch (error) {
        console.log(error)
    }
}

f32()

//

async function f33() {
    let response = await fetch('http://no-such-url');
}

f33().catch(err=>console.log(err.message))

//Note
//async/await works well with Promise.all

/**
// wait for the array of results
try {
    let results = await Promise.all([
    fetch(url1),
    fetch(url2),
    ...
]);
} catch (error) {
    console.log(error.message)
}
 */

//.........................

//Summary

// The async keyword before a function has two effects:

//!) Makes it always return a promise.
//2) Allows await to be used in it.

// The await keyword before a promise makes JavaScript wait until that promise settles, and then:

//1) If it’s an error, an exception is generated — same as if throw error were called at that very place.
//2) Otherwise, it returns the result.

// Together they provide a great framework to write asynchronous code that is easy to both read and write.

// With async/await we rarely need to write promise.then/catch, but we still shouldn’t forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also Promise.all is nice when we are waiting for many tasks simultaneously.