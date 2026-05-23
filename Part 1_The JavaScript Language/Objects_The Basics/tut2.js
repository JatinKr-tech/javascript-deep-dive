//Object refrences and copying
let country1 = {
    Name : "India",
}

let country2 = country1;
country2.Name = "Japan"; //Changes for country1 obj too.
console.log(country1, country2);
console.log(country1 == country2); //true
console.log(country1 === country2); //true

let cloth = {};
let fruit = {};

console.log(cloth == fruit); //false
console.log(cloth === fruit); //false

//
let user = {
    name : "Jatin",
    age : 19,
};

// let userClone;   //syntax error
let userClone = {};

for (let key in user) {
    userClone[key] = user[key];
};

userClone["name"] = "Leon";

console.log(user);  //name: Jatin
console.log(userClone)  //name:Leon

//
//Object.assign(dest, ...Sources);

let entry1 = {height : "5,11"};
let entry2 = {"access to the building" : true};

Object.assign(user, entry1, entry2); //user has all these properties now, name, age, height, access to the building. //Since this code was executed after userClone so userClone didn't get "height" and "access to the building" properties.

//Cloning using Object.assign();
let userClone2 = Object.assign({}, user);
console.log(userClone2); //name, age, height, access to the building

console.log(userClone2 == user, userClone2 === user); //false, meaning they are seperate objects completely and changing one won't effect other.

// userClone2["age"] = 20; //changes age only in userClone2 and not in user object.

user["name"] = "pete"; //only changes user.


//..........................

let profile = {
    name : "Agatha",
    age : "35",
    Coding : {
        javascript : true,
        typescript : true,
        python : false,
    },
}

console.log(profile);
console.log(profile.Coding.javascript);

let profileClone = {};

for (let key in profile) {
    profileClone[key] = profile[key];
}

console.log(profileClone);

console.log(profileClone === profile); //false, meaning they are seperate objects, changes in one won't affect the other except for Coding object inside them, see below.
console.log(profileClone.Coding === profile.Coding); //true, meaning they share coding object, changes in eithers coding object will effect others coding object.

let profileClone2 = Object.assign({}, profile);
console.log(profileClone2);
console.log(profileClone2 === profile); //false, meaning they are seperate objects, changes in one won't affect the other except for Coding object inside them, see below.
console.log(profileClone2.Coding === profile.Coding); //true, meaning they share coding object, changes in eithers coding object will effect others coding object.

// profileClone2.Coding["typescript"] = false; //Changes even in profile.

//So we need a different way to clone!! We need deep cloning, which clones structure as well.

//StructuredClone()

let profileClone3 = structuredClone(profile);

console.log(profileClone3)
console.log(profileClone3 === profile); //false, meaning they are seperate objects, changes in one won't affect the other except for Coding object inside them, see below.
console.log(profileClone3.Coding === profile.Coding); //false, meaning they don't share coding object, changes in one's coding object will not effect other coding object. 
//That's the profit of using structuredClone().

profileClone3.Coding["typescript"] = false; //changes only in profileClone3.
profileClone3.Coding.python = true; //changes only in profileClone3. Can do changes this way too.


//StructuredClone() also supports cloning of object property refrencing the object itself (Circular Refrences) too.

let circularRefrence = {};

circularRefrence.me = circularRefrence;
console.log(circularRefrence.me === circularRefrence); //true


let circularRefrenceClone = structuredClone(circularRefrence);
console.log(circularRefrenceClone.me === circularRefrenceClone); //true, meaning structuredClone() function also copied circular refrence perfectly.

console.log(circularRefrenceClone.me === circularRefrence.me); //false, meaning they are diff, which is obvious.

//There are limitations with structuredClone() function too, it can't copy object containing function like this:

let objectContainingFunc = {
    func1 : function(){},
}

// let objectContainingFuncClone = structuredClone(objectContainingFunc); //error
//To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance _.cloneDeep(obj) from the JavaScript library lodash.


