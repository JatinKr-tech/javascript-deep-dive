//Task

/*
//Task1
let value = prompt("What is the official name of JavaScript?", "");

if(value == "ECMAScript"){
    console.log("Correct, you are amazing");
} else{
    console.log("Wrong!, the right answer is ECMAScript");
};
*/

//Task2
/*
let value = prompt("", "")
console.log(typeof value);

value = +value;

if (value < 0) {
    alert(-1);

} else if (value == 0){
    alert(0);
} else if(value > 0){
    alert(1);
} else{
    console.log("string lmao");
    
}
*/

//Task 3

/*Q
let result;

if (a + b < 4) {
  result = 'Below';
} else {
  result = 'Over';
}
*/
/*
let a = 1;
let b = 3;

let result = (a + b < 4) ? "You Failed":
 (a + b == 4) ? "You Passed":
 "You are a genius";

 console.log(result);
*/

//Task4

/*Q
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
*/

let login = prompt("", "Employee");

let message = (login == 'Employee') ? "Hello":
        (login == 'Director') ? "Greetings":
        (login == '') ? "No Login":
        "Enter Valid Credentials";

alert(message);
