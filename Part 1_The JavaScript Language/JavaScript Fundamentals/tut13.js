//while loop
let i = 0;
while (i < 3) {
    console.log(i);
    i++
};
console.log("\n")
console.log("i = " + i); //3 
console.log("\n")

let j = 0;
while (j < 3) (console.log(j++))
    
console.log("\n")
console.log("j = " + j); //3 
console.log("\n")

//...............

//do while loop
let k = 0;
do {
    console.log(k);
    k++
} while (k < 3);

console.log("\n")
console.log("k = " + k); //3 
console.log("\n")

//..................

//for loop
//Popular than other ones.

/*

for (let l = 0; l < 3; l++) {
    console.log(l); //0,1,2   //l defined here
    
};
*/


// console.log("l = " + l); // l ain't defined here because l was decleared 'inline' and is called 'inline' variable declaration.


let l = 0;

/*
for (l = 0; l < 3; l++) {
    console.log(l); //0,1,2   //l defined here
    
};
*/

/*
for (; l < 3; l++) {
    console.log(l); //0,1,2   //l defined here
    
};
*/

for (; l < 3;){ 
    console.log(l++);
};

console.log("\n");
console.log(l); //3
console.log("\n");

// for(;;){}; //two semicolon's must be present //this code can crash site, so don't uncomment it.

//break

/*
let sum = 0;
console.log(sum);
while (true) {
    let value = +prompt("enter a number", "");

    
    if (!value) break; //"!" converts to boolean and also inverts the boolean, use "!!" to convert to direct boolean whitout inverting it. //0 will make !value "true"
    
    sum += value; //sum keeps adding the value
}

console.log("sum = " + sum);
*/

//....................

//continue

let m = 0;

for (m = 0; m < 10; m++){
    if (m % 2 == 0) continue; //if the condition is fullfilled then the next code does not execute in the body.
    console.log(m); //1,,3,5,7,9
};

console.log("\n");

for (m = 0; m < 10; m++){
    if (m % 2){                     //0 is a false boolean and 1,2,3,4.... are treated as true boolean.
        console.log(m); //1,3,5,7,9
    }
};

//break/continue ain't allowed right side of ?
//example..

//doen't run these codes, it's only for representational purpose.
/*
if (i > 5) {
  alert(i);
} else {
  continue; //allowed
}
  */ 

// (i > 5) ? alert(i) : continue; // continue isn't allowed here

//label for break/continue

/*
let n = 0;
let o = 0;

lmao : for(n = 0; n < 5; n++){
    for(o = 0; o < 5; o++){
        let input = prompt(`Value at coords (${n},${o})`, '');
        if (!input) break lmao; //because of label we are able to break parent loop.
    };
};
*/
/*
lmao:
for(..)  //works too
*/ 

// written for example
/*
break label; // jump to the label below (doesn't work)

label: for (...)

//

label: {
  // ...
  break label; // works
  // ...
}
*/

//...............

//Task

//task1
/*
console.log("\n");


let p = 3;

while (p) {     //when p = 0, it stops
  console.log( p-- );
}
*/

//task2
/*
for (let q = 0; q < 5; ++q) alert( q );

for (let q = 0; q < 5; q++) alert( q ); 
//output will be same
*/

console.log("\n");


//task
let r = 1;
for(; r < 11; r++){
    if (r % 2) continue;
    console.log(typeof r, r);
};

console.log("\n");
//task

let s = 0
while (s < 3) {
    console.log(s);
    s++;
}
console.log(`s is ${s}`);

console.log("\n");

//task

while (true) {
  value = prompt("", "");  
  if (+value >= 100 || !value) break;
};

//another way to do it

/*
let num;
do {
    num = prompt("", "");
} while (num < 100 && num); //when numbers both are true, when null, first becomes true but second becomes false, and as we know && operator returns first falsy value if some values are truthy and some are falsy
*/ 

//task 


let t;
do {
    console.log(t);
} while (t % t);

//task .. really good one

let lim = 20;
let u;
let v;

label: for (u = 2; u <= lim; u++){
        for (v = 2; v < u; v++){

            if (!(u % v)) continue label;

        };
        
        console.log(u);
        
    };

    