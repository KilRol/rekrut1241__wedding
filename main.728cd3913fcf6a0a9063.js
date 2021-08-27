/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


const countDownDate = new Date("30 Sep, 2021 12:00:00").getTime();

let x = setInterval(() => {
    const now = new Date().getTime()
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = days + " дней " + hours + " часов " + "<br>" +
        minutes + " минут " + seconds + " секнуд ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById('timer').innerHTML = "EXPIRED";
    }

}, 1000);
/******/ })()
;