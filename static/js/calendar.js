// for the calendar part
const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

//for the goto functionality
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");

// right side date
const daySpec = document.querySelector(".event-day");
const dateSpec = document.querySelector(".event-date");




let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

//function to add days
function initCalendar() {
    // to get previous month days and current month all days, and remember next month days
    const firstDay = new Date(year, month, 1);
    const  lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const  day = firstDay.getDay();

    const nextDays = 7 - lastDay.getDay();

    //update date at the top of the calendar
    date.innerHTML = months[month] + " " + year;

    // adding days
    let days = "";

    // prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class = "day prev-date" >${prevDays - x + 1}</div>`
    }

    //current month days
    for (let i = 1; i <= lastDate; i++) {
        // if day is today, add class today
        if (i === new Date().getDate() 
            && year === new Date().getFullYear() 
        && month === new Date().getMonth()) {
            days += `<div class = "day today active" >${i}</div>`
        } else {
            days += `<div class = "day" >${i}</div>`
        }
    }

    // next month days
    for (let j = 1; j < nextDays; j++) {
        days += `<div class = "day next-date" >${j}</div>`
    }

    daysContainer.innerHTML = days;
    // add listener for clicking on a day after the calendar is initialized
    dayClick();

}

initCalendar();


// prev month
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}
 
//add event listener on prev and next buttons
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);


// goto date and goto today functionality
// () => does the same thing as function() !
todayBtn.addEventListener("click", function() {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    //allow only numbers, remove everything else!
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        // add a slash if two numbers are entered
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        // don't allow more than 7 characters
        dateInput.value = dateInput.value.slice(0, 7);
    }
    
    //if backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (dateImput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

//function to go to entered date
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("invalid date");
}    


function dayClick() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //set current day as active day
            activeDay = Number(e.target.innerHTML);
            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });

            //if prev month day clicked goto prev month and add active to clicked
            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    //select all days of that month
                    const days = document.querySelectorAll(".day");
                    
                    // after going to prev month, add active to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            //same with next month days
            else if (e.target.classList.contains("next-date")) {
                nextMonth();
                setTimeout(() => {
                    //select all days of that month
                    const days = document.querySelectorAll(".day");
                    
                    // after going to prev month, add active to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            //remaining current month days
            else {
                e.target.classList.add("active");
            }
        });
    });

}



//show active date at the top right
function getActiveDay (date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
}