//tasks

//task1

let user = {
  name: "John",
  years: 30
};

let{name, years: age, isAdmin = false} = user;

console.log( name ); // John
console.log( age ); // 30
console.log( isAdmin ); // false

//task2

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
/*
function topearner(obj = {}) {
    let topearner = null;
    let top = 0;

    for(keys of Object.keys(obj)){
        let current = obj[keys];
        if(top < current){
            top = current;
            topearner = keys;
        };
    };
    return topearner;
};
*/
/*
function topearner(obj = {}) {
    let topearner = null;
    let top = 0;

    for(items of Object.entries(obj)){
        let current = items[1];
        if(top < current){
            top = current;
            topearner = items[0];
        };
    };
    return topearner;
};
*/
function topearner(obj = {}) {
    let topearner = null;
    let top = 0;

    for(let[name, salary] of Object.entries(obj)){
        let current = salary;
        if(top < current){
            top = current;
            topearner = name;
        };
    };
    return topearner;
};
/*
function topearner(salaries) {
return Object.keys(salaries).reduce((max, s) => salaries[max] > salaries[s] ? max : s)
};
*/

console.log(topearner(salaries));
// console.log(topearner());