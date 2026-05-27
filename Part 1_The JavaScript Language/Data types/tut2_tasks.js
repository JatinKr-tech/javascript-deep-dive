//task1
/*
let askNum1 = prompt("Please Enter a number", "") 
let askNum2 = prompt("Please Enter a number", "") 

let Num1parsefloat = parseFloat(askNum1);
let Num2parsefloat = parseFloat(askNum2);

//even if Num1parsefloat is NaN and Num2parsefloat is number than addition gives NaN
let sum = Num1parsefloat + Num2parsefloat;

console.log(sum.toFixed(2));

console.log(NaN + "fds"); //NaNfds
console.log(NaN + 3423); //NaN
*/

//task2

//because of precision

console.log(1.35.toFixed(1)); //1.4 // 1.35000000000000008882
console.log(-1.35.toFixed(1)); //-1.4
console.log(6.35.toFixed(1)); //6.3 // 6.34999999999999964473
console.log(8.35.toFixed(1)); //8.3

// how to fix it?
console.log(Math.round(6.35*10)/10); //6.4

console.log("\n");

//task3


let readNumber = function (){
    let a =  prompt("Enter a valid number", "");
    return a;
}
    



/*
while (true) {
    let value = readNumber();

    if (value == null || value == "") {
        console.log("won't ask again")
        break;
    }; 

    if (!isNaN(value) && isFinite(value)) {
        console.log(`You entered ${value}`)
        break;
    }
}
    */

//can use isFinite or Number.isFinite too

while (true) {
    let value = readNumber();

    if (value == null || value == "") {
        console.log("won't ask again")
        break;
    }; 

    if (isFinite(value)) {
        console.log(`You entered ${value}`)
        break;
    };
}

//Why i am using isNaN instead of unary +, because of 0
//Why i ain't using parseInt or parseFloat? because of 23fdsfd

//task4

//this loop will never stop because of precision
/*
let i = 0;
while (i != 10) {
  i += 0.2;
}
  */

// write it like this instead
let i = 0;
while (i < 10) {
  i += 0.2;
}
console.log(i); //10.199999999999996

//task5

function random (x, y) {
    while (true) {
        let value = Math.random();
        if(x < value*10 && value*10 < y) {
            return value*10;
            break;
        }
    }
};

console.log(random(1, 5));

//better way to do it:
function randomTwo(min, max) {
  return min + Math.random() * (max - min);
}

console.log( randomTwo(1, 5) );

//task 6

function randomThree(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

console.log( randomThree(1, 5) );