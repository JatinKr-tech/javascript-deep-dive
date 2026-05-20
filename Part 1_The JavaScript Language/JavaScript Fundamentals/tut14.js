//Switch case

//task1

// let browser = prompt("What is your browser?", "chrome");

/*
switch (browser) {
    case "edge":
            console.log("You have got an edge");
            
        break;
    case "chrome":
    case "firefox":
    case "safari":
    case "opera": 
            console.log("We support you");
        break;

    default:
            console.log("So Sorry");
        break;
}
*/

/*
if (browser == "edge") {
    console.log("You have got an edge");

} else if (browser == "chrome" || "firefox" || "safari" || "opera") {
    console.log("We support you.");
} else {
    console.log("So Sorry");
};
*/

//task 2

let a = +prompt("?", "");

switch (a) {
    case 0:
        console.log(0);
        break;
        
    case 1:
        console.log(1);
            
        break;
            
    case 2:
    case 3:
        console.log('2,3');
        
        break;

    default:
        console.log("LMAO");
        break;
}
