console.log(typeof null == "object"); 
console.log(typeof function(){} == "function"); 

// The “switch” construct can replace multiple if checks. It uses === (strict equality) for comparisons.

// For instance:

let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}

//You can revise from this chapter lesson from documentation on javascript.info site 