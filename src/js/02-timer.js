import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dataTime = document.querySelector('#datetime-picker');
const dataStart = document.querySelector('[data-start]');
const timer = document.querySelector(`.timer`);
const fields = document.querySelectorAll(`.field`);
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSecond = document.querySelector('[data-seconds]');


let selectedDate = 0;
let timerId= null;
dataStart.disabled = true;

dataStart.addEventListener('click', startTimer);

timer.style.display = "flex";
fields.forEach(field =>{
    field.style.display = "flex";
    field.style.flexDirection ="column";
    field.style.margin ="5px";
    field.style.textAlign ="center";
    field.style.color = "blue";
})

function startTimer() {
    timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimer({ days, hours, minutes, seconds });
    stopTimer(deltaTime);
    }, 1000);
    dataStart.disabled = true;
    dataTime.disabled = true;
  }

function stopTimer(time) {
    if (time < 1000) {
    clearInterval(timerId);
    dataTime.disabled = false;
  }
  }

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
          } else {
            dataStart.disabled = false;
            selectedDate = selectedDates[0];
          }     
    }}
    ;

function addLeadingZero(val) {
    return String(val).padStart(2, '0');
    }

function updateTimer ({ days, hours, minutes, seconds }){
        
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSecond.textContent = addLeadingZero(seconds);
    };
    
function convertMs(ms) {
        
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);     
            return { 
                days, 
                hours, 
                minutes, 
                seconds };
    }

    flatpickr(dataTime, options) 