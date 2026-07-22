import './script1.js'; //Shows nothing because script1.js was first imported in tut1.js

import {admin} from './script1.js';
console.log(admin.name); // Pete instead of John

//Very useful, what we can do :--

//A module exports some means of configuration, e.g. a configuration object.
// On the first import we initialize it, write to its properties. The top-level application script may do that.
// Further imports use the module.
