//tasks

//task1

let dictionary = Object.create(null, {
    toString: {
        value(){
            return Object.keys(this).join()
        }
    }
});

//When we create a property using a descriptor, its flags are false by default. So in the code above, dictionary.toString is non-enumerable.

/*
dictionary.toString = null;

dictionary.toString = function(){
    let tobe = [];
    for(let key in dictionary){
        tobe.push(`${this[key]}`)
    }
    return tobe.join(",")
};



Object.defineProperty(dictionary, "toString", {
    enumerable: false,
})
    */


// your code to add dictionary.toString method

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// only apple and __proto__ are in the loop
for(let key in dictionary) {
  console.log(key); // "apple", then "__proto__"
}

// your toString in action
alert(dictionary); // "apple,__proto__"

//................................

//task2

function Rabbit(name) {
    this.name = name;
}
Rabbit.prototype.sayHi = function() {
    console.log( this.name );
}
Rabbit.prototype.name = "Bunny";

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // Bunny //this = Rabbit.prototype
Object.getPrototypeOf(rabbit).sayHi(); // Bunny //this = Rabbit.prototype
rabbit.__proto__.sayHi();              // Bunny //this = Rabbit.prototype