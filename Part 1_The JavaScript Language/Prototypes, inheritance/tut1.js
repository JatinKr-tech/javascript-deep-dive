//Prototypal inheritance

// [[Prototype]]
// In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object. That object (being referenced) is called “a prototype”:

//When we read a property from object, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”.

//The property [[Prototype]] is internal and hidden, but there are many ways to set it.

let animal = {
    eats: true,
    breaths: "oxygen",
    entropy(){
        console.log("spreads entropy");
    }
};

let harbibours = {
    eats: "Grass",
    color: "N/A",
    lives(){
        console.log("harbibours lives on land")
    }
};

harbibours.__proto__ = animal;

let rabbit = {
    color: "White",
    spciality: "Jump"
};

rabbit.__proto__ = harbibours; //rabbit.[[Prototype]] = harbibours;

console.log(harbibours);
console.log(rabbit);

console.log(rabbit.color);
console.log(rabbit.eats); //Grass //search doesn't go in animal.

//rabiit.eats is an inherited property.

//Here we can say that “harbibours is the prototype of rabbit” or “rabbit prototypically inherits from harbibours".

rabbit.lives(); //harbibours live on land //The method is automatically taken from the prototype

console.log(rabbit.breaths); //oxygen
rabbit.entropy(); //spreads entropy

let bunny = {
    "what is it?": "English synonym for rabbit",
    "used": "Plushy",
    __proto__: rabbit,

};

console.log(bunny.used); //Plushy
console.log(bunny.eats); //Grass
bunny.entropy(); //spreads entropy

// animal.__proto__ = bunny; //TypeError: Cyclic __proto__ value

// There are only two limitations:

// The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
// The value of __proto__ can be either an object or null. Other types are ignored.


// Also it may be obvious, but still: there can be only one [[Prototype]]. An object may not inherit from two others.


//Important:

/*
// __proto__ is a historical getter/setter for [[Prototype]]
// It’s a common mistake of novice developers not to know the difference between these two.

// Please note that __proto__ is not the same as the internal [[Prototype]] property. It’s a getter/setter for [[Prototype]]. Later we’ll see situations where it matters, for now let’s just keep it in mind, as we build our understanding of JavaScript language.

// The __proto__ property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use Object.getPrototypeOf/Object.setPrototypeOf functions instead that get/set the prototype. We’ll also cover these functions later.

// By the specification, __proto__ must only be supported by browsers. In fact though, all environments including server-side support __proto__, so we’re quite safe using it.

// As the __proto__ notation is a bit more intuitively obvious, we use it in the examples.
*/

//........................................

//Writing doesn’t use prototype

//We have already seen this how rabbit.color equals white and not N/A, and how rabbit.eats equals Grass instead of true, (works like how scope search searches variable, "chain" walk")

let user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};
let admin = {
    // name: "Ronald",
    // surname: "Hino",
    isAdmin: true,
    __proto__: user
};

console.log(admin.fullName); //Ronald Hino, when name and surname uncommented //John Smith //getter was called

admin.fullName = "Victor Von Doom";
console.log(admin.fullName); //Victor Von //setter was called
console.log(user.fullName); //John Smith

console.log(admin);

//The value of “this”

//So getter and setter are somewhere in memory and since we know that 'this' is evaluated when function/method is called in case of function/method, here too 'this' inside getter or setter is evaluated when either of them are called (call time), when admin.fullName is called, this inside getter or setter references admin. 

//One liner: 
//objects methods are shared, but the object state (individual data property) is not.

//.......................................

//for…in loop

let obj1 = {
    company: "Ford"
};

let obj2 = {
    name: "Krishna",
    age: 25,
    __proto__: obj1
};

console.log(Object.keys(obj2)); //['name', 'age']

for(let key in obj2){
    console.log(key); //name, age, company
};

// obj.hasOwnProperty(key): it returns true if obj has its own (not inherited) property named key.

//so we can filter out inherited properties

for(let key in obj2){
    let isOwn = obj2.hasOwnProperty(key);

    if(isOwn) console.log(key); //name, age
};

//where .hasOwnProperty method is coming from? it is being inherited from Object.prototype
//why it is not showing in for..in loop? because it's enumerable flag is set to false.


//Note: Almost all other key/value-getting methods (ex: Object.keys, Object.values) ignore inherited properties

//Note: Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).




