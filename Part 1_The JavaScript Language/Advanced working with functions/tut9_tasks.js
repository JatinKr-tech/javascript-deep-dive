function work(a, b) {
  console.log( a + b ); // work is an arbitrary function or method
};

function spy(func){
    function wrapper(){
        wrapper.calls.push([...arguments])
        return func(...arguments);
    }
    wrapper.calls = [];
    return wrapper;
};

work = spy(work);


work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
};


//task2

function f(x) {
  console.log(x);
}

/**
function delay(func, dly){
    return function(x){
        setTimeout(()=>{func(x)}, dly);
    };
};
 */

function delay(func, dly){
    return function(){
        setTimeout(()=>{func.apply(this, arguments)}, dly);
    };
};

//'this' and 'arguments' doesn't work in arrowfunction so we give context.

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test1"); // shows "test" after 1000ms
f1500("test2"); // shows "test" after 1500ms

//task3

/*
function debounce(x, y){
    function tobe(z){
        tobe.save = z;
        setTimeout(()=>{
            x(tobe.save);
        }, y)
    }
    tobe.save;
    return tobe;
};
*/

//above method gives 'c' three times, cuz other intervals will run no matter what, we need to clear them, 

function debounce(x, y){
    let timeout;
    function tobe(z){
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            x(z);
        }, y);
    };
    return tobe;
};

let f1 = debounce(console.log, 1000);

f1("a");
setTimeout( () => f1("b"), 200);
setTimeout( () => f1("c"), 500);

//task4

/*
function throttle(func, ms){
    let throttled = false;
    let save;
    let prev;
    
    function wrapper(){
        if (throttled){
            save = arguments;
            return;
        }
        throttled = true;
        func(...arguments);

        setTimeout(()=>{
            throttled = false;
            if(save){
                // wrapper.apply(this, save);
                wrapper(...save);
                save = null;
            }
        }, ms)

    }
    return wrapper;
}
    */


// function f2(a) {
//   console.log(a);
// }

/*
// f1000 passes calls to f at maximum once per 1000 ms
let fa1000 = throttle(f2, 1000);

fa1000(1); // shows 1
fa1000(2); // (throttling, 1000ms not out yet)
fa1000(3); // runs as it is the last one 
setTimeout(()=>{fa1000(4)}, 1100)
*/

// "use strict";

function throttle(func, ms){
    let throttled = false;
    let argSave;
    let thisSave;
    
    function wrapper(){
        if (throttled){
            argSave = arguments;
            thisSave = this;
            return;
        }
        throttled = true;
        func.apply(this, arguments);

        function setupTimeout(){
            setTimeout(()=>{
            if(argSave){
                // wrapper.apply(this, argSave);
                // wrapper.apply(thisSave, argSave); //infinite recursion, code never reaches argSave = null (in Theory somehow browser saves you, why? ans: )
                func.apply(thisSave, argSave);
                argSave = null;
                thisSave = null; //we need this code to stop memory leak and to stop 'ghost context' (to ensures that old object data doesn't linger around to accidentally corrupt future function executions.)
                setupTimeout();
            } else {
                throttled = false;
            };
        }, ms)
        }
        setupTimeout();

    }
    return wrapper;
}

let obj22 = {
    name: "Jatin",
    f2 (x){
        console.log(`${this.name} + ${x}`)
    }
}

obj22.f2 = throttle(obj22.f2, 1000);

obj22.f2(1);
obj22.f2(2);
obj22.f2(3);

setTimeout(()=>{obj22.f2(4)}, 1010);