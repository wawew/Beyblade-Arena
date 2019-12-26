let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

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
    // control
    let radSpeed;
    if(rightPressed) {
        playerOne.dx += 0.2;
        radSpeed = Math.sqrt((playerOne.dx ** 2) + (playerOne.dy ** 2))
        if (radSpeed > maxSpeed && playerOne.dx > maxSpeed) {
            playerOne.dx -= 0.2;
        } else if (radSpeed > maxSpeed) {
            if (playerOne.dy > 0) {
                playerOne.dy -= 0.2
            } else {
                playerOne.dy += 0.2
            }
        }
    }
    else if(leftPressed) {
        playerOne.dx -= 0.2;
        radSpeed = Math.sqrt((playerOne.dx ** 2) + (playerOne.dy ** 2))
        if (radSpeed > maxSpeed && playerOne.dx < maxSpeed) {
            playerOne.dx += 0.2;
        } else if (radSpeed > maxSpeed) {
            if (playerOne.dy > 0) {
                playerOne.dy -= 0.2
            } else {
                playerOne.dy += 0.2
            }
        }
    }
    else if(upPressed) {
        playerOne.dy -= 0.2;
        radSpeed = Math.sqrt((playerOne.dx ** 2) + (playerOne.dy ** 2))
        if (radSpeed > maxSpeed && playerOne.dy < maxSpeed) {
            playerOne.dy += 0.2;
        } else if (radSpeed > maxSpeed) {
            if (playerOne.dx > 0) {
                playerOne.dx -= 0.2
            } else {
                playerOne.dx += 0.2
            }
        }
    }
    else if(downPressed) {
        playerOne.dy += 0.2;
        radSpeed = Math.sqrt((playerOne.dx ** 2) + (playerOne.dy ** 2))
        if (radSpeed > maxSpeed && playerOne.dy > maxSpeed) {
            playerOne.dy -= 0.2;
        } else if (radSpeed > maxSpeed) {
            if (playerOne.dx > 0) {
                playerOne.dx -= 0.2
            } else {
                playerOne.dx += 0.2
            }
        }
    }
    // end control
    playerOne.setPosition(wallOne.updatedX, wallOne.updatedY);
    playerTwo.setPosition(wallTwo.updatedX, wallTwo.updatedY);
    playerOne.setSpeed(wallOne.updatedDx, wallOne.updatedDy);
    playerTwo.setSpeed(wallTwo.updatedDx, wallTwo.updatedDy);
}

setInterval(mainGame, 20);