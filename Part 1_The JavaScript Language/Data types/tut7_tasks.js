//task1
function unique(arr) {
  return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(values) ); // Hare, Krishna, :-O

//task2

let arr1 = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];


function aclean(arr){
    let map = new Map();
    for(word of arr){
        let sorted = word.toLowerCase().split('').sort().join("");
        map.set(sorted, word)
    }
    return Array.from(map.values());
}

console.log( aclean(arr1) ); // "nap,teachers,ear" or "PAN,cheaters,era"



//task3
//cuz it returns an iterable object not Array