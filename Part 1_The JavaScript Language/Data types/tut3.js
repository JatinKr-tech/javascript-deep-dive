let guestlist = ` names: 
1. James
2. Hopp
3. Kreg

`;
console.log(guestlist);

let guestlistWithSingleorDoubleQuotes = " names:\n1. James\n2. Hopp\n3. Kreg"
console.log(guestlistWithSingleorDoubleQuotes);

let str1 = `Hello
World`;
let str2 = "Hello\nWorld";

console.log(str1 == str2); //true

console.log(`\n`); //same as below one
console.log(`\r\n`);
console.log("\`", "LMAO" ,"\`"); //` LMAO `
console.log("\"", "LMAO" ,"\""); //" LMAO "
console.log("\'", "LMAO" ,"\'"); //' LMAO '
console.log('\\'); // \
console.log("\b")
console.log("\f")
console.log("\v")

//...................

//String Length

console.log("str\t".length); //4 //\t is a special character that's why.
//.length is not a method, it's a property that's why no .length() 

//Accessing characters [position] or.at()
let str3 = "Jatin";

console.log(str3[0]); //J
console.log(str3.at(0)); //J

console.log(str3[str3.length - 1]); //n
console.log(str3.at(-1)); //n
console.log(str3[-1]); //undefined

//for of

for (char of str3) {
    console.log(char); //J //a //t //i //n
};
for (char in str3) {
    console.log(char);//0 //1 //2 //3 //4 //prints indexes of characters
}

//......................

//Strings are immutable
//Strings can’t be changed in JavaScript. It is impossible to change a character.

let str4 = 'Hi';

str4[0] = 'h'; // error
console.log( str4[0] ); //H // doesn't work

//instead we can replace it...

str4 = 'h' + str4[1]; // replace the string

console.log( str4 ); // hi

//..................

//Changing the Case

console.log( 'Interface'.toUpperCase() ); // INTERFACE
console.log( 'Interface'.toLowerCase() ); // interface

console.log( 'Interface'[0].toLowerCase() ); // 'i'

//....................

//Searching for a substring

let str5 = "Teacher is Angry, everyone is angry, he is angry, she is angry."; 

console.log(str5.indexOf("Teacher")); //0
console.log(str5.indexOf("Angry")); //11

console.log(str5.indexOf("is")); //8 but not 27
console.log(str5.indexOf("is", "9")) //27 as we can seethere is another 'is'

//I think we need a loop to print out every 'is' position automatically

let pos = 0;

while (true) {
    let value = str5.indexOf("is", pos);
    console.log(`\n${value}`);
    if (value == -1) break;
    pos = value + 1;
}

console.log("\n");
//shorter way:
/*
let pos = -1;

while ((pos = str5.indexOf("is", pos + 1)) != -1) {
    console.log(pos);
}
*/
console.log("\n");



console.log(str5.indexOf("teacher")); //-1, first letter lower case so it does not exist.
console.log(str5.indexOf("Me")); //-1, does not exist

console.log(str5.indexOf("", 23)) //if the first argument is empty then it returns second argument
console.log(str5.indexOf("", "")); //0

//str.lastIndexOf();

console.log(str5.lastIndexOf("is")); //54, cuz it starts from right to left.

//includes, startsWith, endsWith

let text = "Transformer";

console.log(text.includes("rans")); //true
console.log(text.includes("for")); //true
console.log(text.includes("kek")); //false
console.log(text.includes("rans", "2")); //false

console.log("\n");

console.log(text.startsWith("Tran")); //true
console.log(text.startsWith("ran", "1")); //true
console.log(text.startsWith("for")); //false

console.log("\n");

console.log(text.indexOf("e")); //9
console.log(text.endsWith("me", "9")); //false, cuz it sees length of character not index.
console.log(text.endsWith("me", "10")); //true

console.log(text.endsWith("mer")); //true

//........................

//Getting a Substring

//Three methods: 

// slice(start, end); not including end; allows neg values(meaning it would start counting from end);

//substring(start, end); not including end; does not allow neg values; allows : substring(end, start)

//substr(start, length); allows neg value for start
//substr has a drawback that it is not in core javascript, 
//almost all of the time using and remembering only slice is enough

let ourStr = "Lockheed";

let i = 0;
for(char of ourStr){
    console.log(`${char} : ${i++}`)
}

console.log(ourStr.slice(4, 6)); //he
console.log(ourStr.slice(-4, -1)); //hee

console.log("\n");

console.log(ourStr.substring(2, 4)); //ck
console.log(ourStr.substring(4, 2)); //ck 
console.log(ourStr.substring(-4, -2)); //does not prink anything
console.log(ourStr.substring(-4, 4)); //Lock, cuz if one of the argument is neg then it is considered '0'

console.log("\n");

console.log(ourStr.substr(3, 5)); //kheed
console.log(ourStr.substr(-5, 5)); //kheed

console.log("\n");

//.............................

//Comparing Strings

console.log('a' < 'z'); //true
console.log('a' > 'Z'); //true
console.log('a' > '@'); //true, anysumbol

console.log("\n");

console.log('Orborn' < 'Zeland') //true
console.log('Zinala' > 'Zin') //true
//Letters with diacritical marks are “out of order”:
console.log( 'Österreich' > 'Zealand' ); //true

//str.codePointAt(pos), when we need to convert letter to a value

console.log(("z").codePointAt(0)); //122
console.log(("Z").codePointAt(0)); //90
console.log(("z").codePointAt(0).toString(16)); //in Hexadecimal

//String.fromCodePoint(code), when we need letter from value

// let String = "lmao"; if we do this, below code won't work
console.log(String.fromCodePoint(90)); //Z
console.log(String.fromCodePoint(122)); //z
console.log(String.fromCodePoint(121)); //y

let str6 = '';


for (let i = 0; i <= 220; i++ ) {
    str6 += String.fromCodePoint(i);
}

console.log(str6); //	

//  !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ.....


//..........................
//Correct Comparison 

//str1.localeCompare(str2); if str1 is greater than str2 then 1. If str1 is less than str2 then -1. If str1 is equal to str2 then 0.

console.log('banana'.localeCompare('apple')) //1
console.log('apple'.localeCompare('banana')); //-1
console.log('appleeee'.localeCompare('apple')); //1
console.log('apple'.localeCompare('apple')); //0

console.log("\n");
//for different language like below it is based on ECMA 402 not (>,<) standard comparison

console.log('Österreich'.localeCompare('Zealand')); //we expected 1 based on our prevoius: console.log( 'Österreich' > 'Zealand' ); we thought Österreich comes after Zealand but due to ECMA402 result was opposite to our expectation.
console.log('Zealand'.localeCompare('Österreich'));

//..........................
//There are many other string methods like: 
//str.trim() to remove extra spaces at the beginning and end of string
//str.repeat(n), to repeat the string n times.
//many more 