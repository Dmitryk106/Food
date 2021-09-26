

window.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsPerent = document.querySelector(".tabheader__items"),
          tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent () {

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });

        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    }      


    function showTabContent (i = 0) {

        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');

        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent();

    tabsPerent.addEventListener('click', (event) => {

        const target = event.target;
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


});