document.addEventListener("DOMContentLoaded", () => {
  //Tabs

  const parentTabs = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");

  const hideTabContent = () => {
    tabsContent.forEach((content) => {
      content.classList.add("hide");
      content.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = (index = 0) => {
    tabsContent[index].classList.add("show", "fade");
    tabsContent[index].classList.remove("hide");
    tabs[index].classList.add("tabheader__item_active");
  };

  hideTabContent();
  showTabContent();

  parentTabs.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, index) => {
        if (target === tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  //Timer

  const deadline = "2022-09-07";

  const getTimeRemaining = (endtime) => {
    let days, hours, minutes, seconds;

    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / (1000 * 60)) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

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
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

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

  // MODAL

  const modalBtn = document.querySelectorAll("[data-modal]");
  const closeBtn = document.querySelector("[data-close]");
  const modalWindow = document.querySelector(".modal");

  const openModalWindow = (trigger) => {
    trigger.forEach((btn) => {
      btn.addEventListener("click", () => {
        modalWindow.classList.toggle("show");
        document.body.style.overflow = "hidden";
      });
    });
  };

  const openModalTimer = () => {
    modalWindow.classList.toggle("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
    document.body.style.overflow = "";
  };

  const closeModal = () => {
    modalWindow.classList.toggle("show");
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", closeModal);

  modalWindow.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal();
    }
  });

  openModalWindow(modalBtn);

  // const modalTimerId = setTimeout(openModalTimer, 3000);

  const showModalByScroll = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      modalWindow.classList.toggle("show");
      document.body.style.overflow = "hidden";
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);

  //Классы для добавления карточек на страницу

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changseToUAH();
    }

    changseToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "Изображение еды",
    "Меню эконом",
    "Экономьте с нами обедая дешевой едой и станете богатыми!",
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/vegy.jpg",
    "Изображение еды",
    "Меню эконом",
    "Экономьте с нами обедая дешевой едой и станете богатыми!",
    9,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/vegy.jpg",
    "Изображение еды",
    "Меню эконом",
    "Экономьте с нами обедая дешевой едой и станете богатыми!",
    9,
    ".menu .container",
    "menu__item"
  ).render();
});
