document.addEventListener("DOMContentLoaded", () => {
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
});
