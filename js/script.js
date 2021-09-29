"use strict";

window.addEventListener("DOMContentLoaded", () => {

    // TABS

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

    // TIMER

    const deadline = '2021-12-5';

    function getTimeRemainimg (endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };      
    }

     
    function getZero(num) {
        if (num < 10 && num >= 0) {
            return `0${num}`;
        } else {return num;} 
    }

    function setClock(selector, endTime) {

        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
              updateClock();
        function updateClock() {

            const t = getTimeRemainimg(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        
    }   

    setClock('.timer',deadline);

    // MODAL

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimetId)
    }

    modalTrigger.forEach((triger) => {
        triger.addEventListener('click', openModal);
    });

    function closeModal () {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(); 
        }
    });

    const modalTimetId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll',showModalByScroll);

});