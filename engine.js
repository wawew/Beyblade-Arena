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
    constructor(name="player", radius, initX, initY, initDx, initDy, color, mass) {
        this.name = name;
        this.radius = radius;
        this.x = initX;
        this.y = initY;
        this.dx = initDx;
        this.dy = initDy;
        this.color = color;
        this.mass = 1;
    }
    setSpeed(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
    updateSpeed(dx, dy) {
        this.dx += dx;
        this.dy += dy;
    }
    updatePosition(dx, dy) {
        this.x += dx;
        this.y += dy;
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
    const damping = 0.98;
    let dx = BallClass.dx;
    let dy = BallClass.dy;
    let x = BallClass.x;
    let y = BallClass.y;
    if(x > canvas.width-BallClass.radius || x < BallClass.radius) {
        dx = -dx;
    }
    if(y > canvas.height-BallClass.radius || y < BallClass.radius) {
        dy = -dy;
    }
    return {
        updatedSpeedX: dx,
        updatedSpeedY: dy
    }
}

function ballCollision(BallOne, BallTwo) {
    const deltaX = Math.abs(BallOne.x - BallTwo.x);
    const deltaY = Math.abs(BallOne.y - BallTwo.y);
    const gap = Math.sqrt(deltaX**2 + deltaY**2);
    
    const damping = 0.98;
    const sumSpeedX = BallOne.dx + BallTwo.dx;
    const sumSpeedY = BallOne.dy + BallTwo.dy;
    const deltaSpeedX = BallOne.dx - BallTwo.dx;
    const deltaSpeedY = BallOne.dy - BallTwo.dy;
    let afterSpeedOneX = BallOne.dx
    let afterSpeedOneY = BallOne.dy;
    let afterSpeedTwoX = BallTwo.dx
    let afterSpeedTwoY = BallTwo.dy;
    
    if(gap <= BallOne.radius+BallTwo.radius) {
        afterSpeedOneX = (BallOne.dx * (BallOne.mass-BallTwo.mass) + (2*BallTwo.mass*BallTwo.dx)) / (BallOne.mass+BallTwo.mass);
        afterSpeedOneY = (BallOne.dy * (BallOne.mass-BallTwo.mass) + (2*BallTwo.mass*BallTwo.dy)) / (BallOne.mass+BallTwo.mass);
        afterSpeedTwoX = (BallTwo.dx * (BallTwo.mass-BallOne.mass) + (2*BallOne.mass*BallOne.dx)) / (BallOne.mass+BallTwo.mass);
        afterSpeedTwoY = (BallTwo.dy * (BallTwo.mass-BallOne.mass) + (2*BallOne.mass*BallOne.dy)) / (BallOne.mass+BallTwo.mass);
        
        // afterSpeedOneX = damping*deltaSpeedX/2 + sumSpeedX/2;
        // afterSpeedOneY = damping*deltaSpeedY/2 + sumSpeedY/2;
        // afterSpeedTwoX = sumSpeedX/2 - damping*deltaSpeedX/2;
        // afterSpeedTwoY = sumSpeedX/2 - damping*deltaSpeedY/2;
        console.log("TABRAKAN");
    }
    
    return {
        updatedSpeedOneX: afterSpeedOneX,
        updatedSpeedOneY: afterSpeedOneY,
        updatedSpeedTwoX: afterSpeedTwoX,
        updatedSpeedTwoY: afterSpeedTwoY
    }
}

const playerOne = new Ball(`Dudung`, 20, 20, 20, 5, 2, "#0095DD", 1);
const playerTwo = new Ball(`Maman`, 20, canvas.width-20, canvas.height-20, 2, 2, "#05683F", 1.2);
function mainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(playerOne);
    drawBall(playerTwo);

    let collision = ballCollision(playerOne, playerTwo);
    playerOne.setSpeed(collision.updatedSpeedOneX, collision.updatedSpeedOneY);
    playerTwo.setSpeed(collision.updatedSpeedTwoX, collision.updatedSpeedTwoY);

    let wallOne = wallDetection(playerOne);
    let wallTwo = wallDetection(playerTwo);
    playerOne.setSpeed(wallOne.updatedSpeedX, wallOne.updatedSpeedY);
    playerTwo.setSpeed(wallTwo.updatedSpeedX, wallTwo.updatedSpeedY);

    playerOne.updatePosition(playerOne.dx, playerOne.dy);
    playerTwo.updatePosition(playerTwo.dx, playerTwo.dy);
}

setInterval(mainGame, 20);