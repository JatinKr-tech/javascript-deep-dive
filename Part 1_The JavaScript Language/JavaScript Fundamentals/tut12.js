//nullish operator "??"

//?? operator returns next value if and only if first value is null/undefined

//|| operator returns next value if and only if first value is falsy, falsy = "", null/undefined, 0, flase.

let name = "";
let username = "";
let id = "ASD123";

console.log(name ?? username ?? id ?? "Anonymous"); //returns an empty string
console.log(name || username || id || "Anonymous"); //returns value of id

let Name = null;
let Username = undefined;
let Id = "ASD123";

console.log(Name ?? Username ?? Id ?? "Anonymous"); //returns value of Id
console.log(Name || Username || Id || "Anonymous"); //returns value of Id

console.log(Name && Username && Id && "Anonymous"); //returns null, as && returns first falsy value. It returns last truthy value if all values are truthy!! -I missed this.


//So we see || and ?? operats almost similarly, let's see where they work differently.

let height = 0;
let weidth = 10;

console.log(height || 100); //100, 0 is falsy value for ||
console.log(height ?? 100); //0, only null/undefined are falsy values for ?? 

//
//Precedence/priority of ?? is same as ||, &&. it is below =,? but above +,*

height = 20;

console.log((height ?? 100)*(weidth ?? 50)); //returns height*weidth = 200
console.log(height ?? 100 * weidth ?? 50); //returns value of height.

// ?? woth || and &&
let x = 1 && 2 ?? 3; // Syntax error
let x = (1 && 2) ?? 3; // Works

alert(x); // 2
//note: It’s forbidden to use it with || or && without explicit parentheses "()".


//another extra lesson from comments of this chapter.

let value1 = null;
let value2 = undefined;
let value3 = 0;
let value4 = 2;
let value5 = "";
let value6 = "0";
let value7 = "2";

console.log("\n");

console.log(value1); //null
console.log(value2); //undefined
console.log(value3); //0
console.log(value4); //2
console.log(value5); //""
console.log(value6); //0
console.log(value7); //2

console.log("\n");

/*
value1 ??= 10;
value2 ??= 20;
value3 ??= 30;
value4 ??= 40;
value5 ??= 50;
value6 ??= 60;
value7 ??= 70;
console.log(value1, value2, value3, value4, value5, value6, value7); //10 //20 //0 //2 //'' //'0' //'2'
*/


/*
value1 ||= 10;
value2 ||= 20;
value3 ||= 30;
value4 ||= 40;
value5 ||= 50;
value6 ||= 60;
value7 ||= 70;
console.log(value1, value2, value3, value4, value5, value6, value7); //10 //20 //30 //2 //50 //'0' //'2'
*/

/*
value1 &&= 10;
value2 &&= 20;
value3 &&= 30;
value4 &&= 40;
value5 &&= 50;
value6 &&= 60;
value7 &&= 70;
console.log(value1, value2, value3, value4, value5, value6, value7); //null //undefined //0 //40 //'' //60 //70"
*/


console.log("\n");
