// Function object, NFE

//In JavaScript, functions are objects.
//We can not only call them but add/remove properties too.

//..........................

//The “name” property

function sayHello() {
    console.log("Hello!");
};

console.log(sayHello.name); //"sayHello"


let sayHi = function(){
    console.log("Hi!")
};

console.log(sayHi.name); //"sayHi"

function func(sayYay = function(){}){
    console.log(sayYay.name);
};
func() //sayYay

//In the specification, this feature is called a “contextual name”. If the function does not provide one, then in an assignment it is figured out from the context.

//Object Methods have names too

let user = {

    sayLMAO() {
        // ...
    },

    sayBye: function() {
        // ...
    }

}

console.log(user.sayLMAO.name); // sayLMAO
console.log(user.sayBye.name); // sayBye

//There are cases when there’s no way to figure out the right name. In that case, the name property is empty, like here:

// function created inside array
let arr1 = [function() {}];

console.log( arr1[0].name ); // <empty string>
// the engine has no way to set up the right name, so there is none

//............................

//The “length” property

function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(many.length); // 2 //Here we can see that rest parameters are not counted.

//practicle use:

function greetings(...rest){
    if(rest.length == 0){
        return "greetings on New Year human!"
    };
    if(rest.length == 1){
        return `Greetings on New Year ${rest[0]}.`
    };
    if(rest.length == 2){
        return `Greetings on New Year ${rest[0]}, You may reach your goal of becoming a ${rest[1]}.`
    };
};
console.log(greetings());
console.log(greetings("Jatin"));
console.log(greetings("Jatin", "SDE"));

//

function ask(question, ...handlers){
    let bool = confirm(question);

    for(handler of handlers){
        if(handler.length == 0){
            handler()
        } else {
            handler(bool);
        };
    };
};

ask("You wanna proceed?", ()=>console.log("Thanks for answering."), (arg)=>console.log(`User Confirmed? : ${arg}`));


//.......................

//Custom properties

function sayKek() {
    console.log("Kek");

    // let's count how many times we run
    sayKek.counter++;
    let somethingVariable = 56;
}
sayKek.counter = 0; // initial value


sayKek(); // Kek
sayKek(); // Kek

console.log( `Called ${sayKek.counter} times` ); // Called 2 times
sayKek(); // Kek //
console.log( `Called ${sayKek.counter} times` ); // Called 3 times

//A property is not a variable
//A variable is not a property, see below:
console.log(sayKek.somethingVariable); //undefined

//Function properties can replace closures sometimes.

function makeCounter() {
    function counter(){
        return counter.count++;
    }
    counter.count = 0;
    return counter;
};

let counter = makeCounter();
let counter2 = makeCounter();

console.log(counter()) //0
console.log(counter()) //1

console.log(counter2()) //0
console.log(counter2()) //1

//The count is now stored in the function directly, not in its outer Lexical Environment.

// Is it better or worse than using a closure?

// The main difference is that if the value of count lives in an outer variable, then external code is unable to access it. Only nested functions may modify it. And if it’s bound to a function, then such a thing is possible:

counter.count = 10;
console.log(counter()); //10

//............................

//Named Function Expression

let sayWelcome = function func11(who){
    if(who){
        console.log(`Welcome ${who}!!`);
    } else {
        func11("guest");
    };
};

sayWelcome("Jatin"); //Welcome Jatin!!
sayWelcome(); //Welcome guest!!
// func11(); //ReferenceError: func11 os not defined

//There are two special things about the name func, that are the reasons for it:

// It allows the function to reference itself internally.
// It is not visible outside of the function.


// Why do we use func11? Maybe just use sayWelcome for the nested call?

// Actually, in most cases we can, but if this code is assigned to a new variable then our we will get an error:

let sayWelcome2 = function(who){
    if(who){
        console.log(`Welcome ${who}!!`);
    } else {
        sayWelcome2("guest");
    };
};

let greet = sayWelcome2;
sayWelcome2 = null;

greet("Panda");
// greet(); //TypeError, cuz sayWelcome2 doesn't exist in the functions own lexical environment so it goes to script's lexical environment to look for SayWelcome2 (Scope Search) and since we know parent's lexical environment is live till the child funcion is called so sayWelcome2 is null and hence we get TypeError.

//that's why, we have to use Named Function Expression sometimes:

let GreetWelcome = function NamedFunction(who){
    if(who){
        console.log(`Welcome ${who}!!`);
    } else {
        NamedFunction("guest");
    };
};

let greet2 = GreetWelcome;
GreetWelcome = null;

greet2("Makima"); //Welcome Makima!!
greet2(); //Welcome guest!!


//There’s no such thing for Function Declaration
// The “internal name” feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an “internal” name.

// Sometimes, when we need a reliable internal name, it’s the reason to rewrite a Function Declaration to Named Function Expression form.

