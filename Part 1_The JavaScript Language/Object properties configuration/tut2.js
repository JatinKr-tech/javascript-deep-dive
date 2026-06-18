//Property getters and setters

//There are two kinds of object properties.

//regular Data properties
//accessor property. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.


//Getters and setters

let obj1 = {
    name: "Jatin",
    surname: "Kumar",

    get fullName(){
        return `${this.name} ${this.surname}`;
    },

    set fullName(value){
        [this.name, this.surname] = value.split(" "); 
    }
};

// console.log(obj1.fullName()) //TypeError: obj1.fullName is not a function

console.log(obj1); //{name: 'Jatin', surname: 'Kumar'}

console.log(obj1.fullName); //Jatin Kumar

console.log(obj1.name, obj1.surname); //Jatin Kumar
obj1.fullName = "Steve Rogers";

console.log(obj1.name, obj1.surname); //Steve //Rogers
console.log(obj1.fullName); //Steve Rogers

console.log(obj1); //{name: 'Steve', surname: 'Rogers'}

// fullName is a virtual property, which is readable with get and writable with set.

console.log(Object.getOwnPropertyDescriptor(obj1, "fullName")); //{enumerable: true, configurable: true, get: ƒ, set: ƒ}


//..............................

//Accessor descriptors

//Accessor properties may have these descriptors:

// get – a function without arguments, that works when a property is read,
// set – a function with one argument, that is called when the property is set,
// enumerable – same as for data properties,
// configurable – same as for data properties.

//Note: Accessor descriptors don't have value or writable flags(descriptor).

let obj2 = {
    name: "Peter",
    surname: "Parker"
};

Object.defineProperty(obj2, "fullName", {
    get(){
        return `${this.name} ${this.surname}`
    },
    set(value){
        [this.name, this.surname] = value.split(" ");
    },
    enumerable: true
})

console.log(Object.getOwnPropertyDescriptor(obj2, "fullName"))

console.log(obj2); //{name: 'Peter', surname: 'Parker'}
console.log(obj2.fullName); //Peter Parker
console.log(obj2.fullName = "Robin Hood"); //Robin Hood
console.log(obj2); //{name: 'Robin', surname: 'Hood'}
console.log(obj2.fullName); //Robin Hood

for(let key in obj2){
    console.log(key); //name //surname //fullName (why? because we changed flag, enumerable: true)
};

// Please note that a property can be either an accessor (has get/set methods) or a data property (has a value), not both.

// If we try to supply both get and value in the same descriptor, there will be an error:

// Error: Invalid property descriptor.
/*
Object.defineProperty({}, 'prop', {
    get() {
        return 1
    },
    value: 2
});
*/

//.............................

//Smarter getters/setters

let obj3 = {
    get name(){
        return this._name;
    },
    set name(value){
        if(value.length < 3) {
            console.log("Naaaah");
            return this._name = "placeholder";
        }    
        this._name = value;
    }
};

// obj3.name = "";
obj3.name = "Rathod";
console.log(obj3.name); //Rathod
console.log(obj3._name); //Rathod //We can access through _name too But: 
// there is a widely known convention that properties starting with an underscore "_" are internal and should not be touched from outside the object.

//...................................

//Using for compatibility

function userConstructor(name, birthday){
    this.name = name;
    this.birthday = birthday;
    let givenAge;

    Object.defineProperty(this, "age", {
        get(){
            if(givenAge){
                return givenAge;
            }

            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        },
        set(value){
            return givenAge = value;
        }
    });
};

let Jatin = new userConstructor("Jatin", new Date(2007, 0, 31));
console.log(Jatin.age); //19
console.log(Jatin) //userConstructor {name: 'Jatin', birthday: Wed Jan 31 2007 00:00:00 GMT+0530 (India Standard Time)}

Jatin.age = 23;
console.log(Jatin.age); //23









