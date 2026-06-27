//Mixins    

//As defined in Wikipedia, a mixin is a class containing methods that can be used by other classes without a need to inherit from it.

//................................

//A mixin example

// The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.

// mixin
let sayHiMixin = {
    sayHi() {
        console.log(`Hello ${this.name}`);
    },
    sayBye() {
        console.log(`Bye ${this.name}`);
    }
};

// usage:
class User {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!

//
//could do this too:

/**
class User extends Person {
    // ...
}

Object.assign(User.prototype, sayHiMixin);
 */

//
//Mixins can make use of inheritance inside themselves.

let sayMixin = {
    say(phrase){
        console.log(phrase);
    }
}

let greetingsMixin = {
    __proto__: sayMixin,
    welcome(){      //[[HomeObject]] = greetingsMixin
        super.say(`Welcome ${this.name}!`);
    },
    sayHi(){        //[[HomeObject]] = greetingsMixin
        super.say(`Hi ${this.name}`);
    }
};

class User2 {
    constructor(name) {
        this.name = name;
    }
};

Object.assign(User2.prototype, greetingsMixin);

let user2 = new User2('Jatin');
user2.welcome(); //Welcome Jatin!
user2.sayHi(); //Hi Jatin

//despite the methods of greetingsMixin being copied into User2.prototype, those methods [[HomeObject]] is still greetingsMixin and not the class User2.

//[[HomeObject]].__proto__.method.call(this)

//if you don't understand it then look for tut2.js 'Class inheritance' lesson file, it has detailed explanation.

//................................

//EventMixin

`use strict`;

let eventMixin = {
    on(eventName, handler){
        if(!this._eventHandlers) {
            this._eventHandlers = {}
        };
        if(!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        };
        this._eventHandlers[eventName].push(handler);
    },

    off(eventName, handler){
        let handlers = this._eventHandlers[eventName];
        if(!this._eventHandlers) return;
        if(!handlers) return;
        for(let i = 0; i < handlers.length; i++){
            if(handlers[i] === handler){
                [handlers[i], handlers[handlers.length - 1]] = [handlers[handlers.length - 1], handlers[i]];
                handlers.pop();
                // handlers.splice(i--, 1);
            } 
        }
    },

    trigger(eventName, ...args){
        let handlers = this._eventHandlers[eventName];
        console.log(this); //{name: 'jatin', _eventHandlers: {…}}
        if(handlers){
            handlers.forEach(handler=> handler.apply(this, args));
            return;
        }
        console.log('sry')
    }
}

class Menu {
    name = 'jatin';
    choose(value){
        this.trigger('select', value)
    }
};

Object.assign(Menu.prototype, eventMixin);

let menu = new Menu()

let h1 = value => console.log(`you have selected value: ${value}`);
let h2 = value => console.log(`you have selected value2: ${value}`);

menu.on('select', h1);
menu.on('select', h1);
menu.on('select', h2);

menu.choose("123");
//you have selected value: 123
//you have selected value: 123
//you have selected value2: 123

menu.off('select', h1);

menu.choose('1234');
//you have selected value2: 1234

//eventMixin, on, off, trigger, is a classic Leetcode medium problem.