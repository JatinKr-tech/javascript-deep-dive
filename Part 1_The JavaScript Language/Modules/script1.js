export function sayHi(user) {
  console.log(`Hello, ${user}!`);
}

console.log('Module is evaluated!');

export let admin = {
  name: "John"
};

console.log(this); //would show global object if script1.js is executed independently but currently it is being imported into tut1.js thats why it is undefined