let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

class Ball {
    constructor(name="player", radius, initX, initY, initDx, initDy) {
        this.name = name;
        this.radius = radius;
        this.x = initX;
        this.y = initY;
        this.dx = initDx;
        this.dy = initDy;
    }
    setSpeed(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

function drawBall(BallClass) {
    ctx.beginPath();
    ctx.arc(BallClass.x, BallClass.y, BallClass.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function wallDetection(BallClass) {
    let dx = BallClass.dx;
    let dy = BallClass.dy;
    let x = BallClass.x;
    let y = BallClass.y;
    let futureX = x + dx;
    let futureY = y + dy;
    if(futureX > canvas.width-BallClass.radius || futureX < BallClass.radius) {
        dx = -dx;
    }
    if(futureY > canvas.height-BallClass.radius || futureY < BallClass.radius) {
        dy = -dy;
    }
    x += dx;
    y += dy;
    return {
        updatedX: x,
        updatedY: y,
        updatedDx: dx,
        updatedDy: dy
    }
}

const playerOne = new Ball(`Dudung`, 10, 10, 10, 2, 2);
const playerTwo = new Ball(`Maman`, 10, canvas.width-10, canvas.height-10, 2, 2);
function mainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let wallOne = wallDetection(playerOne);
    let wallTwo = wallDetection(playerTwo);
    drawBall(playerOne);
    drawBall(playerTwo);
    playerOne.setPosition(wallOne.updatedX, wallOne.updatedY);
    playerTwo.setPosition(wallTwo.updatedX, wallTwo.updatedY);
    playerOne.setSpeed(wallOne.updatedDx, wallOne.updatedDy);
    playerTwo.setSpeed(wallTwo.updatedDx, wallTwo.updatedDy);
}

setInterval(mainGame, 20);