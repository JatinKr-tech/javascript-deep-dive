//JSON methods, toJSON

//JSON 
// JSON supports plain objects, arrays, strings, numbers, booleans, and null.

const mySymb = Symbol("hiddenKey");

let obj1 = {
    name: 'Jatin',
    age: 19,
    hobby: ['Coding', "VollyBall", "GraphicAnimation"],
    "like to eat" : {atHome: 'rice', "fast food": 'Samosa'},
    "likes to pet cats?" : true,
    meth: function(){console.log("This method has been called")}, //ignored by JSON
    [mySymb] : "fds", //ignored by JSON
    "likes Cricket": undefined, //ignored by JSON
};

console.log(obj1)

let obj2 = {
    webDev : ["JavaScript", "TypeScript", "NodeJS", "MySQL", "React", "NextJS"],
    DSA : ["Java", "JavaScript", "C++", "Python"],
    AppDev: ["Java", "Swift"]
}

//JSON does not support "Circular references" but one way references are ok:
obj1.ref = obj2;

let JSONfied_obj1 = JSON.stringify(obj1, null, 2); 
/**
 {
  "name": "Jatin",
  "age": 19,
  "hobby": [
    "Coding",
    "VollyBall",
    "GraphicAnimation"
  ],
  "like to eat": {
    "atHome": "rice",
    "fast food": "Samosa"
  },
  "likes to pet cats?": true,
  "ref": {
    "webDev": [
      "JavaScript",
      "TypeScript",
      "NodeJS",
      "MySQL",
      "React",
      "NextJS"
    ],
    "DSA": [
      "Java",
      "JavaScript",
      "C++",
      "Python"
    ],
    "AppDev": [
      "Java",
      "Swift"
    ]
  }
}
 */
console.log(JSONfied_obj1);

//.............................

//Excluding and transforming: replacer

let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

console.log( JSON.stringify(meetup, ['title', 'participants']) );
// {"title":"Conference","participants":[{},{}]}

console.log( JSON.stringify(meetup, ['title', 'participants', 'name']) );
//{"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}]}

console.log( JSON.stringify(meetup, ['title', 'participants', "name", "place"]) );
//{"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{}}

console.log( JSON.stringify(meetup, ['title', 'participants', "name", "place", "number", "fdsljl"]) );
//{"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}

// console.log( JSON.stringify(meetup, ['title', 'participants', "name", "place", "number", "occupiedBy"]) ); //error, circular refrencing



console.log(JSON.stringify(meetup, function replacer(key, value){
    console.log(`${key}: ${value}`);
    return (key == 'occupiedBy')? undefined: value;
}));

/* key:value pairs that come to replacer:
:             [object Object] //{"": meetup} meetup is the object so that's why.
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/

// The idea is to provide as much power for replacer as possible: it has a chance to analyze and replace/skip even the whole object if necessary.

//....................

//Formatting: space
//for pretty formatting

let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

console.log(JSON.stringify(user, null, 2)); //2indents spacing
console.log(JSON.stringify(user, null, "fds")); //added "fds" at the begning of each property even for nested ones
console.log(JSON.stringify(user, null, "\n")); //added empty lines

//............................

//Custom "toJSON"

let room1 = {
    number : 23
}
console.log(JSON.stringify(room1)); //{"number":23}


let room2 = {
    number : 23,
    toJSON(){
        return this.number;
    }
};

console.log(JSON.stringify(room2)) //23

let meetup2 = {
  title: "Conference",
  room2
};

console.log(JSON.stringify(meetup2)); //{"title":"Conference","room2":23}

//.......................

//JSON.parse

let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

console.log( numbers ); //[0, 1, 2, 3]
console.log( numbers[1] ); // 1

let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user1 = JSON.parse(userData);

console.log( user1 ); //{name: 'John', age: 35, isAdmin: false, friends: Array(4)}
console.log( user1.friends[1] ); // 1

/*
let json = `{
  name: "John",                     // mistake: property name without quotes
  "surname": 'Smith',               // mistake: single quotes in value (must be double)
  'isAdmin': false                  // mistake: single quotes in key (must be double)
  "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
*/

// There’s another format named JSON5, which allows unquoted keys, comments etc. But this is a standalone library, not in the specification of the language.

//......................

//using reviver

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup3 = JSON.parse(str);
let meetup31 = JSON.parse(str, function reviver(key, value){
    if(key == "date"){
        return new Date(value);
    }
    return value;
})

// console.log( meetup3.date.getDate() ); // Error!
console.log( meetup31.date.getDate() ); // 30

//works for nested objects as well

let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

console.log( schedule.meetups[1].date.getDate() ); //18, works!

//tasks, easy