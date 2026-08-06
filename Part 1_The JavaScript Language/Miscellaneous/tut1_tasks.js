//Proxy and Reflect

//tasks

//task1

let user1 = {
  name: "John"
};

function wrap1(f){
    return new Proxy(f, {
        get(target, prop, receiver){
            if (!(prop in target)) {
                throw new ReferenceError(`Property does not exist : ${prop}`);
            } else {
                return target[prop]
            }
        }
    })
};

function wrap2(f){
    return new Proxy(f, {
        get(target, prop, receiver){
            if(prop in target){
                return Reflect.get(target, prop, receiver)
            } else {
                throw new ReferenceError(`Property does not exist : ${prop}`);
            }
        }
    })
}

// user1 = wrap1(user1); //works
user1 = wrap2(user1); //works

console.log(user1.name); //John
// console.log(user1.age); //ReferenceError

//.........................................

//task2

let array1 = [11, 12, 13];

console.log(array1[-1]); //undefined

array1 = new Proxy(array1, {
    get(target, prop, receiver){
        if(prop < 0) {
            return target[target.length + +prop];
        } else {
            return target[prop];
        };
    }
});

console.log(array1[-1]); //13
console.log(array1[-2]); //12
console.log(array1[-3]); //11
console.log(array1[2]); //13

let array2 = [21, 22, 23];

array2 = new Proxy(array2, {
    get(target, prop, receiver){
        if(prop < 0){
            prop = target.length + +prop;
        }
        return Reflect.get(target, prop, receiver);
    }
});

console.log(array2[-1]); //23
console.log(array2[-2]); //22
console.log(array2[-3]); //21
console.log(array2[2]); //23

//................................

//task3

function makeObservable(target) {
  return new Proxy(target, {
    //your code here
  });
};

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John