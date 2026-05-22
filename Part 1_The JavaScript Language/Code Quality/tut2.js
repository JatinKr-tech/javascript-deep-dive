let stringA = "This is a paragraph, once upon a time in the city of ostrin, there was a boy living the life of poor. He was so poor that he didn't even have enough to eat a full time meal 3 times a day. He was forced to do child labor and still didn't managed to earn enough to fill his empty stomach.";

let stringB = `
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
    lorem ipsum lorem ipsum lorem ipsum 

    lorem ipsum lorem ipsum 

    lorem ipsum 
    lorem ipsum 


    lorem ipsum lorem ipsum lorem ipsum 

`;

let x = +prompt("","");
let n = +prompt("","");

function func1(x, n) {
    if (n <= 0) {
        console.log(`Enter a valid power please, this power is not supported ${n}`);
        return;
    };
    alert(pow(x, n));

};

function pow(x, n){
    let value = 1;
    for (let i = 0; i < n; i++){
        value *= x;
    };
    return value;
};

func1(x, n);
