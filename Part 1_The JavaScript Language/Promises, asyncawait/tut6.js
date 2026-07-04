//Promisification

//It’s the conversion of a function that accepts a callback into a function that returns a promise.

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})

let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// usage:
// loadScriptPromise('path/script.js').then(...)

//As we can see, the new function is a wrapper around the original loadScript function. It calls it providing its own callback that translates to promise resolve/reject.

//

function promisify(f){
    return function(...args){
        return new Promise((resolve, reject)=>{
            function callback(err, result){
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                };
            };
            args.push(callback);
            f.call(this, ...args);
        })
    }
}

let loadScriptPromise1 = promisify(loadScript);
loadScriptPromise1('/script2.js')
    .then(result=>console.log(`${result.src} has been loaded successfully!!`))
    .catch(err=>console.log(err.message));
loadScriptPromise1('/script22.js')
    .then(result=>console.log(`${result.src} has been loaded successfully!!`))
    .catch(err=>console.log(err.message));

//

function loadScript2(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script, "LoL", "LMAO", "Xd");
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

function promisify2(f, manyArgs = false){
    return function(...args){
        return new Promise((resolve, reject)=>{
            function callback(err, ...results){
                if(err) {
                    reject(err);
                } else {
                    resolve(manyArgs? results: results[0])
                };
            };
            args.push(callback);
            f.call(this, ...args);
        })
    }
};

let loadScriptPromise2 = promisify2(loadScript2, true);
loadScriptPromise2('/script1.js')
    .then(result => console.log(result)) //[script, 'LoL', 'LMAO', 'Xd']
    .catch(err => console.log(err));

//As you can see it’s essentially the same as above, but resolve is called with only one or all arguments depending on whether manyArgs is truthy.

// For more exotic callback formats, like those without err at all: callback(result), we can promisify such functions manually without using the helper.

// There are also modules with a bit more flexible promisification functions, e.g. es6-promisify. In Node.js, there’s a built-in util.promisify function for that.

//Please note:
// Promisification is a great approach, especially when you use async/await (covered later in the chapter Async/await), but not a total replacement for callbacks.

// Remember, a promise may have only one result, but a callback may technically be called many times.

// So promisification is only meant for functions that call the callback once. Further calls will be ignored.