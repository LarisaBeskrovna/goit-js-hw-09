import Notiflix from "notiflix";

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountAttempt = document.querySelector('input[name="amount"]');

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

  let setDelay = Number(firstDelay.value);
  const step = Number(delayStep.value);
  const amount = Number(amountAttempt.value);

  for(let i = 0; i <= amount; i ++) {
      createPromise(i, setDelay + i * step)
      .then((result) => {
        Notiflix.Notify.success(`Promise ${result.position} fulfilled with delay ${result.delay}`)
      })
      .catch((error) => {
        Notiflix.Notify.failure(`Promise ${error.position} rejectes with delay ${error.delay}`);
      });
  }
}
  
form.addEventListener('submit', promiseCreated);
