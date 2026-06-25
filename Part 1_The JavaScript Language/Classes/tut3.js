//Static properties and methods

//Static Methods: Directly on the Class (Class.method). Static Methods are properties of Class just like how Class.prototype is a property of Class.

// Instance Methods: On the Class Prototype (Class.prototype.method)

class Article{
    constructor(value){
        this.headline = value;
        this.date = new Date();
    }
    static read(){
        // return `On date: ${this.date} the headline is ${this.headline}`;
        return `read`;
    }
    sayHi(){
        return `Hi`;
    }
}

let article1 = new Article('FIFA World Cup');

// console.log(article1.read()); //Error, //static methods are properties of Article just like Article.prototype and are not accessible from article1.
console.log(article1.sayHi()); //Hi

console.log(Article.read()); //read
// console.log(Article.sayHi()); //Article.sayHi is not a function
console.log(Article.prototype.sayHi()); //Hi

console.log(article1);
console.log(article1.__proto__ === Article.prototype)
console.log(article1.__proto__)

//

class Article2{
    constructor(obj){
        let {headline = "NA", date = new Date()} = obj;
        this.headline = headline;
        this.date = date;
    }
    static read(){
        console.log(`On date: "${this.date}" the Top news headline is "${this.headline}"`);
    }
    sayHi(){
        return `Hi`;
    }
    static compare = function(articleA, articleB){
        return articleA.date - articleB.date;
    }
};

console.log(Article2.read)

let article2 = new Article2({headline: "Trump calls himself the boss!"});

Article2.read.call(article2); //On date: "Thu Jun 25 2026 14:27:55 GMT+0530 (India Standard Time)" the Top news headline is "Trump calls himself the boss!"

//actual use of static methods:

let arrayOfArticles = [
    new Article2({headline: "NEET Paper Leaked!!", date: new Date(2026, 4, 10)}),
    new Article2({headline: "Landslide in Uttrakhand", date: new Date(2026, 0, 10)}),
    new Article2({headline: "Flash Floods in Arunachal Pradesh", date: new Date(2026, 5, 24)}),
    new Article2({headline: "Important Reforms due!!", date: new Date(2026, 1, 20)})
];

console.log(arrayOfArticles)

arrayOfArticles.forEach((item)=>Article2.read.call(item));

arrayOfArticles.sort(Article2.compare);
console.log(arrayOfArticles);

//

class Article3 {
    constructor(obj){
        let {headline = "NA", date = new Date()} = obj;
        this.headline = headline;
        this.date = date;
    }

    static createTodays(){
        return new this({headline: "Todays digest", date: new Date(2026, 5, 25, 17, 34, 23)})
    }
}

let todaysdigest = Article3.createTodays();
console.log(todaysdigest); //Article3 {headline: 'Todays digest', date: Thu Jun 25 2026 17:34:23 GMT+0530 (India Standard Time)}

//

//Static methods are also used in database-related classes to search/save/remove entries from the database, like this:

// assuming Article is a special class for managing articles
// static method to remove the article by id:
// Article.remove({id: 12345});

//..............................................

//Static properties

//This is a recent addition to the language.

class Article4 {
    constructor(){
        this.headline = "blablabla";
    }
    static publisher = "Tony"
}

console.log(Article4.__proto__); //ƒ () { [native code] }

let article4 = new Article4();

console.log(Article4.publisher); //Tony
console.log(article4.publisher); //undefined, as we know it already, //Static methods/properties are callable/defined on classes, not on individual objects.

//..................................

//Inheritance of static properties and methods

class Animal {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    static byName = 'Groot'
    static compare(a, b){
        return a.age-b.age;
    }
    sayHello(){
        console.log("Method of Animal.prototype")
    }
}

class Rabbit extends Animal {
    sayHi(){
        console.log(`Method of Rabbit.prototype`)
    }
};

let rabbit = new Rabbit("Bunny", 5);
rabbit.sayHi(); //Method of Rabbit.prototype
rabbit.sayHello(); //Method of Animal.prototype //Rabbit.prototype.__proto__ === Animal.prototype, that's how we got it.

console.log(Rabbit.byName); //Groot

let arrayOfRabbit = [
    new Rabbit("Bunny1", 5),
    new Rabbit("Bunny2", 8),
    new Rabbit("Bunny3", 3),
    new Rabbit("Bunny4", 1),
    new Rabbit("Bunny5", 5)
];

arrayOfRabbit.sort(Rabbit.compare); //works

console.log(arrayOfRabbit); 

console.log(Rabbit.__proto__ === Animal); //true
console.log(rabbit.__proto__ === Rabbit.prototype); //true
console.log(Rabbit.prototype.__proto__ === Animal.prototype); //true

console.log(Animal.__proto__ === Function.prototype); //true
console.log(Animal.prototype.__proto__ === Object.prototype); //true

//create the graph on a page to understand or look into javascript.info on this lesson

//......................................

//tasks

//task1

class Rabbit1 extends Object {
  constructor(name) {
    super()
    this.name = name;
  }
}

let rabbit1 = new Rabbit1("Rab");

console.log( rabbit1.hasOwnProperty('name') ); // True

console.log(rabbit1.__proto__ === Rabbit1.prototype); //true
console.log(Rabbit1.prototype.__proto__ === Object.prototype); //true
console.log(Rabbit1.__proto__ === Object); //true
console.log(Object.__proto__ === Function.prototype); //true

//if there is no 'extends Object' then we also won't have access to static property/method of Object. Which is obvious and easy to understand.