//Date and Time

//Creation

let now = new Date();
console.log( now ); // shows current date/time

//new Date(milliseconds)

let D0 = new Date(0);
console.log(D0);
let D1 = new Date(24*3600*1000);
console.log(D1);
let DNeg1 = new Date(-24*3600*1000);
console.log(DNeg1);

//new Date(datestring)
let datestring = new Date("07-26-2010");
console.log(datestring);

//new Date(year, month, date, hours, minutes, seconds, ms)
let bigDate = new Date(2007, 0, 23, 14, 27, 39, 401);
//if i put date lets say 32 then we get 1 instead of 0 for month and date as 1
console.log(bigDate);

//......................

//Access Date components

//getFullYear() //Get the year (4 digits) //never use getYear() as it sometimes give year 2 digits sometimes 4
console.log(bigDate.getFullYear()); //2007

//getMonth() //Get the month, from 0 to 11.
console.log(bigDate.getMonth());

//getDate() //Get the day of month, from 1 to 31
console.log(bigDate.getDate());

//getHours(), getMinutes(), getSeconds(), getMilliseconds()

//getDay() //0 for Sunday, 6 for Saturday
console.log(bigDate.getDay());

//There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0: getUTCFullYear(), getUTCMonth(), getUTCDay(). Just insert the "UTC" right after "get".

console.log(bigDate.getHours(), bigDate.getUTCHours()); //14, //8

//getTime() //Returns the timestamp for the date – a number of milliseconds passed from the January 1st of 1970 UTC+0.
// console.log(bigDate.getTime());

//getTimezoneOffset() //Returns the difference between UTC and the local time zone, in minutes:

console.log(new Date().getTimezoneOffset())

//...................

//Setting date components

//The following methods allow to set date/time components:

// setFullYear(year, [month], [date])
// setMonth(month, [date])
// setDate(date)
// setHours(hour, [min], [sec], [ms])
// setMinutes(min, [sec], [ms])
// setSeconds(sec, [ms])
// setMilliseconds(ms)
// setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)

//Every one of them except setTime() has a UTC-variant,

let today = new Date();

today.setHours(0); 
console.log(today); //in milliseconds // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0); 
console.log(today); //in milliseconds // still today, now 00:00:00 sharp.

//..........................

//Autocorrection
let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

console.log( date ); // 1 Mar 2016 instead of 30 Feb 2016

//This feature is often used to get the date after the given period of time. For instance, let’s get the date for “70 seconds after now”:
let date2 = new Date();
date2.setSeconds(date2.getSeconds() + 70);

console.log( date2 ); // shows the correct date which will be after 70s

//We can also set zero or even negative values. For example:

let date3 = new Date(2016, 0, 2); // 2 Jan 2016

date3.setDate(1); // set day 1 of month
console.log( date3 );

date3.setDate(0); // min day is 1, so the last day of the previous month is assumed
console.log( date3 ); // 31 Dec 2015

//...............................

//Date to number, date diff

let date4 = new Date();
// console.log(+date4); // the number of milliseconds, same as date.getTime()

//

// let start = new Date(); // start measuring time
let start = Date.now(); // start measuring time
console.log(Date.now())

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

// let end = new Date(); // end measuring time
let end = Date.now(); // end measuring time

console.log( `The loop took ${end - start} ms` );

//Date.now()
//If we only want to measure time, we don’t need the Date object.
//It is semantically equivalent to new Date().getTime(), but it doesn’t create an intermediate Date object. So it’s faster and doesn’t put pressure on garbage collection.

//
function diffSubtract(date1, date2) {
  return date2 - date1; //Implicit type coercion, JavaScript engines calls .toPrimitive then valueOf to extract numeric(milliseconds)
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime(); //by using .getTime() we don't need type conversion we are simply calling milliseconds which is already stored. //Explicit Method Invocation
}

console.log(new Date(0))

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

// console.log( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
// console.log( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );

let time1 = 0;
let time2 = 0;

// added for "heating up" prior to the main loop
// bench(diffSubtract)
// bench(diffGetTime)

//microbenchmarking

for(let i = 0; i < 10; i++){
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
};

console.log(time1, time2);

//.....................

//Date.parse from a string
//The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:
// YYYY-MM-DD – is the date: year-month-day.
// The character "T" is used as the delimiter.
// HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
// The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would mean UTC+0.

// Shorter variants are also possible, like YYYY-MM-DD or YYYY-MM or even YYYY.

let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
// let ms = Date.parse('2012-01-26');

console.log(ms); // 1327611110417  (timestamp)

let date5 = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

console.log(date5);

console.log(performance.now());

//almost all browser has performance.now() which gives in microseconds precision

//Node.js has microtime module and other ways.
