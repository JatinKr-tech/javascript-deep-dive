//Decorators and forwarding, call/apply

//Transparent caching

function cachingDecorator(func){
    
    let cache = new Map();

    return function(a){
        if(cache.has(a)){
            return `${cache.get(a)}, just cached`;
        }
        let value = func(a);
        cache.set(a, value);
        return `${value}, just calculated`;
    };
};


function slow1(x){
    return (`${x} to the power ${x} is ${x**x}`)
}

function slow2(x){
    return `2 to the power ${x} is ${2**x}`
}

slow1 = cachingDecorator(slow1);
console.log(slow1(4)); //4 to the power 4 is 256, just calculated
console.log(slow1(4)); //4 to the power 4 is 256, just cached

console.log(slow1(8)); //8 to the power 8 is 16777216, just calculated
console.log(slow1(8)); //8 to the power 8 is 16777216, just cached

slow2 = cachingDecorator(slow2);
console.log(slow2(4)); //2 to the power 4 is 16, just calculated
console.log(slow2(4)); //2 to the power 4 is 16, just cached

//.............................

//Using “func.call” for the context

let worker = {
    someMethod(){
        return 2;
    },
    slow3(x){
        return `200% of ${x} is ${this.someMethod() * x}`
    }
}

console.log(worker.slow3(3)); //6, works

// worker.slow3 = cachingDecorator(worker.slow3)

// console.log(worker.slow3(2)); //'TypeError: this.someMethod is not a function' Why? because, even if there was someMethod() named function inside the inner function it would have still given us TypeError because that inner function is not a constructor function. 

//similar error here too:
/**
let func = worker.slow;
func(2);
 */

//How do we fix it???

//There’s a special built-in function method func.call(context, …args) that allows to call a function explicitly setting this.

/**
func(1, 2, 3);
func.call(obj, 1, 2, 3) //we provide obj which will be referenced by 'this'
 */

function sayHello(phrase){
    console.log(this.name, ":", phrase);
};

let obj1 = {name: "Jatin"};
let obj2 = {name: "Naruto"};

sayHello.call(obj1, "Hello"); //Jatin Hello
sayHello.call(obj2, "Konichiwa"); //Naruto Konichiwa

//

function cachingDecorator2(func){
    
    let cache = new Map();

    return function(a){
        if(cache.has(a)){
            return `${cache.get(a)}, just cached`;
        }
        let value = func.call(this, a);
        cache.set(a, value);
        return `${value}, just calculated`;
    };
};

worker.slow3 = cachingDecorator2(worker.slow3);

console.log(worker.slow3(2)); //200% of 2 is 4, just calculated
console.log(worker.slow3(2)); //200% of 2 is 4, just cached

//............................

//Going multi-argument

function cachingDecorator3(func, hash){
    
    let cache = new Map();

    return function(){

        let key = hash(arguments);

        if(cache.has(key)){
            return `${cache.get(key)}, just cached`;
        }
        let value = func.call(this, ...arguments);
        cache.set(key, value);
        return `${value}, just calculated`;
    };

};

function hash(arg){
    return `arg[0] "," arg[1]`;
}

let worker2 = {
    someMethod(){
        return 2;
    },
    slow5(x, y){
        return `(${x} + ${y}) whole square is: ${x**2 + y**2 + 2*x*y} from key`
    }
};

worker2.slow5 = cachingDecorator3(worker2.slow5, hash);

console.log(worker2.slow5(2, 3)); //(2 + 3) whole square is: 25, just calculated
console.log(worker2.slow5(2, 3)); //(2 + 3) whole square is: 25, just cached

//if you don't understand this then you probably don't understand how arguments work,
//'...arguments' could be used to forward every single parameter received by the current function straight into a different function. 
//'arguments' could be used to forward every single parameter received by the current fnction straight into different function in a array like object.

//.........................

//func.apply

function cachingDecorator4(func, hash){
    
    let cache = new Map();

    return function(){

        let key = hash(arguments);

        if(cache.has(key)){
            return `${cache.get(key)}, just cached`;
        }
        let value = func.apply(this, arguments);
        cache.set(key, value);
        return `${value}, just calculated`;
    };

};

let worker3 = {
    someMethod(){
        return 2;
    },
    slow6(x, y){
        return `(${x} times ${y}) is: ${x * y}`
    }
};

worker3.slow6 = cachingDecorator4(worker3.slow6, hash);
console.log(worker3.slow6(2, 3)); //(2 times 3) is: 6, just calculated
console.log(worker3.slow6(2, 3)); //(2 times 3) is: 6, just cached

//.call() expects arguments individually
//.apply() expects arguments as a single array-like object, it handels the spreading internally. 

//note: Passing all arguments along with the context to another function is called call forwarding.

//..............................

//Borrowing a method

function hash2(){
    
    return [].join.call(arguments); //How this trick works?
    // return [].join.apply(arguments); //same, the only difference is that .apply spreads 'arguments' array like obj, actually wrong, it would have done so but arguments is context here (first argument for .apply) so it doesn't. arguments is not spreaded here.
};
console.log(hash2(1,2,3,4,5)); //"1,2,3,4,5"

//The trick is called method borrowing. How it works?
//ans: so what we are doing is we are calling join method sitting in array.prototype object's method (Array.prototype.join or with [].join) with .call or .apply and giving it a context, which it's 'this' will refer to.

//....................................

//Decorators and function properties

//When we use decorators to replace methods or functions it skips their properties. in the example above if slow function had any properties on it, then cachingDecorator(slow) is a wrapper without them.

//Some decorators may provide their own properties. E.g. a decorator may count how many times a function was invoked and how much time it took, and expose this information via wrapper properties.

// There exists a way to create decorators that keep access to function properties, but this requires using a special Proxy object to wrap a function. We’ll discuss it later in the article Proxy and Reflect.

//.......................................

//some important points:

//Decorator is a wrapper around a function that alters its behavior. The main job is still carried out by the function.


//To implement cachingDecorator, we studied methods:

// func.call(context, arg1, arg2…) – calls func with given context and arguments.
// func.apply(context, args) – calls func passing context as this and array-like args into a list of arguments.


//The generic call forwarding is usually done with apply:
/**

let wrapper = function() {
  return original.apply(this, arguments);
};
 */



