let anobj1 = {
    number : 7,
};

let anobj2 = {
    number : 3,
};

console.log(anobj1 - anobj2) //NaN
console.log(anobj1 + anobj2) //[object Object][object Object]

//Now we learn about how Object conversion works in Javascript!!

//Link: https://gemini.google.com/share/bd9498c9c2d2

// What is this hint? It is the demand from our side and JavaScript interprets what we demand and segregrate them into three categories:
//1. String, 2. Number 3.Default
//We use [Symbol.toPrimitive](hint/whatever) to get that demand and convert our obj to a primitive according to our demand.

//facts: An empty or non-empty object are truethy boolean.
//facts: Symbol.toPrimitive is a symbol!! 
//the way we can explain Symbol.toPrimitive is that it is like a factory which contains a machine which converts object to primitive according to our demand.

let obj = {
    amount : 500,
    "amount in words" : "Five Hundred",
    [Symbol.toPrimitive] (hint) {
        // if (hint === "string") {
        //     return `amount in words : ${this["amount in words"]}`
        // } 
        // return this.amount;

        return (hint === "String")? `amount in words : ${this["amount in words"]}` : this.amount;
    }
};

console.log(obj); //gave us object
// alert(obj); //amount in words : Five Hundred
console.log(+obj); //500
console.log(obj + 500) //1000
console.log(obj + " Rupees"); //500 Rupees
console.log("Now announcing the " + String(obj) + " Rupees"); //Now announcing the amount in words : Five Hundred Rupees

//Old way to do the conversion:
let objTwo = {
    name : "Thanos",
    age : 300,

    //hint : "string"
    toString() {
        return `name : ${this.name}`;
    },

    //hint : number
    valueOf() {
        return this.age;
    },
}

console.log(objTwo);
console.log(+objTwo);
// alert(objTwo);

console.log(+obj > +objTwo) //True 

console.log(obj.toString()) //Since there is no special method(function) named toString in obj we get //[object Object]
console.log(obj.valueOf()) //Since there is no special method(function) named valueof in obj we get //whole object obj

console.log(obj[Symbol.toPrimitive]("string")); //500
console.log(objTwo[Symbol.toPrimitive]("string")); //error //Since no such special symbol exist (we didn't write it) in objTwo

