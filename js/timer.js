//Timer

const deadline = "2022-09-07";

const getTimeRemaining = (endtime) => {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((t / (1000 * 60)) % 60);
  const seconds = Math.floor((t / 1000) % 60);

  return {
    total: t,
    days,
    hours,
    minutes,
    seconds,
  };
};

const getZero = (num) => {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

const setClock = (selector, endtime) => {
  const updateClock = () => {
    const t = getTimeRemaining(endtime);

    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = t.minutes;
    seconds.innerHTML = t.seconds;

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  };

  const timer = document.querySelector(selector);
  const days = document.querySelector("#days");
  const hours = document.querySelector("#hours");
  const minutes = document.querySelector("#minutes");
  const seconds = document.querySelector("#seconds");
  const timeInterval = setInterval(updateClock, 1000);

  updateClock();
};

setClock(".timer", deadline);
