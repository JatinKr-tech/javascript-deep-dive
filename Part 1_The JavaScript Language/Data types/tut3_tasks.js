//task1

let target = "john";

let str1 = target[0].toUpperCase() + target.slice(1);
console.log(str1); //John //would give an error if target is empty string cuz then it tries to read property of undefined

//won't give error:
function ucFirst() {
    if (!target) return target;

    return target[0].toUpperCase() + target.slice(1);

};

console.log(ucFirst()); //John

//task2

function checkSpam(spam) {
    let spamInLowerCase = spam.toLowerCase();
    if (spamInLowerCase.includes("viagra") || spamInLowerCase.includes("xxx")) {
        return true;
    };
    return false;
};

console.log(checkSpam('buy ViAgRA now')); //true
console.log(checkSpam('free xxxxx')); //true
console.log(checkSpam("innocent rabbit")); //false

console.log("\n");

//task3

function truncate(str, len) {
    if (str.length <= len) return str;
    return str.slice(0, --len) + '...';
};

console.log(truncate("What I'd like to tell on this topic is:", 20)); //What I'd like to te...
console.log(truncate("Hi everyone!", 20)); //Hi everyone!

//task 3

function extractCurrencyValue(str) {
  return +str.slice(1);
};

console.log(extractCurrencyValue('$120')) //120

