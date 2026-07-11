//Generators

// Regular functions return only one, single value (or nothing).

// Generators can return (“yield”) multiple values, one after another, on-demand. They work great with iterables, allowing to create data streams with ease.

//............................

//Generator functions

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

//Generator functions behave differently from regular ones. When such function is called, it doesn’t run its code. Instead it returns a special object, called “generator object”, to manage the execution.

let generator = generateSequence();

// alert(generator); // [object Generator]
console.log(generator); //generateSequence {<suspended>}

//The function code execution hasn’t started yet

//The main method of a generator is next(). When called, it runs the execution until the nearest yield <value> statement (value can be omitted, then it’s undefined). Then the function execution pauses, and the yielded value is returned to the outer code.

//The result of next() is always an object with two properties:

// value: the yielded value.
// done: true if the function code has finished, otherwise false.

let one = generator.next();
console.log(typeof one); //object
console.log(one); //{value: 1, done: false}


//Let’s call generator.next() again. It resumes the code execution and returns the next yield:
let two = generator.next();
console.log(two); //{value: 2, done: false}

let three = generator.next();
console.log(three); //{value: 3, done: true}

//New calls to generator.next() don’t make sense any more.
// let four = generator.next();
// console.log(four); //{value: undefined, done: true}

//...........................

//Generators are iterable

for(let value of generator) {
  console.log(value); 
}; //this for of iterator doesn't work for generator here because generator has already been called by next multiple times, and so it's execution is complete and returns obj with key done equale to true, which makes for of loop to ignore it.

function* generateSequence2() {
  yield 1;
  yield 2;
  return 3;
}

let generator2 = generateSequence2();

for(let value of generator2) {
  console.log(value); // 1, then 2
}

//

function* generateSequence3() {
  yield 1;
  yield 2;
  yield 3;
}

let generator3 = generateSequence3();

for(let value of generator3) {
  console.log(value); // 1, 2, 3
};

//with spread operator
let sequence3 = [0, ...generateSequence3()];
console.log(sequence3); //[0, 1, 2, 3]

//.................................

//Using generators for iterables

//In chapter Iterables we created an iterable range object that returns values from..to.

let range = {
  from: 1,
  to: 5,

  // for..of range calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// iteration over range returns numbers from range.from to range.to
console.log([...range]); //[1, 2, 3, 4, 5]

//Using Generator instead:

let range2 = {
    from : 1,
    to : 5,
    *[Symbol.iterator]() {
        for(let value = this.from; value <= this.to; value++){
            yield value
        }
    }
}
console.log(...range2); //1, 2, 3, 4, 5

//Important:

//Generators may generate values forever
// In the examples above we generated finite sequences, but we can also make a generator that yields values forever. For instance, an unending sequence of pseudo-random numbers.
// That surely would require a break (or return) in for..of over such generator. Otherwise, the loop would repeat forever and hang.

//................................

//Generator composition

//yeild* syntax to “embed” (compose) one generator into another.

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str); //0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

//A generator composition is a natural way to insert a flow of one generator into another. It doesn’t use extra memory to store intermediate results.

//....................................

//“yield” is a two-way street

//yield is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.

function* gen() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)

  console.log(result);
}

let generator4 = gen();

let question4 = generator4.next().value; // <-- yield returns the value
console.log(question4); //2 + 2 = ?

generator4.next(4); // --> pass the result into the generator

//

function* gen2() {
  let ask1 = yield "2 + 2 = ?";

  console.log(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  console.log(ask2); // 9
}

let generator5 = gen2();
console.log(generator5.next().value)
console.log(generator5.next(3))

console.log( generator5.next().value ); // "2 + 2 = ?"
// console.log( generator5.next().value );

console.log( generator5.next(4).value ); // "3 * 3 = ?"

console.log( generator5.next(9).done ); // true

//.........................

//generator.throw

//As we observed in the examples above, the outer code may pass a value into the generator, as the result of yield.

// …But it can also initiate (throw) an error there. That’s natural, as an error is a kind of result.

// To pass an error into a yield, we should call generator.throw(err). In that case, the err is thrown in the line with that yield.

function* gen3() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    console.log(e); // shows the error
  }
}

let generator6 = gen3();

let question6 = generator6.next().value;

generator6.throw(new Error("The answer is not found in my database")); // (2)

//The error, thrown into the generator at line (2) leads to an exception in line (1) with yield. In the example above, try..catch catches it and shows it.

// If we don’t catch it, then just like any exception, it “falls out” the generator into the calling code.

// The current line of the calling code is the line with generator.throw, labelled as (2). So we can catch it here, like this:

function* generate7() {
  let result = yield "2 + 2 = ?"; // Error in this line
}

let generator7 = generate7();

let question = generator7.next().value;

try {
  generator7.throw(new Error("The answer is not found in my database"));
} catch(e) {
  console.log(e); // shows the error
};

//generator.return

// generator.return(value) finishes the generator execution and return the given value.

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

console.log(g.next());        // { value: 1, done: false }
console.log(g.return('foo')); // { value: "foo", done: true }
console.log(g.next());        // { value: undefined, done: true }

//If we again use generator.return() in a completed generator, it will return that value again

//Often we don’t use it, as most of time we want to get all returning values, but it can be useful when we want to stop generator in a specific condition.
