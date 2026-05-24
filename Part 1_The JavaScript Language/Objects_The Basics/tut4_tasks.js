'use strict';
//task 1

//
function makeUser() {
  return {
    name: "John",
    ref: this   //When javascript constructs an object it sees it and evaluates "this" as undefined
  };
}

let user = makeUser(); //we are constructing an object named user using makeUser() function.

// console.log( user.ref.name ); // What's the result? //error or empty or other depending on if or if not you are using strict mode.

function makeUser2 () {
    return{
        name : "Harry",
        ref() {         //When Javascript constructs an object, it sees it and evaluates this function as method and leave's it.
            return this
        },
    }
}

let user2 = makeUser2(); //Javascript doesn't know what's inside ref(), cuz it left it alone since it's a method.

console.log(user2.ref().name); //Harry

//
//task2



let calculator = {
    read () {
        this.a = +prompt("tell us a","2");
        this.b = +prompt("tell us b", "4");
        
    },
    sum() {
        return this.a + this.b;
    },
    mul(value1, value2) {
        return this.a * this.b;
    },

};
calculator.read();
console.log( calculator.sum() );
console.log( calculator.mul());


//

let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() { // shows the current step
    console.log( this.step );
    return this;
  }
};

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0

console.log("\n");

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0

