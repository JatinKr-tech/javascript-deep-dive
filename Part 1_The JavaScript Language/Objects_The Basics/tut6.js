//The ?. checks the left part for null/undefined and allows the evaluation to proceed if it’s not so.

// A chain of ?. allows to safely access nested properties.

// Still, we should apply ?. carefully, only where it’s acceptable, according to our code logic, that the left part doesn’t exist. So that it won’t hide programming errors from us, if they occur.



let obj1 = {
    name : "Valda",
    method1 : function(){
        return "hello";
    }
}

console.log(obj1.address) //undefined
// console.log(obj1.address.street) //error

//We can use turnary operator (?) or && or if else but that makes code lenthy and unreadable, here comes opetional chaining "?."

console.log(obj1.address?.street) //if address doesn't exist then it stops there (short circuit) and returns undefined.

// console.log(mythicalObj?.address?.street) //error, variable if not obj have to be defined at least.

let thisObjExists;

console.log(thisObjExists?.address?.street)

//It is recommended that we don't litter our codebase with it everywhere as it may block necessary errors.

// There are other types of it 

console.log(obj1.method1?.()); //hello, cuz method1 does exist.
// console.log(obj1.method2()); //error
console.log(obj1.method2?.()) //undefined, didn't give us an error

console.log(obj1.name) //Valda
// console.log(obj1.["age"])    //error
console.log(obj1?.["age"])  //undefined

//

let user = {};
// let user = null;

// user?.name = "Krish"; //error, // because it evaluates to: undefined = "Krish"

//We can use ?. for safe reading and deleting, but not writing