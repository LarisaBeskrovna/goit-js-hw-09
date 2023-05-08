function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
  const startBtn = document.querySelector('button[data-start]');
  const stopBtn = document.querySelector('button[data-stop]');
  
  
  const bodyColor = {
    timerId: null,
    isActive: false,
  changeBodyColor () {
        if(this.isActive) {
            return;
        }

  this.timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    },

    stopBodyColor () {
        clearInterval(this.timerId);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
  }
  
  startBtn.addEventListener('click', () => {bodyColor.changeBodyColor()});
  stopBtn.addEventListener('click', () => {bodyColor.stopBodyColor()});
  
