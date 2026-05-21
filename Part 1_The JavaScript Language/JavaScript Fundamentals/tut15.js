//function

/* 
let a = "fdf";

function fn1 () {
    let a = 1;          //we can declare a variable inside function and we can also redeclare an already decleared "global variable" inside a function. Or we can just not declare variable here and use global variable. 
    // But most of the time variable's are decleared inside function.
    let b = 2;

    alert(a + b);
}

// fn1();  //we can call a function like this

// console.log(b); //variable b was decleared inside function fn1() so we can't call it outside function like this

function fn2 (value1, value2) {
    console.log(value2);
    console.log(value1);
    console.log(value1 + value2);
    console.log(value2 + value1);
}

fn2(2434, 4324); //value1 = 2434, value2 = 4324

function ageVerification(age) {
    if (+age >= 18) {
        return true;
    } else if (age == null){
        return false;
    } else {
        return confirm("Do you have permission from your parents?")
    };
};

let age = prompt("Enter your valid age please", "");

// if (ageVerification(age)) {
//     console.log("access granted!");    
// } else {
//     console.log("access denied!");
    
// }

function showMovie (age) {
    if (!ageVerification(age)) {
        console.log("access denied!");
        return;
    };2 
    console.log("access granted!"); 
    console.log("Showing you the movie");
}

showMovie(age);

function doNothing (){};
function doAbNothing (){
    return true; //return false;            //return does not let below code execute and it also returns a boolean 'true/false'. That's the meaning of return true;, if we only write return; then it will again not let below coe execute but it will return undefined instead of a boolean.
    return confirm("You a human");
    console("You can't see me!!")
};
console.log(doNothing() === undefined, doAbNothing() === undefined);
doAbNothing();
*/


//........................

//task

console.log("\n");

/*
let age = prompt("Enter your valid age please", "");
function checkAge (age){
    // let lmao = (age > 18) ? true : confirm("You have permission from your parents?") ;
    return (age > 18) || confirm("You have permission from your parents?");
};
console.log(checkAge(age));
*/

//task

/*
let a = -2;
let b = 3;

function func1 (a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    };
    
    // let lmao = (a > b)? return a : return b;

};

console.log(func1(a, b));

//task 

function pow (a, b){
    return a ** b;
};

console.log(pow(a, b));
*/

//PrimeNumber Task

let u;
let v;
let n = 100;

function checkContinue (value1, value2) {
    return (value1 % value2);

}

function isPrimeNumber (value1, value2, value3) {
    
    label:
    for (u = 2; u < n; u++){
        for (v = 2; v < u; v++){
            if (!checkContinue(u, v)) continue label;
        }
        // return u;
        console.log(u);
    };
};

console.log(isPrimeNumber(u, v, n));

