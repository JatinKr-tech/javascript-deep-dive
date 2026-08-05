//Proxy and Reflect

//A Proxy object wraps another object and intercepts operations, like reading/writing properties and others, optionally handling them on its own, or transparently allowing the object to handle them.

//....................................

//Proxy

let target1 = {};
let proxy1 = new Proxy(target1, {}); //empty handler
//since handler is empty, it means we didn't set any traps

proxy1.someNum = 7;
console.log(proxy1.someNum);
console.log(target1.someNum);

//Note:

//Invariants
//JavaScript enforces some invariants – conditions that must be fulfilled by internal methods and traps.

//Most of them are for return values:

// [[Set]] must return true if the value was written successfully
//[[Delete]] must return true if the value was deleted successfully

//There are some other invariants, like:

// [[GetPrototypeOf]], applied to the proxy object must return the same value as [[GetPrototypeOf]] applied to the proxy object’s target object.

//.........................

//Default value with “get” trap

/*

//get(target, property, receiver)

//target – is the target object,
//property – property name
//receiver – if the target property is a getter, then receiver is the object that’s going to be used as this in its callUsually that’s the proxy object itself

*/

let number1 = [0, 1, 2];

number1 = new Proxy(number1, { //The proxy should totally replace the target object everywhere. No one should ever reference the target object after it got proxied. Otherwise it’s easy to mess up.
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // default value
    }
  }
});

console.log( number1[1] ); // 1
console.log( number1[123] ); // 0 (no such item)

//

let dictionary1 = {
    'Hola' : 'Hi',
    'Adios' : 'Bye'
};

dictionary1 = new Proxy(dictionary1, {
    get(target, prop){
        if (prop in target){
            return target[prop]
        } else {
            return prop
        }
}});

console.log(dictionary1['Hola']);
console.log(dictionary1['Lamile']);

//...............................

//Validation with “set” trap

/**

// set(target, property, value, receiver)

// target – is the target object, the one passed as the first argument to new Proxy,
// property – property name,
// value – property value,
// receiver – similar to get trap, matters only for setter properties.

 */

//The set trap should return true if setting is successful, and false otherwise (triggers TypeError)

let number2 = [];

number2 = new Proxy(number2, {
    set(target, prop, value){
        if (typeof value == 'number') {
            target[prop] = value;
            return true;
        } else {
            return false;
        }
    }
});

number2.push(1);
number2.push(2);
number2.push(2342);
console.log(number2); //{0: 1, 1: 2, 2: 2342}
// number2.push('test'); //Uncaught TypeError

console.log(number1.__proto__ == Array.prototype); //true

//..............................

//Iteration with “ownKeys” and “getOwnPropertyDescriptor”

//In the example below we use ownKeys trap to make for..in loop over user1, and also Object.keys and Object.values, to skip properties starting with an underscore _:

let user1 = {
    name: "John",
    age: 30,
    _password: "***"
};

user1 = new Proxy(user1, {
    ownKeys(target){
        return Object.keys(target).filter(key => !key.startsWith('_'))
    }
});

console.log(Object.keys(user1)); //['name', 'age']
console.log(Object.values(user1)); //['John', 30]
for(let key in user1) console.log(key); //name //age

//if we return a key that doesn’t exist in the object, Object.keys won’t list it:

let user2 = {};

user2 = new Proxy(user2, {
    ownKeys(target){
        return ['a', 'b', 'c'];
    }
})

console.log(Object.keys(user2)); //[] //empty

//

let user3 = {};

user3 = new Proxy(user3, {
    ownKeys(target){
        return ['a', 'b', 'c'];
    },
    getOwnPropertyDescriptor(target, prop) {
        return {
            enumerable : true,
            configurable : true
        }
    }
});

console.log(Object.keys(user3)); //['a', 'b', 'c']

//...................................

//Protected properties with “deleteProperty” and other traps

//we don't want internal properties starting with '_' to be accessed from outside, below is the example how by using proxy we will prevent it's accissability from outside.

//We’ll need the traps:

// get to throw an error when reading such property,
// set to throw an error when writing,
// deleteProperty to throw an error when deleting,
// ownKeys to exclude properties starting with _ from for..in and methods like Object.keys.

let user4 = {
    name: "John",
    _password: "***",
    checkPassword(value) {
    // object method must be able to read _password
    return value === this._password;
  }
};

user4 = new Proxy(user4, {
    get(target, prop){
        if(prop.startsWith('_')){
            throw new Error("You can't access internal property");
        };
        //we gotta be able to access '_password' property through object method
        let value = target[prop];
        return (typeof value === 'function')? value.bind(target) : value;
    },
    set(target, prop, val){
        if(prop.startsWith('_')){
            throw new Error("You can't access internal property");
        } else {
            target[prop] = val;
            return true;
        };
    },
    deleteProperty(target, prop){
        if(prop.startsWith('_')){
            throw new Error("You can't access internal property");
        } else {
            delete target[prop];
            return true;
        }
    },
    ownKeys(target){
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
});

try {
    console.log(user4.name);
} catch (error) {
    console.log(error.message)
};
//John

try {
    console.log(user4._password);
} catch (error) {
    console.log(error.message)
};
//You can't access internal property

try {
    user4._userID = 'xyz';
} catch (error) {
    console.log(error.message)
};
//You can't access internal property

try {
    user4.age = 19;
    console.log(user4.age)
} catch (error) {
    console.log(error.message)
};
//19

try {
    delete user4._password
} catch (error) {
    console.log(error.message)
};
//You can't access internal property

try {
    delete user4.age
    console.log(user4)
} catch (error) {
    console.log(error.message)
};
//Proxy(Object) {name: 'John', _password: '***'}

for(let key in user4) console.log(key);
//name

//........................................

//“In range” with “has” trap

let range1 = {
  start: 1,
  end: 10
};

range1 = new Proxy(range1, {
    has(target, prop){
        return prop >= target.start && prop <= target.end;
    }
});

console.log(1 in range1); //true
console.log(10 in range1); //true
console.log(6 in range1); //true
console.log(1029 in range1); //false

//.........................

//Wrapping functions: "apply"

//We can wrap a proxy around a function as well.

// The apply(target, thisArg, args) trap handles calling a proxy as function:

// target : is the target object (function is an object in JavaScript),
// thisArg : is the value of this.
// args : is a list of arguments.

//Prev example from decorators chapter:

function delay1(f, ms){
    return function(){
        setTimeout(() => f.apply(this, arguments), ms);
    };
};

function sayHi1(user) {
    console.log(`Hello ${user}!`);
};

console.log(sayHi1.length); //1 //parameters expected by the function is the length

sayHi1 = delay1(sayHi1, 500);
sayHi1('Smith');

console.log(sayHi1.length); //0 //parameters expected by the function is the length

//The same example but instead using Proxy

function delay2(f, ms){
    return new Proxy(f, {
        apply(target, thisArg, args){
            setTimeout(() => target.apply(thisArg, args), ms);
        }
    })
};

function sayHi2(user) {
    console.log(`Hello ${user}!`);
};

console.log(sayHi2.length); //1

sayHi2 = delay2(sayHi2, 1000);
sayHi2('Erwin');

console.log(sayHi2.length); //1

//.....................................

//Reflect

//Reflect is a built-in object that simplifies creation of Proxy.

//obj[prop]	    Reflect.get(obj, prop)	    [[Get]] 
//obj[prop] = value	    Reflect.set(obj, prop, value)	    [[Set]]
//delete obj[prop]	    Reflect.deleteProperty(obj, prop)	    [[Delete]]
//new F(value)	    Reflect.construct(F, value)	    [[Construct]]

let user5 = {};

Reflect.set(user5, 'name', 'John');

console.log(user5.name); // John

//For every internal method, trappable by Proxy, there’s a corresponding method in Reflect, with the same name and arguments as the Proxy trap.

//
let user6 = {
  name: "John",
};

user6 = new Proxy(user6, {
  get(target, prop, receiver) {
    console.log(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    console.log(`SET ${prop} = ${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user6.name; // shows "GET name"
user6.name = "Pete"; // shows "SET name=Pete"

//Here:
// Reflect.get reads an object property.
// Reflect.set writes an object property and returns true if successful, false otherwise.

//Reflect.get could be replaced by target[prop] too but there are some nuances

//

//Proxying a getter

let user7 = {
    _name : 'guest',
    get name(){
        return this._name
    }
};

let user7proxy = new Proxy(user7, {
    get(target, prop, receiver){
        return target[prop]
    }
});

let admin1 = {
    __proto__ : user7proxy,
    _name : 'Admin'
}
console.log(admin1.name); //guest

let user7proxy2 = new Proxy(user7, {
    get(target, prop, receiver){
        return Reflect.get(...arguments)
    }
});

let admin2 = {
    __proto__ : user7proxy2,
    _name : 'Admin2'
}
console.log(admin2.name); //Admin2

//...............................

//Proxy limitations

//

//Built-in objects: Internal slots

//Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called “internal slots”.

//These are like properties, but reserved for internal, specification-only purposes. For instance, Map stores items in the internal slot [[MapData]]. Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.

/*
let map1 = new Map();

let proxy2 = new Proxy(map1, {});

proxy2.set('test', 1); // Error
*/

//Internally, a Map stores all data in its [[MapData]] internal slot. The proxy doesn’t have such a slot. The built-in method Map.prototype.set method tries to access the internal property this.[[MapData]], but because this=proxy, can’t find it in proxy and just fails.

// Fortunately, there’s a way to fix it:

let map2 = new Map();

let proxy3 = new Proxy(map2, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy3.set('test', 1);
console.log(proxy3.get('test')); // 1 (works!)

//it works fine, because get trap binds function properties, such as map.set, to the target object (map2) itself.

//here the value of 'this' is not proxy3 but map2

//Note:

//Array has no internal slots
//So there’s no such problem when proxying an array.

//

//Private fields

class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user8 = new User();
console.log(user8.getName()); //Guest

user8 = new Proxy(user8, {});
// console.log(user8.getName()); //Uncaught TypeError: Cannot read private member #name....

//Reason: private fields are implemented using internal slots. JavaScript does not use [[Get]]/[[Set]] when accessing them

let user9 = new User();
console.log(user9.getName()); //Guest

user9 = new Proxy(user9, {
    get(target, prop, receiver){
        let value = Reflect.get(...arguments);
        return (typeof value === 'function')? value.bind(target) : value;
    }
});

console.log(user9.getName()); //Guest

//the solution has drawbacks, as explained previously: it exposes the original object to the method, potentially allowing it to be passed further and breaking other proxied functionality.

//

//Proxy != target

let allUsers = new Set();

class User2 {
    constructor(x){
        this.name = x;
        allUsers.add(this)
    }
};

let user11 = new User2('Steven');
console.log(allUsers);
console.log(allUsers.has(user11)); //true

user11 = new Proxy(user11, {});
console.log(allUsers.has(user11)); //false

//set is pointing to the original class in the memory, it is not pointing to the user variable which have become proxy since we modified it, so that's why we get logged false in the console

//Note: Proxies can’t intercept a strict equality test ===

//Summary for: Proxies have some limitations:

// Built-in objects have “internal slots”, access to those can’t be proxied. See the workaround above.
// The same holds true for private class fields, as they are internally implemented using slots. So proxied method calls must have the target object as this to access them.
// Object equality tests === can’t be intercepted.

//.......................................

//Revocable proxies

//A revocable proxy is a proxy that can be disabled.

/*
let object1 = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object1, {});

// pass the proxy somewhere instead of object1...
console.log(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
// console.log(proxy.data); // Error
*/

let revokes = new WeakMap();

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..somewhere else in our code..
revoke = revokes.get(proxy);
// revoke();

console.log(proxy.data); // Error (revoked)

//Here we are using weakMap because it won’t block garbage collection