//F.prototype

let livin = {
    breaths: true
};

let animal = {
    eats: true,

};


function func(name){
    this.name = name;
    // this.prototype = animal; //it literally creates a property named prototype.
};
func.prototype = animal; //__proto__ = animal

let rabbit = new func("white bunny");

console.log(rabbit);
console.log(rabbit.eats); //true

//Setting func.prototype = animal literally states the following: “When a new Rabbit is created, assign its [[Prototype]] to animal”.

func.prototype = livin;

let rabbit2 = new func("brown bunny")

console.log(rabbit.breaths); //undefined
console.log(rabbit2.breaths); //true

//Note: 

//F.prototype property is only used when new F is called, it assigns [[Prototype]] of the new object.

// If, after the creation, F.prototype property changes (F.prototype = <another object>), then new objects created by new F will have another object as [[Prototype]], but already existing objects keep the old one.

//.............................

//Default F.prototype, constructor property

let Apex = {
    predetor: "Elite"
}

function tigerFunc(name) {
    this.name = name;
};

console.log(tigerFunc.prototype); //object containing constructor
console.log(tigerFunc.prototype.constructor); //tigerFunc

let tiger1 = new tigerFunc("Rambo");

console.log(tiger1.prototype); //undefined
console.log(tiger1.constructor); //tigerFunc, //chain search
console.log(tiger1.constructor === tigerFunc); //true

console.log(tiger1); //tigerFunc {name: 'Rambo'}

//every function has prototype property, which points to an object in memory containing constructor property whose value is that function itself.

//So when we use a function as a constructor function and creates a new object (pointed by lets say obj) it's [[Prototype]] points to the exact same object which prototype property of the constructor function points. So that's why when we try to access obj.constructor we get that constructor function's syntax (chain search into another object pointed by [[Prototype]]) which could be used again as constructor function, 

//But we can change what [[Prototype]] of obj points so keep that in mind. If we change what [[Prototype]] of obj points than it is very obvious that we will lose that particular object which contains constructor property whose value is constructor function's syntax


tigerFunc.prototype = {
    constructor : tigerFunc,
    "Eye Zoom": "100x"
};

let tiger2 = new tiger1.constructor("Cairo");

console.log(tiger2); //tigerFunc {name: 'Cairo'}
console.log(tiger2.constructor === tigerFunc); //true


console.log(tiger2["Eye Zoom"]); //100x

tigerFunc.prototype = Apex;

// let tiger3 = new tiger1.constructor("Raja");
let tiger3 = new tiger2.constructor("Raja");

console.log(tiger3); //tigerFunc {name: 'Raja'}
console.log(tiger3.constructor); //Object() { [native code] }
console.log(tiger3.constructor === tigerFunc); //false
console.log(tiger3.predetor); //Elite

//note: 

//The value of F.prototype should be either an object or null: other values won’t work.

//On regular objects the prototype property is completely separate and is like a normal, generic property, don't confuse with hidden internal property '[[Prototype]]'!!
