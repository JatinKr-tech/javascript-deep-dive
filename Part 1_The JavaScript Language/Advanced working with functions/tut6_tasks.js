"use strict";

function makeCounter() {
    let count = 0;
    function counter() {
        return ++count;
    };
    counter.set = (value)=>{count = value; return count;};
    counter.decrease = ()=>{return --count;};
    return counter;
};

let counter = makeCounter();


console.log(counter());
console.log(counter());
console.log(counter());
// console.log(makeCounter.count)

console.log(counter.set(69))
// console.log(makeCounter.count);
console.log(counter());
console.log(counter());
console.log(counter.decrease())
console.log(counter.decrease())
console.log(counter.decrease())
console.log(counter());

//without relying on scope search:

function makeCounter2() {
    function func() {
        return ++func.count;
    };
    func.count = 0;
    func.set = (value)=>{return func.count = value;};
    func.decrease = ()=>{return --(func.count);};
    return func;
};

let counter2 = makeCounter2();

console.log(counter2()); //1
console.log(counter2()); //2
console.log(counter2()); //3
console.log(counter2.set(30)); //30
console.log(counter2.decrease()); //29
console.log(counter2.decrease()); //28
console.log(counter2.decrease()); //27
console.log(counter2()); //28

//task2

function sum(a) {
    let currentSum = a
    function f(b) {
        currentSum += b;
        return f;
    };
    f.valueOf = function(){
        return currentSum;
    }
    return f;

}; 
console.log(+sum(2)(3)); //5
console.log(+sum(2)(3)(4)); //9
console.log(+sum(2)(3)(4)(5)(6)(7)(8)); //35
