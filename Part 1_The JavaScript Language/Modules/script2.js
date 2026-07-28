function sayHi(user) {
  console.log(`Hello, ${user}!`);
}

function sayBye(user) {
  console.log(`Bye, ${user}!`);
}

export {sayHi, sayBye};

function greetWelcome(user) {
  console.log(`Welcome , ${user}!`);
}

function greetNewYear(user) {
  console.log(`Happy New Year , ${user}!`);
}

export {greetWelcome as welcome, greetNewYear as NYear};