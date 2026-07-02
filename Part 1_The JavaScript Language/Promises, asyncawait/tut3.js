//Promises chaining

new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000); 
    // setTimeout(() => reject(1), 1000); //Uncaught (in promise) 1

}).then(function(result) {

  console.log(result); // 1
  return result * 2;

}).then(function(result) { 

  console.log(result); // 2
  return result * 2;

}).then(function(result) {

  console.log(result); // 4
  return result * 2;

});

//Don't do the mistake below, below is not chaining example:

let promise1 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise1.then(function(result) {
  console.log(result); // 1
  return result * 2;
});

promise1.then(function(result) {
  console.log(result); // 1
  return result * 2;
});

promise1.then(function(result) {
  console.log(result); // 1
  return result * 2;
});

// What we did here is just adding several handlers to one promise. They don’t pass the result to each other; instead they process it independently

//.........................

//Returning promises

// A handler, used in .then(handler) may create and return a promise.
// In that case further handlers wait until it settles, and then get its result.

//ex:

new Promise ((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
}).then((result)=>{
    console.log(result); //1
    return result*2;
}).then((result)=>{
    console.log(result); //2
    return result*2;
}).then((result)=>{
    console.log(result); //4
    return new Promise((resolve, reject) => {
        setTimeout(()=>resolve(result*10), 500);
    })
}).then((result)=>{ //500ms delay
    console.log(result); //40
    return result*10;
}).then((result)=>{
    console.log(result); //400
    return new Promise((resolve, reject) => {
        setTimeout(()=>resolve(result*100), 250);
    })
}).then((result)=>{ //250ms delay
    console.log(result); //40000
});

//.................................

//Example: loadScript

function loadScript(src){
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for  ${src}`));

        document.head.append(script);
    });
};

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js')
    .then(result => loadScript('/script1.js'))
    .then(result => loadScript('/script2.js'))
    .then(result => {
        console.log(_)
        func1('Addition')
        func21(2, 3)
    });

//Thenables

class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve); // function() { native code }
    // resolve with this.num*2 after the 1 second
    setTimeout(() => resolve(this.num * 2), 2500); // (**)
  }
}

new Promise(resolve => resolve(1))
    .then(result => {
        return new Thenable(result); // (*)
    })
    .then(console.log); // shows 2 after 1000ms

//In JavaScript, any object that implements a .then() method is called a "Thenable" object.
//Javascript executes that method automatically.

// 1) Any object which has 'then' method is called thenable object. 

// 2) Javascript automatically executes 'then' method be it any object, but there is a condition, that object must be returned inside a promise chain. 

// 3) why JavaScript do this weird thing? 
// because when JavaScript older versions had no native 'Promises', libraries created their own Promises like class/object with then method to make it behave like promises that's why when native Promises was added to JavaScript, creators of JavaScript decided to add this functionality to make JavaScript interoperable.

//.........................................

//Bigger example: fetch

//Syntax:
//let promise = fetch(url);

//fetch makes a request to 'url' then returns a response (before text load is complete, very initial), response.text() returns a new promise which resolves when text load is complete

//response.text

fetch('/script1.js')
    .then(response => {
        console.log(response);
        return response.text()
    })
    .then(resolve => {
        console.log(resolve); //Every text inside script1.js
        console.log(typeof resolve); //string
    });

//response.json

fetch('/script3.js')
    .then(response => response.json())
    .then(resolve => {
        console.log(resolve); //{name: 'JatinKr-tech', age: 19, human: true}, //Only JSON parsable, bohot jhanjhat
        console.log(typeof resolve); //obj
    });

//


// Make a request for user.json
fetch('/script3.js')
  // Load it as json
  .then(response => response.json())
  // Make a request to GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then(response => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
    // setTimeout(() => {img.remove(); return githubUser}, 3000); // (*)
  })
//   .then(result=>console.log("doneeeee", result.name)) //doesn't work as intended as it doesn't wait for setTimeout to finish executing, 'result' argument is undefined.

//To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing.

fetch('/script3.js')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (**)
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => console.log(`Finished showing ${githubUser.name}`));

//That is, the .then handler in line (*) now returns new Promise, that becomes settled only after the call of resolve(githubUser) in setTimeout (**). The next .then in the chain will wait for that.

//Important: As a good practice, an asynchronous action should always return a promise.

//in reusable, organized form

function loadJson(src){
    return fetch(src)
            .then(response => response.json())
};

function loadGithubName(name){
    return loadJson(`https://api.github.com/users/${name}`);
};

function showAvatar(githubUser){
    return new Promise(function(resolve, reject) { // (*)
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser); // (**)
        }, 6000);
    })
};

loadJson('/script3.js')
    .then(response => loadGithubName(response.name))
    .then(response => showAvatar(response))
    .then(response => console.log(`${response.name} Finished it's Avatar Showcase`));

//................................

//Tasks

//Task1

//Are these code fragments equal? In other words, do they behave the same way in any circumstances, for any handler functions?

// promise.then(f1).catch(f2);

// Versus:

// promise.then(f1, f2);

//ans: no, reason: first one is chaining