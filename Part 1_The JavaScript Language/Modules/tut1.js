//Modules, introduction

// AMD, CommonJS, UMD -Part of history 

//.........................

//What is a module?

//A module is just a file. One script is one module. As simple as that.

//As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute <script type="module">.

//Import, Export

import {sayHi} from './script1.js'

console.log(sayHi);
sayHi("Steve");

// document.body.innerHTML = sayHi('John');

/*
import {abc} from './script1.js'
abc("lmao")
//SyntaxError: The requested module './script1.js' does not provide an export named 'abc'
*/

//Note:

//Modules work only via HTTP(s), not locally
// If you try to open a web-page locally, via file:// protocol, you’ll find that import/export directives don’t work. 
// Use a local web-server, such as static-server or use the “live server” capability of your editor, such as VS Code Live Server Extension to test modules.

//.................................

//Core module features

//What’s different in modules, compared to “regular” scripts?

// There are core features, valid both for browser and server-side JavaScript.

//

//Always “use strict”
// Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.

// a = 5; //tut1.js:39 Uncaught ReferenceError: a is not defined

//

//Module-level scope //read about it in docs

//Modules should export what they want to be accessible from outside and import what they need.

//
//If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.

// The one-time evaluation has important consequences, that we should be aware of.


//A module code is evaluated only the first time when imported

import './script1.js'; //Module is evaluated!
import './script1.js'; //Shows nothing
//The second import shows nothing, because the module has already been evaluated.

import {admin} from './script1.js';
admin.name = "Pete";
console.log(admin); //{name: 'Pete'}

//

//import.meta

//The object import.meta contains the information about the current module.

// Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML:

console.log(import.meta); //{url: 'http://127.0.0.1:5500/tut1.js', resolve: ƒ}

//

//In a module, “this” is undefined

//In a module, top-level this is undefined.

// Compare it to non-module scripts, where this is a global object:

console.log(this); //undefined

//.................................

//Browser-specific features

//There are also several browser-specific differences of scripts with type="module" compared to regular ones.

//

//Module scripts are deferred

//modules load after whole html page is loaded, normal scripts don't do that, they load immediately

//While building application we should put loading indicators for module so visitor is not confused by funcationality not working as module haven't loaded yet

//

//Async works on inline scripts

//async module is basically standard script which can import stuff like a differ module does and it doesn't block execution of html which a standard/differ module does.

//

//External scripts

//External scripts that have type="module" are different in two aspects:

//1) External scripts with the same src run only once:

//2) External scripts that are fetched from another origin (e.g. another site) require CORS headers, described in the chapter Fetch: Cross-Origin Requests.
//In other words, if a module script is fetched from another origin, the remote server must supply a header Access-Control-Allow-Origin allowing the fetch.

//

//No “bare” modules allowed

// import {sayHi} from 'script1.js'; // Error, "bare" module

//Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.

//

//Compatibility, “nomodule”
/**
<!-- Modern browsers execute this; old browsers ignore it -->
<script type="module" src=""></script>

<!-- Modern browsers ignore this; old browsers execute it -->
<script nomodule src=""></script>
 */

//..............................

//Build tools

//In real-life, browser modules are rarely used in their “raw” form. Usually, we bundle them together with a special tool such as Webpack and deploy to the production server.

// One of the benefits of using bundlers – they give more control over how modules are resolved, allowing bare modules and much more, like CSS/HTML modules.

//.......................

//Summary
// To summarize, the core concepts are:

//1) A module is a file. To make import/export work, browsers need <script type="module">. Modules have several differences:
// Deferred by default.
// Async works on inline scripts.
// To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
// Duplicate external scripts are ignored.
//2) Modules have their own, local top-level scope and interchange functionality via import/export.
//3) Modules always use strict.
//4) Module code is executed only once. Exports are created once and shared between importers.


// When we use modules, each module implements the functionality and exports it. Then we use import to directly import it where it’s needed. The browser loads and evaluates the scripts automatically.

// In production, people often use bundlers such as Webpack to bundle modules together for performance and other reasons.

// In the next chapter we’ll see more examples of modules, and how things can be exported/imported.