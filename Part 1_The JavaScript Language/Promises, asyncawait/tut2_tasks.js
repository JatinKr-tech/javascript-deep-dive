//Promises

//Tasks

//task1

let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000); //ignored
});

promise.then(console.log); //1

//..................................

//task2

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>resolve("doneX1"), ms);
  })
}

delay(3000).then(() => console.log('runs after 3 seconds'));

//..............................

//task3

//Animation and Promise releated, --skip