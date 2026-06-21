//tasks

//task1

if(!Function.prototype.defer){
    Function.prototype.defer = function(name, ms){
        setTimeout(()=>{
            this(name)
        }, ms);
    };
};

function func1(name) {
    console.log(`Welcome ${name}`)
};

func1.defer("Jatin", 1000); //While calling defer it has a prefix before that '.' so defer's 'this' bounds to func1. And since we know setTimeout has no 'this', chain search happens and 'this' is taken from outside.

//...................................

//task2

if(!Function.prototype.defer2){
    Function.prototype.defer2 = function(ms){
        let thisSave = this;
        return function f2(...args){
            setTimeout(()=>{
                // thisSave(...arguments); //works
                // thisSave.apply(null, arguments); //works
                // thisSave.apply(null, args); //works
                thisSave.apply(this, args); //works
                //Please note: we use 'this' in thisSave.apply to make our decoration work for object methods.
            }, ms);
        }
    };
};

function func2(...arg) {
    console.log(arg[0] + arg[1])
};

func2.defer2(1000)(1, 2);