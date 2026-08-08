'use strict';

//Reference Type

let user = {
  name: "John",
  hi() { console.log(this.name); },
  bye() { console.log("Bye"); }
};

user.hi(); // works

// now let's call user.hi or user.bye depending on the name
// (user.name == "John" ? user.hi : user.bye)(); // Error!


//Reference type explained

//Reference Type is an "internal type" of the language.
//The Reference Type is a “specification type”. We can’t explicitly use it, but it is used internally by the language.

//The value of Reference Type is a three-value combination (base, name, strict), where:

// base is the object.
// name is the property name.
// strict is true if use strict is in effect.


// Reading a property, such as with dot . in obj.method() returns not exactly the property value, but a special “reference type” value that stores both the property value and the object it was taken from.

//Any other operation like assignment hi = user.hi discards the reference type as a whole, takes the value of user.hi (a function) and passes it on. So any further operation “loses” this.

//So, as the result, the value of this is only passed the right way if the function is called directly using a dot obj.method() or square brackets obj['method']() syntax

//We can use .bind() to avoid this problem

//Tasks

//task1

// What is the result of this code?

/*
let user2 = {
  name: "John",
  go: function() { console.log(this.name) }
}

(user2.go)()
*/

//No semicolon ';' after '}', 

//Please note that parentheses around (user.go) do nothing here. Usually they setup the order of operations, but here the dot . works first anyway, so there’s no effect. Only the semicolon thing matters.

//task2

let obj, method;

obj = {
  go: function() { console.log(this); }
};

obj.go();               // (1) {go: ƒ} //regular object method call.

(obj.go)();             // (2) {go: ƒ} //parentheses do not change the order of operations here, the dot is first anyway.

(method = obj.go)();    // (3) undefined //Here we have a more complex call (expression)(). The call works as if it were split into two lines:
//Here f() is executed as a function, without this.

(obj.go || obj.stop)(); // (4) undefined //The similar thing as (3), to the left of the parentheses () we have an expression.