import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');


const createPromise = (position, delay) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({position, delay});

    } else {
      // Reject
      reject({position, delay});
    }
    }, delay);
  })
  return promise;  
}
function promiseCreated(e) {
  e.preventDefault();

  let setDelay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);

  for(let i = 0; i <= amount; i ++) {
      createPromise(i, setDelay + i * step)
      .then((result) => {
        Notiflix.Notify.success(`Fulfilled promise ${result.position} in ${result.delay}ms`)
      })
      .catch((error) => {
        Notiflix.Notify.failure(`Rejected promise ${error.position} in ${error.delay}ms`);
      });
  }
}
  
form.addEventListener('submit', promiseCreated);