//Unicode, String internals

//As we already know, JavaScript strings are based on Unicode: each character is represented by a byte sequence of 1-4 bytes.

//1) \xXX

//Because the \xXX notation supports only two hexadecimal digits, it can be used only for the first 256 Unicode characters.

console.log( "\x7A" ); // z
console.log( "\xA9" ); // ©, the copyright symbol

//2) \uXXXX XXXX must be exactly 4 hex digits with the value between 0000 and FFFF, then \uXXXX is the character whose Unicode code is XXXX.
//Characters with Unicode values greater than U+FFFF can also be represented with this notation, but in this case, we will need to use a so called surrogate pair

console.log( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
console.log( "\u044F" ); // я, the Cyrillic alphabet letter
console.log( "\u2191" ); // ↑, the arrow up symbol

//3) \u{X…XXXXXX}

// X…XXXXXX must be a hexadecimal value of 1 to 6 bytes between 0 and 10FFFF (the highest code point defined by Unicode). This notation allows us to easily represent all existing Unicode characters.

console.log( "\u{20331}" ); // 佫, a rare Chinese character (long Unicode)
console.log( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)

//....................................

//Surrogate pairs

//rare symbols that require more than 2 bytes are encoded with a pair of 2-byte characters called “a surrogate pair”.

//As a side effect, the length of such symbols is 2:
console.log( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
console.log( '😂'.length ); // 2, FACE WITH TEARS OF JOY
console.log( '𩷶'.length ); // 2, a rare Chinese character

//That’s because surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!


//Getting a symbol can also be tricky, because most language features treat surrogate pairs as two characters.

console.log( '𝒳'[0] ); // shows strange symbols...
console.log( '𝒳'[1] ); // ...pieces of the surrogate pair

//Pieces of a surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

//if a character has the code in the interval of 0xd800..0xdbff, then it is the first part of the surrogate pair.
//The next character (second part) must have the code in interval 0xdc00..0xdfff. These intervals are reserved exclusively for surrogate pairs by the standard.

// String.fromCodePoint and str.codePointAt were added to deal with surrogate pairs. They treat surrogate pairs correctly.

console.log( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt is surrogate-pair aware
console.log( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, reads both parts of the surrogate pair

// if we take from position 1 (and that’s rather incorrect here), then they both return only the 2nd part of the pair:
console.log( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
console.log( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// meaningless 2nd half of the pair

//Note: 

// Takeaway: splitting strings at an arbitrary point is dangerous
console.log( 'hi 😂'.slice(0, 4) ); //  hi [?]
//Here we can see a garbage character (first half of the smile surrogate pair) in the output.

//.....................................

//Diacritical marks and normalization

//To support arbitrary compositions, the Unicode standard allows us to use several Unicode characters: the base character followed by one or many “mark” characters that “decorate” it.

console.log( 'S\u0307' ); // Ṡ

console.log( 'S\u0307\u0323' ); // Ṩ

//two characters may visually look the same, but be represented with different Unicode compositions.

let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above
console.log( s1 == s2 ); // false though the characters look identical (?!)

//
//normalize()

console.log(s1.normalize() == s2.normalize()); //true
console.log(s1.normalize() == "\u1e68"); //true
console.log(s2.normalize() == "\u1e68"); //true

//In reality, this is not always the case. The reason is that the symbol Ṩ is “common enough”, so Unicode creators included it in the main table and gave it the code.

//Fore More Info, SRC : https://www.unicode.org/reports/tr15/