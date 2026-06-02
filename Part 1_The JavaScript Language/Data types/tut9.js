// Object.keys, values, entries

//Object.keys(obj) – returns an array of keys.
// Object.values(obj) – returns an array of values.
// Object.entries(obj) – returns an array of [key, value] pairs.


let john = {
    name: "John",
    age: 21,
    "entry": true 
}

let someSymbol = Symbol("id");
john[someSymbol] = "AJPK321";
let someSymbol2 = Symbol("Employee");
john[someSymbol2] = false;


console.log(Object.keys(john)); //['name', 'age', 'entry']
console.log(Object.values(john)); //['John', 21, true]
console.log(Object.entries(john)); //[['name', 'John'], ['age', 21], ['entry', true]]

for(keys of Object.keys(john)){
    console.log(keys);
};

//Note: Object.keys/values/entries ignore symbolic properties
//to get symbols use Object.getOwnPropertySymbols and  Reflect.ownKeys(obj) 

for(onlySymbols of Object.getOwnPropertySymbols(john)){
    console.log(onlySymbols);
}

for(allkeys of Reflect.ownKeys(john)){
    console.log(allkeys); //all keys including symbols 
}

//Transforming objects
//we get to use vast amounts of Array methods

let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let xyz = Object.entries(prices);
let updatedxyz = xyz.map((item) => [item[0], item[1]*2]);
console.log(updatedxyz); //[['banana', 2], ['orange', 4], ['meat', 8]]

let updatedPrices = Object.fromEntries(updatedxyz);
console.log(updatedPrices); //{banana: 2, orange: 4, meat: 8}

