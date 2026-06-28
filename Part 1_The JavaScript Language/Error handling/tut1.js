//Error handling, "try...catch"

//there’s a syntax construct try...catch that allows us to “catch” errors so the script can, instead of dying, do something more reasonable.

//.............................

//The “try…catch” syntax

/**
try {

    // code...

} catch (err) {

    // error handling

}
 */

//if no error inside try, //no catch executed
//if error inside try, //execution stops then and there and catch is executed.

try {

  console.log('Start of try runs');  // (1) <--

  // ...no errors here

  console.log('End of try runs');   // (2) <--

} catch (err) {

  console.log('Catch is ignored, because there are no errors'); // (3)

}

try {
    console.log('Start of try runs');
    rfkdlsj
} catch (error) {
    console.log(`catch runs`)
};

//important:

// For try...catch to work, the code must be runnable. In other words, it should be valid JavaScript.

/*
try {
  {{{{{{{{{{{{
} catch (err) {
  alert("The engine can't understand this code, it's invalid");
}
  */

// The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phase are called “parse-time” errors and are unrecoverable (from inside that code). That’s because the engine can’t understand the code.

// So, try...catch can only handle errors that occur in valid code. Such errors are called “runtime errors” or, sometimes, “exceptions”.

//try...catch works synchronously

/*
try {
  setTimeout(function() {
    noSuchVariable; // script will die here
  }, 1000);
} catch (err) {
  console.log( "won't work" );
};
*/

//That’s because the function itself is executed later, when the engine has already left the try...catch construct.

//How it should be done:

setTimeout(function() {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch {
    console.log( "error is caught here!" );
  }
}, 1000);

//..........................

//Error object

//When an error occurs, JavaScript generates an object containing the details about it. The object is then passed as an argument to catch:

try {
  // ...
} catch (err) { // <-- the "error object", could use another word instead of err
  // ...
};

// For all built-in errors, the error object has two main properties:

//1) name
// Error name. For instance, for an undefined variable that’s "ReferenceError".

//2) message
// Textual message about error details.

// There are other non-standard properties available in most environments. One of most widely used and supported is:

//3) stack
// Current call stack: a string with information about the sequence of nested calls that led to the error. Used for debugging purposes.

try {
    lalala;
} catch (error) {
    console.log(typeof error); //object
    console.log(error); //ReferenceError: lalala is not defined at tut1.js:111:5, //why not the generic object?

    console.log(error.name); //ReferenceError
    console.log(error.message); //lalala is not defined
    console.log(error.stack); //ReferenceError: lalala is not defined at tut1.js:111:5

    /*
    toString(){
        return `${this.name}: ${this.message}`
    }
        */
    // alert(error); //ReferenceError: lalala is not defined
};

//..............................................

//Optional “catch” binding

//This is a recent addition to the language. Old browsers may need polyfills.

// If we don’t need error details, catch may omit it:

try {
  // ...
} catch { // <-- without (err)
  // ...
};

//.................................................

// Using “try…catch”

//Real world scenario

let json1 = `{"name": "French Revolution"}`;
let json2 = `{'Russian Revolution'}`;

try {

    let chapter1 = JSON.parse(json1)
    console.log(chapter1); //{name: 'French Revolution'}

    let chapter2 = JSON.parse(json2)    //<------Error here
    console.log(chapter2);

} catch (error) {
    console.log(`Sorry, we failed to load the data properly!`);
    console.log(error.stack);
};

//....................................

//Throwing our own errors

// What if json is syntactically correct, but doesn’t have a required name property?

// Like this:

let json3 = '{ "age": 30 }'; // incomplete data

try {

  let user3 = JSON.parse(json3); // <-- no errors
  console.log( user3.name ); // undefined //<--no error

} catch (err) {
  console.log( "doesn't execute" );
  console.log(err)
};

// “Throw” operator

// The syntax is:
// throw <error object>

//Technically, we can use anything as an error object. That may be even a primitive, like a number or a string, but it’s better to use objects, preferably with name and message properties (to stay somewhat compatible with built-in errors).

//Like this:
let error1 = new Error("Something happened yo");
// or
let error2 = new SyntaxError("Created Syntax Error yo");
let error3 = new ReferenceError("Created Reference Error yo");

console.log(error1.name, "|", error1.message); //Error | Something happened yo

let json4 = '{ "age": 30 }'; // incomplete data

try {

    let user4 = JSON.parse(json4); // <-- no errors

    if (!user4.name) {
        throw new SyntaxError("Incomplete data: no name"); // (*)
    }

    console.log( user4.name );

} catch (err) {
    console.log( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}

//..........................................

//Rethrowing

//Catch should only process errors that it knows and “rethrow” all others.

try {
    // let user5 3
} catch (err) {
    if (err instanceof ReferenceError) {
        console.log('ReferenceError'); // "ReferenceError" for accessing an undefined variable
    } else {
        throw err;
    };
}

//real life use case:

let json6 = `{"age" : 19}`

try {
    let user6 = JSON.parse(json6);

    if(!user6.name){
        throw new SyntaxError("Incomplete data: no name");
    }
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(error.name);
    } else {
        throw error;
        //The error throwing from inside catch block “falls out” of try...catch and can be either caught by an outer try...catch construct (if it exists), or it kills the script.
    }
};

//demonstration of how outer try...catch works:

function func1() {
    try {
        blabla()
    } catch (error) {
        if(!(error instanceof SyntaxError)){
            throw error;
        }
    }
};

try {
    func1()
} catch (error) {
    console.log(`${error.name} caught by outer try...catch`) //ReferenceError caught by outer try...catch
};

//Here readData only knows how to handle SyntaxError, while the outer try...catch knows how to handle everything.

//......................................

//try…catch…finally

//syntax:

/*
try {
   ... try to execute the code ...
} catch (err) {
   ... handle errors ...
} finally {
   ... execute always ...
}
   */

try {
  console.log( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
  console.log( 'catch' );
} finally {
  console.log( 'finally' );
};

// The code has two ways of execution:

//1) If you answer “Yes” to “Make an error?”, then try -> catch -> finally.
//2) If you say “No”, then try -> finally.

//Effective use of 'finally', ex:

// let num = +prompt("Enter a positive integer number?", 35)
let num = 35;
// let num = -35;
// let num = 3.5;

let diff, result;
//Variables are local inside try...catch...finally, that's why we are declaring them here.

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
} finally {
  diff = Date.now() - start;
}

console.log(result || "error occurred");

console.log( `execution took ${diff}ms` );

// the function may finish with return or throw, that doesn’t matter. The finally clause executes in both cases.

//imp:
// finally and return

function func2() {

  try {
    return 1;
    console.log("would it print?"); //this code doesn't execute but catch...finally do execute.

  } catch (err) {
    /* ... */
  } finally {
    console.log( 'finally' );
    // return 4; //4 is returned to func2 instead of 1
  }
}

console.log( func2() ); // first works alert from finally, and then this one

//imp: 
//try...finally
// The try...finally construct, without catch clause, is also useful. We apply it when we don’t want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.

function func3() {
  // start doing something that needs completion (like measurements)
  try {
    // throw new SyntaxError(); //falls out since there is no catch.
    // ...
  } finally {
    // complete that thing even if all dies
  }
};

func3()
// In the code above, an error inside try always falls out, because there’s no catch. But finally works before the execution flow leaves the function.

//........................................

//Global catch

//Environment-specific
//The information from this section is not a part of the core JavaScript.

//Let’s imagine we’ve got a fatal error outside of try...catch, and the script died. Like a programming error or some other terrible thing.

// Is there a way to react on such occurrences?

//There is none in the specification, but environments usually provide it, because it’s really useful. For instance, Node.js has process.on("uncaughtException") for that. And in the browser we can assign a function to the special window.onerror property, that will run in case of an uncaught error.

//The Syntax:
/**
window.onerror = function(message, url, line, col, error) {
  // ...
};
 */

//message: Error message.
// url: URL of the script where error happened.
// line, col: Line and column numbers where error happened.
// error: Error object.

//ex:
window.onerror = function(message, url, line, col, error) {
    console.log(`${message}\n At ${line}:${col} of ${url}`);
};

function readData() {
    badFunc(); // Whoops, something went wrong!
}

readData();

//in above example, we still get the error on console (meaning script do dies) but also get string 'Uncaught ReferenceError: badFunc is not defined At 399:5 of http://127.0.0.1:5500/tut1.js'

//The role of the global handler window.onerror is usually not to recover the script execution – that’s probably impossible in case of programming errors, but to send the error message to developers.





/*
There are also web-services that provide error-logging for such cases, like https://muscula.com or https://www.sentry.io.

They work like this:

// We register at the service and get a piece of JS (or a script URL) from them to insert on pages.
// That JS script sets a custom window.onerror function.
// When an error occurs, it sends a network request about it to the service.
// We can log in to the service web interface and see errors.
*/

//Tasks

//task1

//Advantages of using 'finally'

//if catch throws error which will kill the script then still finally runs
//'finally' clause works in any exit from try...catch

/**
function f() {
  try {
    alert('start');
    return "result";
  } catch (err) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
 */

//finally works here too, despite 'return'