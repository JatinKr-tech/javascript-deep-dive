//tasks

//task1
/*
function sumTo(n){
    if(n > 0) {
        return (n + sumTo(n-1))
    }
    if (n == 0) return 0
};
*/

function sumTo(n){
    let sum = 0;
    if (n>0){
        sum = n + sumTo(n-1);
    }
    return sum;
}

function sumTo1(n){
    let sum = 0;
    for(let i = n; i > 0; i--){
        sum += i;
    }
    return sum;
}
function sumTo2(n){
    return n*(1+n)/2
}

console.log(sumTo(5)) //slowest, //n times recursion, if n = 100,000. max limit of recursion reached so error.
//time complexity O(n), space complexity O(n)
console.log(sumTo1(5)); //fast
//time complexity O(n), space complexity O(1)
console.log(sumTo2(5)); //fastest
// O(1) in both time and space complexity

//What is tail call?

//task2
/*
function factorial(n) {
    let fac = 1;
    if (n>0){
        fac = fac * n * factorial(n-1)
    }
    return fac;
};
*/
//shorter version of the above
function factorial(n) {

    return (n)? n * factorial(n-1):1;
};

console.log(factorial(5)); //120
console.log(factorial(0)); //1

//for loop would be better even though both have same time complexity O(n) but because of space complexity, for loop O(1) but for recursion it's O(n)

//task3
console.log("\n")


/*
function fib(n) {
    if (n>1){
        return fib(n-1) + fib(n-2)
    };
    if (n == 1){
        return 1;
    };
    return 0;
};
*/
function fib(n){
    return (n>1)? fib(n-1) + fib(n-2): (n==1)? 1: 0; 
};

console.log(fib(0)) //0
console.log(fib(1)) //1
console.log(fib(2)) //1
console.log(fib(3)) //2
console.log(fib(4)) //3
console.log(fib(5)) //5
console.log(fib(6)) //8
console.log(fib(7)) //13
console.log(fib(8)) //21
console.log(fib(9)) //34
console.log(fib(10)) //55

//dynamic programming bottom-up.

function fib2 (n){
    let second = 0;
    let first = 1;
    let third = 0;
    if(n < 2){
        return n;
    }
        for(let i = 2; i <= n; i++){
            third = first + second;
            second = first;
            first = third;
        }
    return third
}

console.log(fib2(77))

//task4

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

console.log("\n");
/*
function printList(list){
    let something = list;
    
    while(something){
        console.log(something['value']);
        something = something.next;
    };
}
*/
//above one in simpler form
function printList(somelist){
    
    while(somelist){
        console.log(somelist['value']);
        somelist = somelist.next;
    };
}


console.log("\n");

function printList2(listsome){
    console.log(listsome['value'])
    if(listsome.next){
    
        printList(listsome.next);
    }
}

printList(list);
printList2(list);

//loop one is better as it's space complexity is O(1) while for recursion it is O(n)

//task5

console.log("\n")

function reverse(list){
    let arr1 = [];
    while(list){
        arr1.push(list.value);
        list = list.next;
    }

    for(let i = arr1.length - 1; i >= 0; i--){
        console.log(arr1[i])
    }
}
reverse(list);

console.log("\n")
function reverseRecurr(list){
    if(list.next){
        reverseRecurr(list.next);
    }
    console.log(list.value);
};

reverseRecurr(list);