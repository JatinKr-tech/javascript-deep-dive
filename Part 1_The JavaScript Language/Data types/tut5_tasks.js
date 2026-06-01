//tasks

//task1

function camelize(unp) {
    let arr = unp.split('-');
    // console.log(arr);
    let newArr = arr.map((item, index) => (index>0)? item[0].toUpperCase(0,1) + item.slice(1) : item);
    // console.log(newArr);
    let newStr = newArr.join("");
    return newStr

};

console.log(camelize("background-color")); //backgroundColor
console.log(camelize("my-short-string")); //myShortString


//task2

/*
function filterRange(arr, x, y) {
    let filtered = arr.map(function (item) { //what we will do with those who don't fullfill the condition, something has to be printed in place of them
        if (x <= item && y > item) return item
    })
    return filtered
}; 
*/

function filterRange(arr, x, y) {
    return arr.filter((item) => (x <= item && y >= item))
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);
console.log( filtered ); // 3,1 (matching values)
console.log(arr);

//task3

//O(n)^2 time complexity
function filterRangeInPlace(arr, x, y){
    let arrayToBeDeleted = arr.filter((item) => !(x <= item && y >= item))
    for (item of arrayToBeDeleted) {
        let indexes = arr.indexOf(item);
        arr.splice(indexes, 1);
    }
};

//O(n) time complexity, //Two Pointer
function filterRangeInPlace2(arr, x, y) {
    let writeIndex = 0;
    for (let i = 0; i < arr.length; i++){
        if(x <= arr[i] && y >= arr[i]){
            arr[writeIndex] = arr[i]
            writeIndex++
        }
    }
    arr.length = writeIndex;
}

let arr2 = [5, 3, 8, 1];

filterRangeInPlace2(arr2, 1, 4);
console.log(arr2);

filterRangeInPlace(arr2, 1, 4);
console.log(arr2);

//task4

let arr3 = [5, 2, 1, -10, 8];

arr3.sort((a,b) => b-a);
console.log(arr3);

//task5
/*
function copySorted (arr){
    // let copyArr = arr.map((item)=>item);
    let copyArr = arr.filter(()=>true);

    return copyArr.sort((a,b) => a.localeCompare(b))
};
*/
function copySorted(arr) {
  return arr.slice().sort();
}

let arr4 = ["HTML", "JavaScript", "CSS"];
console.log(copySorted(arr4));
console.log(arr4)

//task6

/*
let str5 = '1 + 2';


function Calculator(str){
    let newArr = str.split(" ");
    let a = +newArr[0];
    let op = newArr[1];
    let b = +newArr[2];
    //i can use if else
    let obj = new function calculator(){
        this.methods = {
            "+": (a,b) => a + b,
            "-": (a,b) => a - b
        }
    }
    if (!obj.methods[op] || isNaN(a) || isNaN(b)) {
        return NaN;
    }
    return obj.methods[op](a, b);
};

console.log(Calculator(str5))
*/
//Bad way, can't update methods as it is inside a function, lives there and dies there. we don't use 'new' while also declaring function.

function CalculatorObj (){
    this.methods = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b
    };
    this.calculations = function (str){
        let newArr = str.split(" ");
        let a = +newArr[0];
        let op = newArr[1];
        let b = +newArr[2];

        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }
        return this.methods[op](a, b);
    
    };

    this.addMethod = function(name, func) {
        this.methods[name] = func;
    }
}

let str5 = '2 + 3';
let str6 = '2 * 8';

let Calc = new CalculatorObj();

Calc.addMethod("*", (a, b) => a * b);

console.log(Calc.calculations(str5));
console.log(Calc.calculations(str6));

//task7
let john = { name: "John", surname: "Smith", id: 1, age: 25 };
let pete = { name: "Pete", surname: "Hunt", id: 2, age: 30 };
let mary = { name: "Mary", surname: "Key", id: 3, age: 28 };

let users = [ john, pete, mary ];

let names = users.map((item)=>item['name'])

console.log( names ); // John, Pete, Mary

//task8


let usersMapped = users.map((item) => ({
    fullName : `${item['name']} ${item['surname']}`,
    id : item['id']
}));

console.log( usersMapped[0].id ) // 1
console.log( usersMapped[0].fullName ) // John Smith

//task9

let usersArr = [ john, pete, mary];

function sortByAge(arr) {
    arr.sort((a, b) => (a.age - b.age))
};
sortByAge(usersArr);

console.log(usersArr[0].name); // John
console.log(usersArr[1].name); // Mary
console.log(usersArr[2].name); // Pete

//task10

// let arr5 = [1, 2, 3];

function shuffle(arr){
    arr.sort(() => Math.random()-0.5)
};

let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for(let i = 0; i < 100000; i++){
    let arr5 = [1,2,3];
    shuffle(arr5);
    count[arr5.join("")]++;
}

console.log(count) //We get to know that 123 and 213 occurs much more than other possibilities. //So this approach is unrealiable

//Fisher Yates Shuffle Algorithm

//i am memorizing it's core logic as ex: i have 10 boxes each having different colored balls and how i am sorting is that i am gonna take out ball from any box and exchange it with last box next time i will randomly select any box aside that last box and exchange it's ball with second last box and so on... 



function fisherShuffle (arr) {
    
    for(let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
};

let count2 = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 100000; i++ ){
    
    let arr6 = [1,2,3];
    fisherShuffle(arr6);
    let str6 = arr6.join("");
    count2[str6]++

}

console.log(count2);

//task11

//O(n)
function getAverage(arr) {
    let sum = 0
    for(let i = 0; i < arr.length; i++){
        sum += arr[i].age;
    }
    return (sum/arr.length).toFixed(2)
    
};

//same time complexity O(n)

function getAverage(arr) {
    let totalage = arr.reduce((arg, item) => 
        arg + item.age, 0) / arr.length;
    return totalage.toFixed(2);

};

console.log(getAverage(users));

//task12

// both are O(n)2 , Further in the chapter Map and Set we’ll see how to optimize it.
function unique(arr) {
    let array = [];

    /*
    arr.forEach(element => {
        if(!array.includes(element)) {
            array.push(element);
        }
    })
        */
    //prefer for of, why? because it alowes many more funcatonalities such as return, continue, then async,await.

    for (let item of arr) {
        if (!array.includes(item)) {
            array.push(item);
        }
    }

    return array;
}

//O(n)2
function removeDuplicates (arr){
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(strings) ); // Hare, Krishna, :-O
console.log( removeDuplicates(strings) ); // Hare, Krishna, :-O

//task13

let users2 = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

function groupById(arr) {
    return arr.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {});
    
};

let usersById = groupById(users2);
console.log(usersById);