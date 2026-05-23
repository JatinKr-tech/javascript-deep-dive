let user = {
    name : "Jatin",
    age : 19,
}; //it keeps updating

console.log(user);

user.dob = "31st of january"; //works
// user.like AfterEffects = true; //gives syntax error, instead like like this below:

user["likes AfterEffects?"] = true; 
user["likes watching soccer?"] = false; 

delete user["likes AfterEffects?"];

console.log(user.name, user.age, user["likes watching soccer?"]); //Jatin 19 false

console.log(user["Game Name"], user.name); //undefined, Jatin

console.log(user.name, user.age, user["likes AfterEffects?"]); //Jatin 19 undefined

let key_anime = "Does he like Attack on Titan Anime?";

// user.key_anime = true; //key_anime = true
user[key_anime] = true; //Does he like Attack on Titan Anime? : true

let key_gameName = prompt("Enter your Game Name please!", "LMAOFactory");
user["Game Name"] = key_gameName;

let key_changeName = prompt("Enter a new Name please!", "Leon Keneddy");
user.name = key_changeName;


console.log(user["Game Name"], user.name); //LMAOFactory, Leon Keneddy
console.log("\n");
console.log(user);