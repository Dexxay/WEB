let anim = document.getElementById("anim");
let work = document.getElementById("work");
let message = document.getElementById("controlMessage");
let playButton = document.getElementById("playButton");
let closeButton = document.getElementById("closeButton");
let varButton = document.getElementById("varButton");
let canvas = document.getElementById("canvas");
let history = document.getElementById("history");
let context = canvas.getContext("2d");

playButton.onclick = onPlayButtonClick
closeButton.onclick = onCloseButtonClick
varButton.onclick = onVarButtonClick

let varButtonValue = "start"

const borderSize = 10;
let windowWidth;
let windowHeight;
let square;
let isGameEnd;
let isGameStop;
let nextMessageIndex;

function onPlayButtonClick() {
    printMessage("Play button was clicked")
    work.classList.add("active");
    localStorage.clear();
    nextMessageIndex = 0;
    initialize();
}

function onCloseButtonClick() {
    printMessage("Close button was clicked")
    showHistory();
    isGameStop = true;
    work.classList.remove("active");
}

function onVarButtonClick() {
    printMessage(`${varButtonValue} button was clicked`);
    if (varButtonValue === "start") {
        changeVarButtonValue("stop")
        isGameEnd = false;
        isGameStop = false;
        updateSquare();
    } else if (varButtonValue === "stop") {
        changeVarButtonValue("start")
        isGameEnd = false;
        isGameStop = true;
    } else if (varButtonValue === "reload") {
        changeVarButtonValue("start")
        initialize();
        isGameEnd = false;
        isGameStop = false;
    }
}

function changeVarButtonValue(str) {
    varButtonValue = str;
    varButton.innerText = capitalizeFirstLetter(str);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Square {

    constructor(xPos, yPos, a, color, speed, name) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.a = a;
        this.color = color;
        this.speed = speed;
        this.name = name;

        this.xAngle = random(0.2, 0.8);
        this.yAngle = random(0.2, 0.8);
    }

    draw(context) {
        context.beginPath();
        context.rect(this.xPos, this.yPos, this.a, this.a);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(context) {
        if ((this.xPos + (this.a / 2)) > windowWidth) {
            printMessage(`${this.name} touches right wall`);
            this.changeXDirection();
        }

        if ((this.yPos + (this.a / 2)) > windowHeight) {
            printMessage(`${this.name} touches downer wall`);
            this.changeYDirection();
        }

        if ((this.yPos - (this.a / 2)) < 0) {
            printMessage(`${this.name} touches upper wall`);
            this.changeYDirection();
        }

        this.xPos += this.speed * this.xAngle;
        this.yPos += this.speed * this.yAngle;

        this.draw(context);
    }

    changeXDirection() {
        this.xAngle = -this.xAngle;
    }

    changeYDirection() {
        this.yAngle = -this.yAngle;
    }
}

function printMessage(messageStr) {
    message.innerText = messageStr;
    let now = new Date();
    messageStr = `${now.toLocaleString()} - ${messageStr}`;
    localStorage.setItem(`${nextMessageIndex++}`, messageStr);
}

function initialize() {
    console.log("initialize is invoked")
    isGameStop = false;
    isGameEnd = false;
    changeVarButtonValue("start")
    square = null;

    windowHeight = Math.floor(anim.offsetHeight - borderSize);
    windowWidth = Math.floor(anim.offsetWidth - (borderSize / 2));

    canvas.height = windowHeight;
    canvas.width = windowWidth;

    canvas.style.background = "rgba(0,0,0,0)";

    const speed = 7, a = 10;

    square = new Square(windowWidth - a, a, a, "green", speed, "Square")
    square.draw(context)
}

function updateSquare() {
    console.log("update square is invoked")
    if (!isGameEnd && !isGameStop) {
        requestAnimationFrame(updateSquare);
        context.clearRect(0, 0, windowWidth, windowHeight);
        square.update(context);

        if (checkForGameEnd()) {
            isGameEnd = true;
            printMessage("Game is end")
            changeVarButtonValue("reload")
        }
    }
}

function checkForGameEnd() {
    return square.xPos + (borderSize / 2) + (square.a / 2) < 0
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function showHistory() {
    for (let i = 0; i < localStorage.length; i++) {
        let p = document.createElement("p");
        p.innerText = `${localStorage.getItem(`${i}`)}`;
        history.appendChild(p);
    }
}