import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dataTime = document.querySelector('#datetime-picker');
const dataStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSecond = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId;

const countDown = flatpickr(dataTime, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      selectedDate = selectedDates[0];      
    }}
    );

    function addLeadingZero(val) {
     return String(val).padStart(2, '0');
    }
    
    function convertMs(ms) {
        timerId = setInterval(() => {
        const difference = Date.parse(selectedDate) - Date.parse(new Date());
    
            if(difference <= 0) {
                clearInterval(timerId);
            } 
    
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;
    
            let days, hours, minutes, seconds;
    
            if(difference > 0) {
                days = addLeadingZero(Math.floor(difference / day));
                hours = addLeadingZero(Math.floor((difference % day) / hour));
                minutes = addLeadingZero(Math.floor(((difference % day) % hour) / minute));
                seconds = addLeadingZero(Math.floor((((difference % day) % hour) % minute) / second));
            }   
            dataDays.textContent = days;
            dataHours.textContent = hours;
            dataMinutes.textContent = minutes;
            dataSecond.textContent = seconds;
    
            return { 
                difference,
                days, 
                hours, 
                minutes, 
                seconds };
        }, 1000);
    }

    function countdown() {
        const newDate = new Date().getTime();
        const difference = selectedDate.getTime() - newDate;  
        if(difference <= 0) {
            Notiflix.Notify.failure("Please choose a date in the future");
            dataStart.disabled = true;
            clearInterval(timerId);
        } 
        dataStart.disabled = false;
    
        convertMs(difference);
       
    }
    
    dataStart.addEventListener('click', countdown);
    