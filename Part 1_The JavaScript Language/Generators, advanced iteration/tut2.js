//Async iteration and generators

//Recall iterables

let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() { // called once, in the beginning of for..of
        return {
            current: this.from,
            last: this.to,

            next() { // called every iteration, to get the next value
                if (this.current <= this.last) {
                return { done: false, value: this.current++ };
                } else {
                return { done: true };
                }
            }
        };
    }
};

for(let value of range) {
    console.log(value); // 1 then 2, then 3, then 4, then 5
}

//..................

//Async iterables

//To make an object iterable asynchronously:

// Use Symbol.asyncIterator instead of Symbol.iterator.
// The next() method should return a promise (to be fulfilled with the next value).
    // The async keyword handles it, we can simply make async next().
// To iterate over such an object, we should use a for await (let item of iterable) loop.
    // Note the await word.

let range1 = {
    from : 1,
    to : 5,
    [Symbol.asyncIterator](){
        return {
            current : this.from,
            last : this.to,

            async next(){
                await new Promise((resolve, reject)=>setTimeout(resolve, 1000));
                // await new Promise(resolve => setTimeout(resolve, 1000));

                if (this.current <= this.last) {
                    return { done: false, value: this.current++ }
                } else {
                    return { done: true }
                };
            }
        };
    }
};

(async () => {

  for await (let value of range1) { // (4)
    console.log(value); // 1,2,3,4,5
  }

})()

/*
//Doesn't work
for (const element of range1) {
    console.log(element)
};
*/

//The spread syntax ... doesn’t work asynchronously

// console.log( [...range1] ); // Error, no Symbol.iterator
// That’s natural, as it expects to find Symbol.iterator, not Symbol.asyncIterator.

// It’s also the case for for..of: the syntax without await needs Symbol.iterator.

//.............................

//Recall generators

//In regular generators we can’t use await. All values must come synchronously, as required by the for..of construct.

//............................

//Async generators (finally)

async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // Wow, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(11, 15);
  for await (let value of generator) {
    console.log(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }

})();

//Under the hood difference

//For async generators, the generator.next() method is asynchronous, it returns promises.

// In a regular generator we’d use result = generator.next() to get values. In an async generator, we should add await, like this:

// result = await generator.next();

//Async iterable range

let range2 = {
  from: 21,
  to: 25,

  // this line is same as [Symbol.asyncIterator]: async function*() {
  async *[Symbol.asyncIterator]() {
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for await (let value of range2) {
    console.log(value); // 1, then 2, then 3, then 4, then 5
  }

})();

//

//Please note:
// Technically, we can add both Symbol.iterator and Symbol.asyncIterator to the object, so it’s both synchronously (for..of) and asynchronously (for await..of) iterable.

// In practice though, that would be a weird thing to do.

//......................................

//Real-life example: paginated data

async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}

(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 50) { // let's stop at 100 commits
      break;
    }
  }

})();

//If yield pauses the function, how does it loop through the 30 commits, but then magically "stop" to wait for the next page?

//yield does pauses the generator function (it doesn't loop through automatically through the 30 commits) but actually, for await...of is calling (next method) generator function repeatedly for every yield and that's why it's looping.