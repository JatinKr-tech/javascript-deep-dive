//tasks

//task1

let animal = {
    jumps: null
};
let rabbit = {
    __proto__: animal,
    jumps: true
};

console.log( rabbit.jumps ); // ? (1) //true

delete rabbit.jumps;

console.log( rabbit.jumps ); // ? (2) //null

delete animal.jumps;

console.log( rabbit.jumps ); // ? (3) //undefined

//............................

//task2

let head = {
  glasses: 1
};

let table = {
  pen: 3,
  __proto__: head
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table
};

let pockets = {
  money: 2000,
  __proto__: bed
};

console.log(pockets.pen); //3
console.log(bed.glasses); //1

//Answer the question: is it faster to get glasses as pockets.glasses or head.glasses? Benchmark if needed.

let pastD1 = performance.now();
for(let i = 0; i < 10000000; i++){
    pockets.glasses;
}
console.log(performance.now()-pastD1);

let pastD2 = performance.now();
for(let i = 0; i < 10000000; i++){
    head.glasses;
}
console.log(performance.now()-pastD2) 

// Not conclusive, can't tell.

//ans: In modern engines, performance-wise, there’s no difference whether we take a property from an object or its prototype. They remember where the property was found and reuse it in the next request.

// For instance, for pockets.glasses they remember where they found glasses (in head), and next time will search right there. They are also smart enough to update internal caches if something changes, so that optimization is safe.

//...........................

//task3

//If we call rabbit.eat(), which object receives the full property: animal or rabbit?

let animal1 = {
  eat() {
    this.full = true;
  }
};

let rabbit1 = {
    jumps: true,
  __proto__: animal1
};

rabbit1.eat();

console.log(rabbit1); //{jumps: true, full: true}

//rabbit1 receives the full property

//..................................

//task4

let hamster = {
  eat(food) {
    // this.stomach = [], //instead of individually adding stomach but it would contain only one food.
    this.stomach.push(food);
  }
};

let speedy = {
    stomach : [],
  __proto__: hamster
};

let lazy = {
    stomach : [],
  __proto__: hamster
};

speedy.eat("apple");
console.log( speedy.stomach ); // ['apple']

lazy.eat("garbage");
console.log( lazy.stomach ); // ['garbage']

lazy.eat("banana");
console.log(lazy.stomach) //['garbage', 'banana']

//

// 'use strict';

let hamster1 = {
    // stomach : [],
    eat(food) {
        // if (!this.stomach) { //if hamster1 has stomach property too then again stomach will become shared. so that's why it is better if we use below code:
        if (!this.hasOwnProperty('stomach')) {
            this.stomach = [];
        }

        this.stomach.push(food);
    }
};
    
let speedy1 = {
__proto__: hamster1
};

let lazy1 = {
__proto__: hamster1
};

speedy1.eat("apple");
console.log( speedy1.stomach ); // ['apple']

lazy1.eat("garbage");
console.log( lazy1.stomach ); // ['garbage']

lazy1.eat("banana");
console.log(lazy1.stomach) //['garbage', 'banana']