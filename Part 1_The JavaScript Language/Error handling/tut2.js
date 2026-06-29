//Custom errors, extending Error

//JavaScript allows to use throw with any argument, so technically our custom error classes don’t need to inherit from Error. But if we inherit, then it becomes possible to use obj instanceof Error to identify error objects. So it’s better to inherit from it.

//................................

//Extending Error

// The "pseudocode" for the built-in Error class defined by JavaScript itself
/*
class Error {
    constructor(message) {
        this.message = message;
        this.name = "Error"; // (different names for different built-in error classes)
        this.stack = <call stack>; // non-standard, but most environments support it
    }
}
    */

// Now let’s inherit ValidationError from it and try it in action:

class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends MyError {};

function test() {
    throw new ValidationError("Whoops!");
};

try {
    test();
} catch(err) {
    console.log(err.message); // Whoops!
    console.log(err.name); // ValidationError
    console.log(err.stack); // a list of nested calls with line numbers for each
};

// Usage
function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new ValidationError("No field: age");
    }
    if (!user.name) {
        throw new ValidationError("No field: name");
    }

    return user;
};

// Working example with try..catch

try {
    let user = readUser('{ "age": 25 }');
} catch (error) {
    if (error instanceof ValidationError) {
        console.log("Invalid data: " + error.message); // Invalid data: No field: name
    } else if (error instanceof SyntaxError) { // (*)
        console.log("JSON Syntax Error: " + error.message);
    } else {
        throw error; // unknown error, rethrow it (**)
    }
};

// ...
// instead of (err instanceof SyntaxError)
// } else if (err.name == "SyntaxError") { // (*)
// ...

//Why instanceof is better?
//because it is future proof, in future we are going to extend lets say SyntaxError and make subtypes of it, in that case we would have to write new err.name everytime, but instanceof SyntaxError would work for even those subtypes. 

//..................................

//Further inheritance

class PropertyRequiredError extends ValidationError {
    constructor(property){
        super(`Property missing: ${property}`);
        // this.name = "PropertyRequiredError";
        this.property = property;
    }
};

function readUser1(json2){
    let user2 = JSON.parse(json2);

    if(!user2.name) throw new PropertyRequiredError('name');
    if(!user2.age) throw new PropertyRequiredError('age');
};

try {
    readUser1(`{"name" : "Jatin"}`)
} catch (error) {
    if(error instanceof ValidationError){
        console.log(error);
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
        console.log(error.property);
    } else if (error instanceof SyntaxError){
        console.log(error);
    } else{
        throw error;
    };
};

//.........................................

//Wrapping exceptions

class readError extends Error {
    constructor(message, cause){
        super(message);
        this.name = 'Read Error'
        this.cause = cause;
    }
};

class MyError2 extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError2 extends MyError2 {};
class PropertyError2 extends ValidationError2 {
    constructor(property) {
        super(`Property missing: ${property}`);
        this.property = property;
    }
};

function validateUser(user){
    if(!user.name) throw new PropertyError2('name');
    if(!user.age) throw new PropertyError2('age');
};

function readUser2(json){
    let user;

    try {
        user = JSON.parse(json);
    } catch (error) {
        if(error instanceof SyntaxError) {
            throw new readError("Syntax Error", error);
        } else {
            throw error;
        }
    }

    try {
        validateUser(user)
    } catch (error) {
        if(error instanceof ValidationError2) {
            throw new readError("Property Missing", error);
        } else {
            throw error;
        }
    }

}

try {
    // readUser2(`{"Data Bad Data"}`)
    readUser2(`{"Data": "Bad Data"}`)
} catch (error) {
    if(error instanceof readError){
        console.log(error);
        console.log(error.message);
        console.log(error.cause);

        console.log("Original error: ", error.cause)
    } else {
        throw error;
    }
}

//................................

//Tasks

//task1

class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

let err = new FormatError("formatting error");

console.log( err.message ); // formatting error
console.log( err.name ); // FormatError
console.log( err.stack ); // stack

console.log( err instanceof FormatError ); // true
console.log( err instanceof SyntaxError ); // true (because inherits from SyntaxError)