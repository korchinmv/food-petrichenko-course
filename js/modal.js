document.addEventListener("DOMContentLoaded", () => {
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

  const modalTimerId = setTimeout(openModalTimer, 3000);

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
});
