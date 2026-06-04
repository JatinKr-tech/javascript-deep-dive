//tasks

//task1
// let Date1 = new Date(Date.parse("2012-02-20T03:12"));
// let Date1 = new Date("2012-02-20T03:12");
let Date1 = new Date(2012, 1, 20, 3, 12);
console.log(Date1);

//task2
let date2 = new Date(2012, 0, 3);  // 3 Jan 2012

console.log(typeof date2);

function getWeekDay(date){
    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    return days[date.getDay()]
}

console.log( getWeekDay(date2) ); 

//task3

let date3 = new Date(2012, 0, 3);  // 3 Jan 2012

function getLocalDay(date) {
    if(date.getDay() === 0){
        return 7;
    }
    return date.getDay()
};

console.log( getLocalDay(date3) );       // tuesday, should show 2

//task4

let date4 = new Date(2015, 0, 2);

/*
function getDateAgo(date, num){
    let milli = Date.parse(date);
    let newdate = new Date(milli - (24*3600*1000*num));
    return newdate;
};
*/

function getDateAgo(date, num){
    let copydate = new Date(date);
    copydate.setDate(date.getDate() - num);
    return copydate;
}

console.log( getDateAgo(date4, 1) ); // 1, (1 Jan 2015)
console.log( getDateAgo(date4, 2) ); // 31, (31 Dec 2014)
console.log( getDateAgo(date4, 365) ); // 2, (2 Jan 2014)

//task5

function getLastDayOfMonth(year, month){
    let date5 = new Date(year, month + 1 ,0);
    return date5.getDate();
};

console.log(getLastDayOfMonth(2012, 1));

//task6


function getSecondsToday(){
    let d1 = new Date().setHours(0,0,0,0);
    return Math.floor((Date.now() - d1)/1e3);
}

console.log(getSecondsToday())

//task7



function getSecondsToTomorrow(){
    let d1 = new Date().setHours(24,0,0,0);
    return Math.floor((d1 - Date.now())/1e3);
}

console.log(getSecondsToTomorrow())

//task8

function formatDate(date){
    let num = Date.now() - date;
    let n1 = num/1e3;
    let n2 = Math.ceil(n1);

    if(n1 < 1){
        return "right now"
    };
    if(n2 < 60){
        return `${n2} seconds ago`
    };
    if(n2 < 60*60){
        return `${Math.floor(n2/60)} minutes ago`
    };
    // if(n2 < 60*60*60){
    //     return `${Math.floor(n2/(60*60))} Hours ago`
    // };

    //formating
    let theDate = new Date(Date.now() - num);

    let year = theDate.getFullYear();
    let month = theDate.getMonth() + 1;
    let Pdate = theDate.getDate();
    let hour = theDate.getHours();
    let min = theDate.getMinutes();

    let Y = `${year}`.slice(2)

    // let[T, C, D, Y] = year.split("");
    
    function fless(item){
        return (item < 10)? "0"+item : item;
    };

    return `${fless(Pdate)}.${fless(month)}.${fless(Y)} ${fless(hour)}:${fless(min)}`
    
};

console.log( formatDate(new Date(new Date - 1)) ); // "right now"

console.log( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

console.log( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.2016 20:00
console.log( formatDate(new Date(new Date - 86400 * 1000)) );

