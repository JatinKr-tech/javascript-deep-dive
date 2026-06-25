//Private and protected properties and methods

//Internal and external interface

//In JavaScript, there are two types of object fields (properties and methods):

// Public: accessible from anywhere. They comprise the external interface. Until now we were only using public properties and methods.
// Private: accessible only from inside the class. These are for the internal interface.

//In many other languages there also exist “protected” fields: accessible only from inside the class and those extending it (like private, but plus access from inheriting classes). They are also useful for the internal interface. They are in a sense more widespread than private ones, because we usually want inheriting classes to gain access to them.

// Protected fields are not implemented in JavaScript on the language level, but in practice they are very convenient, so they are emulated.

//.....................Let's make a coffee machine

//Protecting “waterAmount”

//Protected properties are usually prefixed with an underscore _.

// That is not enforced on the language level, but there’s a well-known convention between programmers that such properties and methods should not be accessed from the outside.

class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10

//.........................

//Read-only “power”

class CoffeeMachine2 {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}


// create the coffee machine
let coffeeMachine2 = new CoffeeMachine2(100);

console.log(`Power is: ${coffeeMachine2.power}W`); // Power is: 100W

coffeeMachine2.power = 25; // Error (no setter), or this code completely ignored by v8 

console.log(`Power is: ${coffeeMachine2.power}W`); // Power is: 100W

//note:

//Getter/setter functions
// Here we used getter/setter syntax.

// But most of the time get.../set... functions are preferred, like this:

class CoffeeMachine3 {
  _waterAmount = 0;

  setWaterAmount(value) {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  getWaterAmount() {
    return this._waterAmount;
  }
}

new CoffeeMachine3().setWaterAmount(100);
// That looks a bit longer, but functions are more flexible. They can accept multiple arguments (even if we don’t need them right now).

//note:

//Protected fields are inherited
// If we inherit class MegaMachine extends CoffeeMachine, then nothing prevents us from accessing this._waterAmount or this._power from the methods of the new class.

// So protected fields are naturally inheritable. Unlike private ones that we’ll see below.

//.........................................

//Private “#waterLimit”

//A recent addition
// This is a recent addition to the language. Not supported in JavaScript engines, or supported partially yet, requires polyfilling.

class CoffeeMachine4 {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
    return value;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
    console.log(this.#waterLimit);
  }

}

let coffeeMachine4 = new CoffeeMachine4();


// can't access privates from outside of the class
// coffeeMachine4.#fixWaterAmount(123); // Error
// coffeeMachine4.#waterLimit = 1000; // Error

// coffeeMachine4.setWaterAmount(-12); //0
// coffeeMachine4.setWaterAmount(222); //200
coffeeMachine4.setWaterAmount(123); //123

//On the language level, # is a special sign that the field is private. We can’t access it from outside or from inheriting classes.

// Private fields do not conflict with public ones. We can have both private #waterAmount and public waterAmount fields at the same time.

// For instance, let’s make waterAmount an accessor for #waterAmount:

class CoffeeMachine5 {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }

  getter(){
    console.log(this.#waterAmount);
  }
}

let machine5 = new CoffeeMachine5();

machine5.waterAmount = 100;
console.log(machine5.waterAmount);
console.log(machine5); //{#waterAmount: 100, waterAmount: (...)}
// console.log(machine5.#waterAmount); // Error

//but

//if we inherit from CoffeeMachine, then we’ll have no direct access to #waterAmount. We’ll need to rely on waterAmount getter/setter:

class MegaCoffeeMachine5 extends CoffeeMachine5 {
    func1(){
        // console.log(this.#waterAmount)
    }
    func2(){
        
        console.log(this.waterAmount)
    }
}

let megaCoffeeMachine5 = new MegaCoffeeMachine5();
megaCoffeeMachine5.func2() //0
megaCoffeeMachine5.waterAmount = 100;
megaCoffeeMachine5.func2() //100

//In many scenarios such limitation is too severe. If we extend a CoffeeMachine, we may have legitimate reasons to access its internals.
//because of the above reason, protected fields are used more than private one's 

//note:

//Private fields are not available as this[name]

class User {
  constructor() {
    this.name = "Anonymous"
}
#name = "Jatin";
  sayHi() {
    let fieldName = "name";
    console.log(`Hi, ${this[fieldName]}`); //Hello, Anonymous
  }
  sayWelcome(){
    let fieldName = "#name";
    console.log(this.#name); //Jatin
    console.log(`Welcome, ${this[fieldName]}`); //Hello, undefined
  }
}

let user = new User();
user.sayHi();
user.sayWelcome();

//With private fields that’s impossible: this['#name'] doesn’t work. That’s a syntax limitation to ensure privacy.

//Summary

//In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.

//It gives the following benefits:

// Protection for users, so that they don’t shoot themselves in the foot
// Imagine, there’s a team of developers using a coffee machine. It was made by the “Best CoffeeMachine” company, and works fine, but a protective cover was removed. So the internal interface is exposed.

// All developers are civilized – they use the coffee machine as intended. But one of them, John, decided that he’s the smartest one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.

// That’s surely not John’s fault, but rather the person who removed the protective cover and let John do his manipulations.

// The same in programming. If a user of a class will change things not intended to be changed from the outside – the consequences are unpredictable.

// Supportable
// The situation in programming is more complex than with a real-life coffee machine, because we don’t just buy it once. The code constantly undergoes development and improvement.

// If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users.

// If you’re a developer of such class, it’s great to know that private methods can be safely renamed, their parameters can be changed, and even removed, because no external code depends on them.

// For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external interface is the same.

// Hiding complexity
// People adore using things that are simple. At least from outside. What’s inside is a different thing.

// Programmers are not an exception.

// It’s always convenient when implementation details are hidden, and a simple, well-documented external interface is available.

// To hide an internal interface we use either protected or private properties:

// Protected fields start with _. That’s a well-known convention, not enforced at the language level. Programmers should only access a field starting with _ from its class and classes inheriting from it.
// Private fields start with #. JavaScript makes sure we can only access those from inside the class.
// Right now, private fields are not well-supported among browsers, but can be polyfilled.