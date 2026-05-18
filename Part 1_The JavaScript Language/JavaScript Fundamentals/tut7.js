let value = true;

//alert(typeof value); //alert() function automatically converts any datatype to a string, while it is only for show purpose!! It does not change the type of datatype to string permanently so when we try to check using console.log(), we get original data type.


// console.log(value, typeof value); //We get boolean not string 

//value = String(value); //this function is used to convert datatype to string

//alert(typeof value); //We get string not boolean

//.......................

//Mathematical operations , Numeric conversion in mathematical functions and expressions happens automatically.

// let num = "12" / "4";
// alert(typeof num) //number,
// alert("6/2"); //3, number

/*
let str = "jk"; //or
// let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(num); // when str = "jk", we get NaN

alert(typeof num); // number

*/

/*
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
*/
//Null and undefined behave differently here: null becomes zero while undefined becomes NaN.

//.................

//Boolean conversion 

//false
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));
console.log(Boolean(""));

//true
console.log(Boolean(" "));
console.log(Boolean("fdsfds"));
console.log(Boolean(1));