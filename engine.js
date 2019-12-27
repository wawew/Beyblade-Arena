let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;

const paddleHeight = 10;
const paddleWidth = canvas.width/2;
const paddleX = (canvas.width-paddleWidth) / 2;
const paddleY = canvas.height/8;
const paddleY2 = (canvas.height*7)/8-10;

const paddleXX = canvas.width/8;
const paddleXX2 = canvas.width*7/8-10;
const paddleWidthX = 10;
const paddleHeightX = canvas.height/2;
const paddleYX = canvas.height/4;

const weightClass = {
    heavy: 1.2,
    middle: 1,
    light: 0.8
}

const calcInit = (mass) => {
    let initMomentum = 5;
    let initSpeed = initMomentum/mass
    let initSpeedDir = Math.round((initSpeed / 2) * Math.sqrt(2) * 100 )/ 100
    console.log(initSpeedDir)
    return {
        mass: mass,
        dx: initSpeedDir,
        dy: initSpeedDir
    }
}

const moveAngle = (direction,distance) => {
    return {
        x: Math.round(distance * Math.sin(direction) * 100)/100,
        y: Math.round(0 - (distance * Math.cos(direction)) * 100)/100
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
        this.mass = mass;
        this.upPressed = false;
        this.downPressed = false;
        this.rightPressed = false;
        this.leftPressed = false;
        this.angle = 0
        this.key = {
            up: 'i',
            down: 'k',
            left: 'j',
            right: 'l'
        }
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
    setKeys(up, down, left, right) {
        this.key = {
            up: up,
            down: down,
            left: left,
            right: right
        }
    }
    getSpeed() {
        return {
            dx: this.dx,
            dy: this.dy
        }
    }
    updateAngle(dA) {
        this.angle += dA;
    }
}
let playerOneDetail = calcInit(weightClass.heavy)
let playerTwoDetail = calcInit(weightClass.light)
const playerOne = new Ball(`Dudung`, 10, 20, 20, playerOneDetail.dx, playerOneDetail.dy, "#0095DD", playerOneDetail.mass);
const playerTwo = new Ball(`Maman`, 10, canvas.width-20, canvas.height-20, 0 - playerTwoDetail.dx, (0 - playerTwoDetail.dy), "#05683F", playerTwoDetail.mass);
playerTwo.setKeys('w','s','a','d');


document.addEventListener("keydown", keyDownHandlerOne, false);
document.addEventListener("keyup", keyUpHandlerOne, false);
document.addEventListener("keydown", keyDownHandlerTwo, false);
document.addEventListener("keyup", keyUpHandlerTwo, false);

function keyDownHandlerOne(e) {
    if(e.key === playerOne.key.right) {
        playerOne.rightPressed=true;
    }
    else if(e.key === playerOne.key.left) {
        playerOne.leftPressed=true;
    }
    else if(e.key === playerOne.key.up) {
        playerOne.upPressed=true;
    }
    else if(e.key === playerOne.key.down) {
        playerOne.downPressed=true;
    }
}
function keyUpHandlerOne(e) {
    if(e.key === playerOne.key.right) {
        playerOne.rightPressed=false;
    }
    else if(e.key === playerOne.key.left) {
        playerOne.leftPressed=false;
    }
    else if(e.key === playerOne.key.up) {
        playerOne.upPressed=false;
    }
    else if(e.key === playerOne.key.down) {
        playerOne.downPressed=false;
    }
}

function keyDownHandlerTwo(e) {
    if(e.key === playerTwo.key.right) {
        playerTwo.rightPressed=true;
    }
    else if(e.key === playerTwo.key.left) {
        playerTwo.leftPressed=true;
    }
    else if(e.key === playerTwo.key.up) {
        playerTwo.upPressed=true;
    }
    else if(e.key === playerTwo.key.down) {
        playerTwo.downPressed=true;
    }
}
function keyUpHandlerTwo(e) {
    if(e.key === playerTwo.key.right) {
        playerTwo.rightPressed=false;
    }
    else if(e.key === playerTwo.key.left) {
        playerTwo.leftPressed=false;
    }
    else if(e.key === playerTwo.key.up) {
        playerTwo.upPressed=false;
    }
    else if(e.key === playerTwo.key.down) {
        playerTwo.downPressed=false;
    }
}

function control(ballObj) {
    let xVal = ballObj.dx
    let yVal = ballObj.dy
    if (ballObj.rightPressed) {
        xVal = (ballObj.dx + 0.2);
    } else if (ballObj.leftPressed) {
        xVal = (ballObj.dx - 0.2);
    } else if (ballObj.upPressed) {
        yVal = (ballObj.dy - 0.2);
    } else if (ballObj.downPressed) {
        yVal = (ballObj.dy + 0.2);
    } else {
        
    }
    return {
        resXSpeed: xVal,
        resYSpeed: yVal
    }
}

function capFunction(initSpeed, nowSpeed) {
    let radSpeed = Math.sqrt( (nowSpeed.dx ** 2) + (nowSpeed.dy ** 2) )
    if (radSpeed > 10) {
        return initSpeed
    } else {
        return nowSpeed
    }
}

function drawBall(BallClass,design) {
    ctx.beginPath();
    ctx.arc(BallClass.x, BallClass.y, BallClass.radius, 0, Math.PI*2);
    ctx.fillStyle = BallClass.color;
    ctx.fill();
    ctx.closePath();
    ctx.fillText(BallClass.name, BallClass.x - 17, BallClass.y + BallClass.radius + 8);
    ctx.beginPath();
    // ctx.moveTo(BallClass.x,BallClass.y)
    let target = moveAngle(BallClass.angle,BallClass.radius);
    let target2 = moveAngle((BallClass.angle + Math.PI),BallClass.radius);
    let target3 = moveAngle(BallClass.angle + (Math.PI/2),BallClass.radius);
    let target4 = moveAngle(BallClass.angle - (Math.PI/2),BallClass.radius);
    if (design == '//') {
        ctx.moveTo(BallClass.x + target.x, BallClass.y + target.y);
        ctx.lineTo(BallClass.x + target3.x, BallClass.y + target3.y);
        ctx.stroke();
        ctx.moveTo(BallClass.x + target4.x, BallClass.y + target4.y);
        ctx.lineTo(BallClass.x + target2.x, BallClass.y + target2.y);
        ctx.stroke();
    } else if (design == 'z') {
        ctx.moveTo(BallClass.x + target.x, BallClass.y + target.y);
        ctx.lineTo(BallClass.x + target3.x, BallClass.y + target3.y);
        ctx.stroke();
        ctx.moveTo(BallClass.x + target4.x, BallClass.y + target4.y);
        ctx.lineTo(BallClass.x + target2.x, BallClass.y + target2.y);
        ctx.stroke();
        ctx.moveTo(BallClass.x + target.x, BallClass.y + target.y);
        ctx.lineTo(BallClass.x + target2.x, BallClass.y + target2.y);
        ctx.stroke();
    }else if (design == '+') {
        ctx.moveTo(BallClass.x + target.x, BallClass.y + target.y);
        ctx.lineTo(BallClass.x + target2.x, BallClass.y + target2.y);
        ctx.stroke();
        ctx.moveTo(BallClass.x + target3.x, BallClass.y + target3.y);
        ctx.lineTo(BallClass.x + target4.x, BallClass.y + target4.y);
        ctx.stroke();
    }
    ctx.closePath();
}

function drawPaddle(paddleHeight, paddleWidth, paddleX, paddleY) {
    ctx.beginPath();
    ctx.rect(paddleX, (canvas.height-paddleY)-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function wallDetection(BallClass) {
    const damping = 0.98;
    let dx = BallClass.dx;
    let dy = BallClass.dy;
    let x = BallClass.x;
    let y = BallClass.y;

    if(y >= (canvas.height-paddleY)-paddleHeight) {
        if(x >= paddleX && x <= paddleX + paddleWidth) {
            dy = -dy;
        }
    }

    if(y <= canvas.height-paddleY2) {
        if(x >= paddleX && x <= paddleX + paddleWidth) {
            dy = -dy;
        }
    }

    if(x >= paddleXX+paddleWidthX) {
        if (y > paddleYX && y < (paddleYX+paddleHeightX)) {
            dx = -dx;
        }
    }

    if(x <= paddleXX2) {
        if (y > paddleYX && y < (paddleYX+paddleHeightX)) {
            dx = -dx;
        }
    }

    if(y > canvas.height-BallClass.radius || y < BallClass.radius) {
        dy = -dy;
    }
    
    if(x > canvas.width-BallClass.radius || x < BallClass.radius) {
        dx = -dx;
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
        // console.log("TABRAKAN");
    }
    
    return {
        updatedSpeedOneX: afterSpeedOneX,
        updatedSpeedOneY: afterSpeedOneY,
        updatedSpeedTwoX: afterSpeedTwoX,
        updatedSpeedTwoY: afterSpeedTwoY
    }
}

function mainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(playerOne,'z');
    drawBall(playerTwo,'+');
    drawPaddle(paddleHeight, paddleWidth, paddleX, paddleY);
    drawPaddle(paddleHeight, paddleWidth, paddleX, paddleY2);
    drawPaddle(paddleHeightX, paddleWidthX, paddleXX, paddleYX);
    drawPaddle(paddleHeightX, paddleWidthX, paddleXX2, paddleYX);

    let oneSpeed = playerOne.getSpeed();
    let twoSpeed = playerTwo.getSpeed();
    let varControlOne = control(playerOne);
    let varControlTwo = control(playerTwo);
    playerOne.setSpeed(varControlOne.resXSpeed, varControlOne.resYSpeed);
    playerTwo.setSpeed(varControlTwo.resXSpeed, varControlTwo.resYSpeed);
    let oneSpeedNow = playerOne.getSpeed();
    let twoSpeedNow = playerTwo.getSpeed();

    let speedCapOne = capFunction(oneSpeed,oneSpeedNow);
    let speedCapTwo = capFunction(twoSpeed,twoSpeedNow);
    playerOne.setSpeed(speedCapOne.dx, speedCapOne.dy);
    playerTwo.setSpeed(speedCapTwo.dx, speedCapTwo.dy);

    let collision = ballCollision(playerOne, playerTwo);
    playerOne.setSpeed(collision.updatedSpeedOneX, collision.updatedSpeedOneY);
    playerTwo.setSpeed(collision.updatedSpeedTwoX, collision.updatedSpeedTwoY);

    let wallOne = wallDetection(playerOne);
    let wallTwo = wallDetection(playerTwo);
    playerOne.setSpeed(wallOne.updatedSpeedX, wallOne.updatedSpeedY);
    playerTwo.setSpeed(wallTwo.updatedSpeedX, wallTwo.updatedSpeedY);

    playerOne.updatePosition(playerOne.dx, playerOne.dy);
    playerTwo.updatePosition(playerTwo.dx, playerTwo.dy);

    playerOne.updateAngle(0.1);
    playerTwo.updateAngle(0.1);
}

let interval = setInterval(mainGame, 20);