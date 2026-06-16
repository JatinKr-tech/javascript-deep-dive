//Arrow functions revisited

//Arrow functions have no “this”

//When we use this inside an arrow function since it has no 

//Arrow functions do not establish their own this binding. When you use the this keyword inside an arrow function, JavaScript treats it exactly like any other ordinary variable—it performs a standard lexical scope lookup. If the current scope doesn't have a this definition, the JavaScript engine looks outward into the parent execution contexts until it finds it

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(
            student => console.log(this.title + ': ' + student)
        );
        /**
        this.students.forEach(function(student) {
            // Error: Cannot read property 'title' of undefined
            alert(this.title + ': ' + student);
        });
         */
    }
};

group.showList();

//When we use normal function instead of arrow function
//The error occurs because forEach runs functions with this=undefined by default, so the attempt to access undefined.title is made.

//

window.students = ["Prakhar"]

let arrowfunc1 = ()=> {console.log(this.students)};

let arrowfunc1Bound = arrowfunc1.bind(group);
arrowfunc1Bound(); //["Prakhar"]
//The arrow => doesn’t create any binding. The function simply doesn’t have 'this'. The search goes to outer lexical environment (in this case to window/global/script's)

//................................

//Arrows have no “arguments”

function defer(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms);
    };
};

//arrow function took this and arguments from outer lexical environment.

function defer2(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}

// defer and defer2 are doing same things but Here we had to create additional variables args and ctx so that the function inside setTimeout could take them. arrow function made our code shorter and easy to read.

function sayHi(who) {
    console.log('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds

//

// Arrow functions:

// Do not have this
// Do not have arguments
// Can’t be called with 'new', why? cuz they lack context of this and internal setup such as [[Construct]] and .prototype. Doc's didn't explain it in detail :<
// They also don’t have super, but we didn’t study it yet. We will on the chapter Class inheritance

//useful info:
// if we want to return an object using Arrow function we should wrap it in braces like:
let AF = () => ({name:"jack"})
// otherwise it will give you an error.

//bcz: the JavaScript engine naturally interprets curly braces {} as the beginning of a function body block rather than an object literal.