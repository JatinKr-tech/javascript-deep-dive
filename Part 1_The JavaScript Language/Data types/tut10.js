//Destructuring Assignment 

//Array destructuring

let arr1 = ["Mercury", "Venus","Earth", "Mars"];
let[planet1, planet2] = arr1;
console.log(planet1, planet2); //Mercury Venus

let[, toxic, liveable, Future_liveable] = arr1;
console.log(toxic, liveable, Future_liveable); //Venus, Earth, Mars

let[, firstName, lastName] = "Commander Erwin Smith".split(" ");
console.log(firstName, lastName); //Erwin Smith

let[a, b, c, d] = "abcd";
console.log(a, b, c, d); //a b c d

let cena = [
    {name: "Cena"},
    {age: 19}
];
let [something1, something2] = new Set(cena);
console.log(something1, something2); //{name: 'Cena'} //{age: 19}

let obj1 = {};
// [obj1.title, , obj1.name] = "Ser Mormont Jorah".split(" ");
[obj1.title, , obj1.name] = ["Ser", "Mormont", "Jorah"];
console.log(obj1.title, obj1.name); //Ser Jorah

let obj2 = {
    Name: "William",
    Gender: "Male",
    Permit: false, 
};

for(let [enquiry, result] of Object.entries(obj2)) {
    console.log(`${enquiry} is ${result}`);
};

let map = new Map(Object.entries(obj2));
for([a, b] of map){
    console.log(`${a} = ${b}`)
}

//Swap Variables trick
let guest = "Danarys Targaryan";
let Queen = "Cersie";
console.log(`${guest} is guest, ${Queen} is The Queen`); //Danarys Targaryan is guest, Cersie is The Queen
[Queen, guest] = [guest, Queen];
console.log(`${guest} is guest, ${Queen} is The Queen`); //Cersie is guest, Danarys Targaryan is The Queen

//The rest '...'
//Must be the last element

let [, Name1, Surname1, ...everythingElse] = ["Lord", "Eddard", "Stark", "is", "the", "most", "Honorable", "man", "in", "GOT"];

console.log(Name1, Surname1); //Eddard Stark
console.log(everythingElse); //['is', 'the', 'most', 'Honorable', 'man', 'in', 'GOT']

//Default
let[l, m] =[];
console.log(l, m); //undefined undefined


let[name2 = "Anonymous", access2 = true] = [];
console.log(name2, access2); //Anonymous, true

let[name3 = "Anonymous", access3 = true] = ["Jamie Lannister"];
console.log(name3, access3); //Jamie Lannister, true

let[name4 = "Anonymous", access4 = true] = ["Tyrion Lannister", false];
console.log(name4, access4); //Tyrion Lannister, false

let[name5 = prompt("Your name?"), age5 = prompt("Your age?")] = ["Joffery", ];
console.log(name5, age5); //Joffery, prompt() 

let[name6 = prompt("Your name?"), age6 = prompt("Your age?")] = [, 19];
console.log(name6, age6); //prompt(), 19

//................................

//Object Destructuring

//let {var1, var2} = {var1:…, var2:…}
let obj3 = {
    nameUnique: "Eren Jaeger",
    ageUnique: 19,
    titanUnique: true,
    addressUnique: null
};

// let{naam, umar} = obj3; //undefined, undefined cuz can't name just any thing
let{nameUnique, ageUnique} = obj3;
console.log(nameUnique, ageUnique); //Eren Jaeger 19

//The order does not matter
let{addressUnique} = obj3;
console.log(addressUnique, nameUnique); //null 'Eren Jaeger'

//If we want to assign a property to a variable with another name

let {addressUnique: address7, nameUnique: name7, titanUnique: titan, ageUnique: age7} = obj3;
console.log(name7, age7, address7, titan); //Eren Jaeger 19 null true

let options = {
    title: "menu",
    // width: 100,
    // height: 200,
}

let {width = 100, height = 200, title = "unspecified"} = options;
console.log(title, width, height); //menu 100 200

let {width: w1 = 100, height: h1 = 200, title : t1 = "i don't know!"} = options;
console.log(t1, w1, h1); //menu 100 200

let {width: w2 = prompt("what should be the width?"), 
    height: h2 = 200, 
    title : t2 = "i don't know!"} = options;
console.log(t2, w2, h2); //menu prompt() 200


//The rest '...'Patern
let{title: t3, ...EverythingElseInOptions} = options;
console.log(t3, EverythingElseInOptions);


//If there is no let
let fruit, weight, color;

//Error 
// cuz The problem is that JavaScript treats {...} in the main code flow (not inside another expression) as a code block. Such code blocks can be used to group statements, like this:
/*
{
    // a code block
    let message = "Hello";
    // ...
    alert( message );
    }
    */
// {fruit, weight, color} = {fruit: "Apple", color: "Red", weight: "200gm"}

//So here JavaScript assumes that we have a code block, that’s why there’s an error. We want destructuring instead.

({fruit: fruit101, weight: weight101, color: color101} = {fruit: "Apple", color: "Red", weight: "200gm"});
console.log(fruit101, weight101, color101);

//.............................

//Nested destructuring

let fastfood = {
    quick: "Samosa",
    fried_light: {
        veg: "Paneer roll",
        eggs_only: "Double Egg roll",
        go_to: "Double Egg Chicken roll",
    },
    fried_heavy: ["Chicken tikka", "Chiken roasted", "Chicken nuggets"],
    healthy_options: ["litti", "proper meal"],
    list_complete: false
};

let{
    quick: quick1,
    fried_light:{
        veg: veg1,
        eggs_only: eggs_only1,
        go_to: go_to1
    },
    fried_heavy: [chicken1, chicken2, chicken3],
    healthy_options: healthy_options1,
    list_complete: list_complete1,
    list_title = "fastfood list"
} = fastfood;

console.log(quick1); //Samosa

// console.log(fried_light); //Error
console.log(veg1); //Paneer roll
console.log(eggs_only1); //Double Egg roll
console.log(go_to1); //Double Egg Chicken roll

// console.log(fried_heavy); //Error
console.log(chicken1); //Chicken tikka
console.log(chicken2); //Chiken roasted
console.log(chicken3); //Chicken nuggets

console.log(healthy_options1); //['litti', 'proper meal']

console.log(list_complete1); //false
console.log(list_title); //fastfood list

// Note that there are no variables for fried_light and fried_heavy, as we take their content instead.

//.................................

//Smart Function Parameters

let parameter_options = {
    title: "Really Big Project",
    some_properties : [21, true],
    some_more_properties : ["Ghost", "Price", "Samantha"]
};

function somefunc({
    title: t21 = "Not Specified", 
    height: h21 = 100, 
    width: w21 = 300, 
    // some_properties: [arg21 = null, arg22 = false], //if our argument is empty then it wont be able to destructure it's array so for that case we give it a default value, an empty array:
    some_properties: [arg21 = null, arg22 = false] = [],
    some_more_properties: p22 = ["name21", "name22", "name23"]
    // some_more_properties: p22
} = {}){
    console.log(t21);
    console.log(h21);
    console.log(w21);
    console.log(arg21);
    console.log(arg22);
    console.log(p22);
};

//'={}' in the end sets the default value if we don't give any argument, not even an empty object like this somefunc({}), we can do:
somefunc();

// somefunc(parameter_options);