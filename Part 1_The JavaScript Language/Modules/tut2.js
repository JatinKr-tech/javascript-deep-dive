//Export and Import

//.................

//Export before declarations

/**
// export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}
 */

//We can label any declaration as exported by placing export before it, be it a variable, function or a class.

//Note: export before a class or a function does not make it a function expression. It’s still a function declaration, albeit exported.

//No need for semicolons after export class/function

//......................

//Export apart from declarations

//Also, we can put export separately.

/*
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye};
*/

//........................

//Import *

/*
import {sayHi, sayBye} from './script2.js';
sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
*/

import * as say from './script2.js'; //if we want to import everything then we use '*'
say.sayHi('John'); // Hello, John!
say.sayBye('John'); // Bye, John!

//Note:
//Don’t be afraid to import too much
// Modern build tools, such as webpack and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

//..........................

//Import “as”

import {sayHi as hi, sayBye as bye} from './script2.js';

hi('Donald'); // Hello, John!
bye('Donald'); // Bye, John!

//...........................

//Export “as”

say.welcome("Ethan"); //Welcome , Ethan!
say.NYear("Ethan"); //Happy New Year , Ethan!

//..............................

//Export default

//In practice, there are mainly two kinds of modules.

//1) Modules that contain a library (meaning, exports multiple stuff)
//2) Modules that declare a single entity and export it only

//2nd kind of modules are preffered even though we would need a lot of files but if we name them properly it actually becomes easier to navigate. 
//'export default' syntax helps make it easier too

/*
import User from './user2.js'; 
console.log(new User("Natasha")); //User {name: 'Natasha'}
*/

import meow from './user2.js'; 
console.log(new meow("Natasha")); //User {name: 'Natasha'}

//Technically, we may have both default and named exports in a single module, but in practice people usually don’t mix them. A module has either named exports or the default one.

//Imp 
//import needs curly braces for named exports and doesn’t need them for the default one.

//

//The “default” name

//imp
//you can export default and named stuff together 

//see the javascript.info site

//A word against default exports

//Industry standard is that when you import default from a file name it the file name, or else use named exports.

//..........................

//Re-export

//export ... from ... allows to import things and immediately export them

export {default as someClass} from './user2.js';

//or

import user2 from './user2.js';
export {user2};

//

//Re-exporting the default export

//export User from './user.js' won’t work. we have to write export {default as User}
//export * from './user.js' re-exports only named exports, but ignores the default one.

//.................

//Summary

//We can put import/export statements at the top or at the bottom of a script, that doesn’t matter.