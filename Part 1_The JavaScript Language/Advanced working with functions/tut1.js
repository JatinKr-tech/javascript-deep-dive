//Recursion and stack

function pow(x, n){
    if (n === 1) return x;
    return x * pow(x,n-1);
};

console.log(pow(2, 3));






//

let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};
/*
//to understand it eaisly
function r1(obj) {
    let sum = 0;
    if(Array.isArray(obj)){
        for(let item of obj){
            sum += item.salary;
        }
        return sum;
    }
    if(typeof obj == 'object'){
        for(let value of Object.values(obj)) {
            sum += r1(value);
        };
        return sum;
    };

    return sum;
};
*/

function r1(obj) {
    if(Array.isArray(obj)){
        return obj.reduce((total, item) => total += item.salary, 0)
    }

    let sum = 0;
    for(let value of Object.values(obj)) {
        sum += r1(value);
    };
    return sum;
};

console.log(r1(company));

//......................

//Recursive structures

//list

let list1 = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: {
                    value: 5,
                    next: null
                }
            }
        }
    }
};

let list2 = {value: 1};
list2.next = {value : 2}
list2.next.next = {value : 3}
list2.next.next.next = {value : 4}
list2.next.next.next.next = {value : 5}
list2.next.next.next.next.next = {value : null}


//to split
let secondlist = list2.next.next;
list2.next.next = null;
console.log(secondlist);

//to join
list2.next.next = secondlist;

//to add 

//from head

list2 = {value: "new item", next: list2};
list2.next = list2.next.next;
console.log(list2); //"new item", 2,3,4,5


//from wherever i want.
list1.next.next = {value: "new item at 3", next: list1.next.next.next};
console.log(list1); //1,2,"new item at 3",4,5

//list's are better than arrays in only some usecases, so don't use it everywhere
//Unlike arrays, there’s no mass-renumbering, we can easily rearrange elements.
//The main drawback is that we can’t easily access an element by its number. In an array that’s easy: arr[n] is a direct reference. But in the list we need to start from the first item and go next N times to get the Nth element.

//Lists can be enhanced:

// We can add property prev in addition to next to reference the previous element, to move back easily.
// We can also add a variable named tail referencing the last element of the list (and update it when adding/removing elements from the end).
// …The data structure may vary according to our needs.


