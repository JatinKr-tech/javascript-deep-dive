//task1

//what will be the output?
'use strict';

function f() {
  console.log( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g(); //null when strict mode is on

//................................

//task2

//additional bind

//Can we change this by additional binding?

function f2() {
  console.log(this.name);
}

f2 = f2.bind( {name: "John"} ).bind( {name: "Ann" } );

f2(); //John

//The exotic bound function object returned by f.bind(...) remembers the context (and arguments if provided) only at creation time.

// A function cannot be re-bound.

//..................................

//task3

function sayHi() {
    console.log( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
    name: "John"
});

console.log( bound.test ); // what will be the output? why? 
//ans: undefined, because bind returns a completely new function just like how array.map method returns a completely new array.

//task4

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user2 = {
  name: 'John',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};


askPassword(user2.loginOk.bind(user2), user2.loginFail.bind(user2));

//..........................

//task5

function askPassword2(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user3 = {
  name: 'John',

  login(result) {
    console.log( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

askPassword2(user3.login.bind(user3, true), user3.login.bind(user3, false)); // ?