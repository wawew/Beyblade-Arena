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
    constructor(name="player", radius, initX, initY, initDx, initDy, color) {
        this.name = name;
        this.radius = radius;
        this.x = initX;
        this.y = initY;
        this.dx = initDx;
        this.dy = initDy;
        this.color = color;
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
    ctx.fillStyle = BallClass.color;
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

function ballCollision(BallOne, BallTwo) {
    let oneX = BallOne.x;
    let oneY = BallOne.y;
    let twoX = BallTwo.x;
    let twoY = BallOne.y;
    const deltaX = oneX - twoX;
    const deltaY = oneY - twoY;
    const gap = Math.sqrt(deltaX**2 + deltaY**2);
    
    const damping = 1;
    const sumSpeedX = BallOne.dx + BallTwo.dx;
    const sumSpeedY = BallOne.dy + BallTwo.dy;
    const deltaSpeedX = BallOne.dx - BallTwo.dx;
    const deltaSpeedY = BallOne.dy - BallTwo.dy;
    let afterSpeedOneX = BallOne.dx
    let afterSpeedOneY = BallOne.dy;
    let afterSpeedTwoX = BallTwo.dx
    let afterSpeedTwoY = BallTwo.dy;
    
    if(gap <= BallOne.radius+BallTwo.radius) {
        afterSpeedOneX = damping*deltaSpeedX/2 + sumSpeedX/2;
        afterSpeedOneY = damping*deltaSpeedY/2 + sumSpeedY/2;
        afterSpeedTwoX = sumSpeedX/2 - damping*deltaSpeedX/2;
        afterSpeedTwoY = sumSpeedX/2 - damping*deltaSpeedY/2;
        console.log("masuk")
    }
    
    oneX += afterSpeedOneX;
    oneY += afterSpeedOneY;
    twoX += afterSpeedTwoX;
    twoY += afterSpeedTwoY;
    return {
        updatedOneX: oneX,
        updatedOneY: oneY,
        updatedTwoX: twoX,
        updatedTwoY: twoY,
        updatedSpeedOneX: afterSpeedOneX,
        updatedSpeedOneY: afterSpeedOneY,
        updatedSpeedTwoX: afterSpeedTwoX,
        updatedSpeedTwoY: afterSpeedTwoY
    }
}

const playerOne = new Ball(`Dudung`, 10, 10, 10, 2, 2, "#0095DD");
const playerTwo = new Ball(`Maman`, 10, canvas.width-10, canvas.height-10, 2, 2, "#05683F");
function mainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(playerOne);
    drawBall(playerTwo);
    // control
    // let radSpeed;
    // if(rightPressed) {
    //     playerOne.dx += 0.2;
    //     radSpeed = Math.sqrt((playerOne.dx ** 2) + (playerOne.dy ** 2))
    //     if (radSpeed > maxSpeed && playerOne.dx > maxSpeed) {
    //         playerOne.dx -= 0.2;
    //     } else if (radSpeed > maxSpeed) {
    //         if (playerOne.dy > 0) {
    //             playerOne.dy -= 0.2
    //         } else {
    //             playerOne.dy += 0.2
    //         }
    //     }
    // }
    // else if(leftPressed) {
    //     playerOne.dx -= 0.2;
    //     radSpeed = Math.sqrt((playerOne.dx ** 2) + (playerOne.dy ** 2))
    //     if (radSpeed > maxSpeed && playerOne.dx < maxSpeed) {
    //         playerOne.dx += 0.2;
    //     } else if (radSpeed > maxSpeed) {
    //         if (playerOne.dy > 0) {
    //             playerOne.dy -= 0.2
    //         } else {
    //             playerOne.dy += 0.2
    //         }
    //     }
    // }
    // else if(upPressed) {
    //     playerOne.dy -= 0.2;
    //     radSpeed = Math.sqrt((playerOne.dx ** 2) + (playerOne.dy ** 2))
    //     if (radSpeed > maxSpeed && playerOne.dy < maxSpeed) {
    //         playerOne.dy += 0.2;
    //     } else if (radSpeed > maxSpeed) {
    //         if (playerOne.dx > 0) {
    //             playerOne.dx -= 0.2
    //         } else {
    //             playerOne.dx += 0.2
    //         }
    //     }
    // }
    // else if(downPressed) {
    //     playerOne.dy += 0.2;
    //     radSpeed = Math.sqrt((playerOne.dx ** 2) + (playerOne.dy ** 2))
    //     if (radSpeed > maxSpeed && playerOne.dy > maxSpeed) {
    //         playerOne.dy -= 0.2;
    //     } else if (radSpeed > maxSpeed) {
    //         if (playerOne.dx > 0) {
    //             playerOne.dx -= 0.2
    //         } else {
    //             playerOne.dx += 0.2
    //         }
    //     }
    // }
    // end control
    // update on ball collision
    let collision = ballCollision(playerOne, playerTwo);
    playerOne.setPosition(collision.updatedOneX, collision.updatedOneY);
    playerTwo.setPosition(collision.updatedTwoX, collision.updatedTwoY);
    playerOne.setSpeed(collision.updatedSpeedOneX, collision.updatedSpeedOneY);
    playerTwo.setSpeed(collision.updatedSpeedTwoX, collision.updatedSpeedTwoY);
    // update on wall collision
    let wallOne = wallDetection(playerOne);
    let wallTwo = wallDetection(playerTwo);
    playerOne.setPosition(wallOne.updatedX, wallOne.updatedY);
    playerTwo.setPosition(wallTwo.updatedX, wallTwo.updatedY);
    playerOne.setSpeed(wallOne.updatedDx, wallOne.updatedDy);
    playerTwo.setSpeed(wallTwo.updatedDx, wallTwo.updatedDy);
}

setInterval(mainGame, 20);