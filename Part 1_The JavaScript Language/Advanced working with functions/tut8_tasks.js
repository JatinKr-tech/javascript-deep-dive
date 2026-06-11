//tasks of 'Scheduling: setTimeout and setInterval'

//task1

/*
function func1(valueFrom, valueTo){
    for(let i = valueFrom; i <= valueTo; i++){
        setTimeout(()=> console.log(i), 1000); 
    };
};

func1(2, 8); //2,3,4,5,6,7,8

//Why it works? 
//answer: setTimeout execute only after all non-async code are finished running in javascript, so for every i we get i number of setTimeout's and they start executing all at the same time. But since i is not defined inside it looks outward, but once again for loop creates new lexical environment everytime that explains it. 

//it works because we used let instead of var, var is not block scoped it is function scoped. So no new lexical environment every time.

*/
function func1(valueFrom, valueTo){
    let currentValue = valueFrom;
    setTimeout(function infunc1 () {
        console.log(currentValue++);
        if(currentValue <= valueTo){
            setTimeout(infunc1, 0);
        }        
    }, 1000);
}

func1(2, 8);

//

function func11(valueFrom, valueTo){
    let currentValue = valueFrom;
    let ourInterval1 = setInterval(()=>{
        console.log(currentValue++);
        if(currentValue > valueTo){
            clearInterval(ourInterval1);
        };
    }, 100);
    
};

func11(2, 8);

//task2

let l = 0;

setTimeout(() => console.log(l), 100); // ? ans: 100000000

// assume that the time to execute this function is >100ms
for(let m = 0; m < 100000000; m++) {
  l++;
};

