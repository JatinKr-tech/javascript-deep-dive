//Introduction: callbacks

/*
function loadScript(src) {
    // creates a <script> tag and append it to the page
    // this causes the script with given src to start loading and run when complete
    let script = document.createElement('script');
    script.src = src;

    console.log(typeof script); //object
    console.log(script); //script{...}
    console.log(script.outerHTML); //<script src="/script1.js"></script>
    console.log(script.__proto__); //HTMLScriptElement {…}

    let fds1 = document.head.append(script);
    console.log(fds1); //undefined
}

// load and execute the script at the given path
console.log("Before loadScript");

loadScript('/script1.js');

// func1('Jatin'); //ReferenceError: func1 is not defined //doesn't work

console.log("after loadScript");
setTimeout(()=>console.log("Runs after 1 second"), 1000)
setTimeout(()=>func1('Jatin'), 1000); //Jatin //works
*/
//

/*
function loadScript2(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    // script.onload = () => func1('Tony'); //even this works
    script.onload = () => callback(script);
    // script.onload = callback; //works
    document.head.append(script); 
};


loadScript2('/script1.js', function(){
    func1('Hagrid')
});
*/

//The onload event is described in the article Resource loading: onload and onerror, it basically executes a function after the script is loaded and executed.

function loadScript3(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script); 
};

loadScript3('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    console.log(`The script of given link: ${script.src} has been loaded`); //The script of given link: https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js has been loaded
    console.log( _ );
});

//........................................

//Callback in callback

/*
loadScript3('/script1.js', function(script){
    loadScript3('/script2.js', function(script){
        loadScript3('/script3.js', function(script){

        })
    })
});
*/

//So, every new action is inside a callback. That’s fine for few actions, but not good for many, so we’ll see other variants soon.

//Handling errors

function loadScript4(src, callback){
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`There was error loading script: ${script}`));

    document.head.append(script);
};

// loadScript4('/script1111.js', function(err, script){
loadScript4('/script1.js', function(err, script){
    if(err){
        console.log(err.stack);
    } else {
        console.log(`Woah!, loaded ${script.src}`)
    }
});

//..........................................

//Bad ways of writing loadScript:

//Pyramid of Doom / callback hell

/*

loadScript4('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript4('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript4('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...continue after all scripts are loaded (*)
          }
        });

      }
    });
  }
});

//In the code above:

// We load 1.js, then if there’s no error…
// We load 2.js, then if there’s no error…
// We load 3.js, then if there’s no error – do something else.

//namespace cluttering

loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}
  */