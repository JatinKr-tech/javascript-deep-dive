//comparison
//refer to javascript comparison documentation

console.log("A" < "a"); //true, odd lmao!! internal priority of js, we can't do anything about this 
console.log("z" > "j"); //true
console.log("jatink" > "jatin"); //true
console.log("je" > "j"); //true
console.log("je" > "ja"); //true
console.log("je" > "jal"); //true

console.log("\n");

console.log("2" > "12"); //true

console.log("\n");

let a = "";
let b = "0";
let c = 0;
let t = true;
let f = false;
console.log(a == f); //true
console.log(b == f); //true
console.log(c == f); //true
console.log(a == b); //false
console.log(a == c); //true, wtf?? In loose equality, because javascript coverts empty string to 0, we call it type coercion, it explains a lot other things too. "NOTE"
console.log(a === c); //false
console.log(b == c); //true

console.log("\n");

console.log(a === f); //false
console.log(b === f); //false
console.log(c === f); //false
console.log(a === b); //false
console.log(a === c); //false
console.log(b === c); //false

//console.log(b == true); //false

console.log("\n");

console.log(null == undefined); //true
console.log(null === undefined); //false


console.log("\n");
console.log(0 > null); //false
console.log(0 < null); //false
console.log(0 == null); //false
console.log(0 === null); //false
console.log(0 >= null); //true
console.log(0 <= null); //true
console.log("\n");
console.log(0 < undefined); //false
console.log(0 > undefined); //false
console.log(0 == undefined); //false
console.log(0 === undefined); //false
console.log(0 >= undefined); //false
console.log(0 <= undefined); //false

console.log("\n");

console.log(null == ""); //false
console.log(null == "0"); //false
console.log(null == "\n0\n"); //false
console.log(null == "\t0\n"); //false
console.log(null === ""); //false
console.log(null === "0"); //false
console.log(null === "\n0\n"); //false

console.log("\n");

console.log(undefined == ""); //false
console.log(undefined == "0"); //false
console.log(undefined == "\n0\n"); //false
console.log(undefined == "\t0\n"); //false
console.log(undefined === ""); //false
console.log(undefined === "0"); //false
console.log(undefined === "\n0\n"); //false



//it takes time to understand this
//Note to avoid problems while working with comparisons: 
// Treat any comparison with undefined/null except the strict equality === with exceptional care.
// Don’t use comparisons >= > < <= with a variable which may be null/undefined, unless you’re really sure of what you’re doing. If a variable can have these values, check for them separately.
