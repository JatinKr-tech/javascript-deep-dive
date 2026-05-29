//task5

//

function getMaxSubSum(arr) {
    let ourArr = []
    for (let i = 0; i < arr.length; i++) {
        let x = 0;

        StartFromNextJ:
        for (let j = i; j < arr.length; j++) {
            if (i === j) {
                ourArr.push(arr[i]); continue StartFromNextJ;
            }
            x += arr[j];
            ourArr.push(arr[i] + x);

            
        };
    };
    console.log(ourArr);
    let valueMax = Math.max(...ourArr);
    if (valueMax < 0) {
        console.log(0); 
    } else {
        console.log(valueMax);
    }
    // maximum(ourArr)
};

//i forgot about spread operator '...'
// function maximum(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         let factor = 0;

//         for (let j = 0; j < arr.length; j++) {
//             if (arr[i] >= arr[j]) {
//                 factor += arr[i];
//             }
//         };

//         if ((factor/arr.length) === arr[i] && arr[i] !== 0) {
//             if (arr[i] < 0) {
//                 console.log(0); break;
//             }
//                 console.log(arr[i]);
            
//         };
//     };
// };




//a faster method:

function getMaxSubSum2(arr) {
    let emptystr = [];
    for (let i = 0; i < arr.length; i++){
        let j = i;
        let sum = 0;
        while (j < arr.length && sum >= 0) {
            sum += arr[j];
            emptystr.push(sum);
            j++;
        };
    };
    console.log(emptystr)
    let valueMax = Math.max(...emptystr);
    if (valueMax < 0) {
        console.log(0); 
    } else {
        console.log(valueMax);
    }
};


//above methods slows code down (nested loop) by a factor of On2 or near that.

//Kadane's algorithm
//speed On1

function getMaxSubSum3(arr) {

    let currentSum = 0;
    let globalSum = 0;

    for(let i = 0; i < arr.length; i++){
        currentSum = currentSum + arr[i]
        if (currentSum < 0) {
            currentSum = 0;
        };
        if (globalSum < currentSum) {
            globalSum = currentSum;
        };
    }

    console.log(globalSum);

};






let entry = [1, -2, 3, 4, -9, 6]; //7
// let entry = [-1, 2, 3, -9]; //5
// let entry = [2, -1, 2, 3, -9]; //6
// let entry = [-1, 2, 3, -9, 11]; //11
// let entry = [-2, -1, 1, 2]; //0 //3
// let entry = [100, -9, 2, -3, 5]; //100
// let entry = [1, 2, 3]; //6
// let entry = [-1, -2, -3]; //-1
// let entry = [0, -1, -2, -3]; //0
getMaxSubSum(entry);
getMaxSubSum2(entry);
getMaxSubSum3(entry);


