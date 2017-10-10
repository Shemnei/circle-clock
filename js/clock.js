var oneFourth = Math.PI * 0.5;
var b, c, ctx, vw, vh, radOne, radTwo, radThree;
var lightTheme = false;

document.addEventListener("DOMContentLoaded", function () {
    b = document.getElementsByTagName("BODY")[0];
    c = document.getElementById("circles");
    ctx = c.getContext("2d");
    recalculateClockSize();
    startTime();
});

window.onresize = recalculateClockSize;

function recalculateClockSize() {
    c.width = document.documentElement.clientWidth;
    c.height = document.documentElement.clientHeight;
    vw = c.offsetWidth;
    vh = c.offsetHeight;

    radOne = Math.min(vw, vh) / 2 - 100;
    radTwo = radOne * (2 / 3);
    radThree = radOne * (1 / 3);
}

function handleClick() {
    lightTheme = !lightTheme;
}

function fillZero(length, value) {
    value = "" + value;
    while (value.length < length) {
        value = "0" + value;
    }
    return value;
}

function startTime() {
    // Delay after switch but seamless switch of colors
    if (lightTheme) {
        b.style.backgroundColor = "#F8ECC9";
    } else {
        b.style.backgroundColor = "#222222";
    }

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    var hours = ((2 * Math.PI) / 24) * h - oneFourth;
    if (hours < 0) {
        hours = 2 * Math.PI + hours;
    }

    var minutes = ((2 * Math.PI) / 60) * m - oneFourth;
    if (minutes < 0) {
        minutes = 2 * Math.PI + minutes;
    }

    var seconds = ((2 * Math.PI) / 60) * s - oneFourth;
    if (seconds < 0) {
        seconds = 2 * Math.PI + seconds;
    }

    //clear
    ctx.clearRect(0, 0, vw, vh);

    ctx.fillStyle = "#EFDC05";
    ctx.globalAlpha = 0.6 + ((0.3 / 24) * h);
    ctx.beginPath();
    ctx.arc(vw / 2, vh / 2, radOne, 1.5 * Math.PI, hours);
    ctx.arc(vw / 2, vh / 2, radOne - (radOne * (1 / 30)), hours, 1.5 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "#30A9DE";
    ctx.globalAlpha = 0.6 + ((0.3 / 60) * m);
    ctx.beginPath();
    ctx.arc(vw / 2, vh / 2, radTwo, 1.5 * Math.PI, minutes);
    ctx.arc(vw / 2, vh / 2, radTwo - (radTwo * (1 / 30)), minutes, 1.5 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "#E53A40";
    ctx.globalAlpha = 0.6 + ((0.3 / 60) * s);
    ctx.beginPath();
    ctx.arc(vw / 2, vh / 2, radThree, 1.5 * Math.PI, seconds);
    ctx.arc(vw / 2, vh / 2, radThree - (radThree * (1 / 30)), seconds, 1.5 * Math.PI, true);
    ctx.fill();

    lightTheme ? ctx.fillStyle = "#222222" : ctx.fillStyle = "#F8ECC9";
    ctx.globalAlpha = 0.5 + ((0.3 / 24) * h);
    ctx.font = (radOne * (1 / 12)) + "px monospace";
    ctx.fillText(fillZero(2, h), vw / 2, vh / 2 - (radOne + 5));

    ctx.font = (radTwo * (1 / 10)) + "px monospace";
    ctx.globalAlpha = 0.5 + ((0.3 / 60) * m);
    ctx.fillText(fillZero(2, m), vw / 2, vh / 2 - (radTwo + 5));

    ctx.font = (radThree * (1 / 8)) + "px monospace";
    ctx.globalAlpha = 0.5 + ((0.3 / 60) * s);
    ctx.fillText(fillZero(2, s), vw / 2, vh / 2 - (radThree + 5));

    document.title = fillZero(2, h) + ":" + fillZero(2, m) + ":" + fillZero(2, s);

    setTimeout(function () {
        startTime()
    }, 500);
}
