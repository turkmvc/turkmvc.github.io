canvas = document.getElementById("game");
ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyPresses);

let left = 0;
let top = 0;
let cordinat = 20;
let location = 20;
let dimension = 18;
let moveTop = 0;
let moveLeft = 0;
let appleLeft = 5;
let appleTop = 5;
let speed = 10;
let snakeLength = 3;
let snakeParts = [];
let score = 0;

class snakePart{
    constructor(left, top){
        this.left = left;
        this.top = top;
    }
}

function drawTheGame(){
    clearTheScreen();
    drawTheSnake();
    updateTheSnakePosition();
    drawTheApple();
    changeTheApplePosition();
    drawTheScore();
    drawTheSpeed();

    let result = isTheGameOver();
    if (result) {
        return;
    }

    setTimeout(drawTheGame, 100 / speed);
}

function clearTheScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
}

function drawTheSnake(){
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
        let element = snakeParts[i];
        ctx.fillRect(element.left * location, element.top * location, dimension, dimension);        
    }
    snakeParts.push(new snakePart(left, top));
    if(snakeParts.length > snakeLength){
        snakeParts.shift();
    }

    ctx.fillStyle = "white";
    ctx.fillRect(left * location, top * location, dimension, dimension);
}

function updateTheSnakePosition(){
    let leftResult = left + moveLeft;
    let topResult = top + moveTop;
    if (leftResult > 19) {
        left = 0;
    }
    else if (leftResult < 0) {
        left = 19;
    }
    else{
        left = leftResult;
    }
}

function keyPresses(){
    switch (e.keyCode) {
        case 38:
            if(moveTop == 1){return;}
            moveTop = -1;
            moveLeft = 0;
            break;
        case 40:
            if(moveTop == -1){return;}
            moveTop = 1;
            moveLeft = 0;
            break;
        case 37:
            if(moveLeft == 1){return;}
            moveTop = 0;
            moveLeft = -1;
            break;
        case 39:
            if(moveLeft == -1){return;}
            moveTop = 0;
            moveLeft = 1;
            break;
    }
}

function drawTheApple(){
    ctx.fillStyle = "reed";
    ctx.fillRect(appleLeft * location, appleTop * location, dimension, dimension);
}

function changeTheApplePosition(){
    if(left === appleLeft && top === appleTop){
        appleLeft = Math.floor(Math.random() * location);
        appleTop = Math.floor(Math.random() * location);
        snakeLength++;
        score += 10;
    }
    
    let isTheAppleLocationAvailable = false;
    while (!isTheAppleLocationAvailable) {
        isTheAppleLocationAvailable = true;
        snakeParts.forEach(element => {
            if(element.left === appleLeft && element.top === appleTop){
                appleLeft = Math.floor(Math.random() * location);
                appleTop = Math.floor(Math.random() * location);
            }
        });
    }
    if (snakeLength %3 === 0) {
        speed++;
    }
}

function isTheGameOver(){
    let gameOver = false;
    if (moveLeft === 0 && moveTop === 0) {
        return;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let element = snakeParts[i];
        if (element.left === left && element.top === top) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px verdana";
        ctx.fillText("Game Over!", 400 / 4.5, 200);
    }

    return gameOver;
}

function drawTheScore(){
    ctx.fillStyle = "white";
    ctx.font = "20px verdana";
    ctx.fillText(`Score : ${score}`, 320, 30);
}

function drawTheSpeed(){
    ctx.fillStyle = "white";
    ctx.font = "20px verdana";
    ctx.fillText(`Speed : ${speed}`, 320, 60);
}

function newGame(){
    document.location.reload();
}

drawTheGame();