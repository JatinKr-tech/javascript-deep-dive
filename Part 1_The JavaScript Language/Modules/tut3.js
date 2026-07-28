//Dynamic imports

//Some Limitations of static import export.

//1) First, we can’t dynamically generate any parameters of import.

// The module path must be a primitive string, can’t be a function call.

//ex:
//import ... from getModuleName(); // Error, only from "string" is allowed

//2) Second, we can’t import conditionally or at run-time

/**
if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
 */

let {hi, bye} = await import('./script3.js');
hi();
bye();

let say = await import('./script3.js');
say.hi();
say.bye();
say.default();

let {default: something} = await import('./script3.js');
something(); //Welcome


//note

//Although import() looks like a function call, it’s a special syntax that just happens to use parentheses (similar to super()).

// So we can’t copy import to a variable or use call/apply with it. It’s not a function.