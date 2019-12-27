let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;

const paddleHeightHorz = 10;
const paddleWidthHorz = canvas.width/2;
const paddleWidthVert = 10;
const paddleHeightVert = canvas.height/2;
// upper paddle
const paddleUpX = (canvas.width-paddleWidthHorz)/2;
const paddleUpY = canvas.height/8;
// lower paddle
const paddleLowX = paddleUpX;
const paddleLowY = (canvas.height*7)/8-10;
// left paddle
const paddleLeftX = canvas.width/8;
const paddleLeftY = (canvas.height-paddleHeightVert)/2;
// right paddle
const paddleRightX = canvas.width*7/8-10;
const paddleRightY = paddleLeftY;

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
            up: 'w',
            down: 's',
            left: 'a',
            right: 'd'
        };
        this.health = 15;
    }
    updateHealth(hp) {
        this.health += hp;
    }
    checkLose() {
        if (this.health <= 0) {
            alert(`GAME OVER\n${this.name} Lose!`);
            document.location.reload();
            clearInterval(interval);
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
playerTwo.setKeys('i','k','j','l');


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

function drawBall(ballObject) {
    ctx.beginPath();
    ctx.arc(ballObject.x, ballObject.y, ballObject.radius, 0, Math.PI*2);
    ctx.fillStyle = ballObject.color;
    ctx.fill();
    ctx.closePath();
    ctx.fillText(ballObject.name, ballObject.x - 17, ballObject.y + ballObject.radius + 8);
    ctx.beginPath();
    // ctx.moveTo(BallClass.x,BallClass.y)
    let target = moveAngle(ballObject.angle,ballObject.radius);
    let target2 = moveAngle((ballObject.angle + Math.PI),ballObject.radius);
    ctx.moveTo(ballObject.x + target.x, ballObject.y + target.y);
    ctx.lineTo(ballObject.x + target2.x, ballObject.y + target2.y);
    ctx.stroke();
    ctx.closePath();
}

function drawPaddle(paddleUpX, paddleUpY, paddleHeight, paddleWidth) {
    ctx.beginPath();
    ctx.rect(paddleUpX, paddleUpY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function wallDetection(ballObject) {
    let dx = ballObject.dx;
    let dy = ballObject.dy;
    let x = ballObject.x;
    let y = ballObject.y;

    if (x+dx >= paddleLeftX && x+dx <= paddleLeftX+paddleWidthVert && y+dy >= paddleLeftY && y+dy <= paddleLeftY+paddleHeightVert) {
        dx = -dx;
        ballObject.updateHealth(-1);
    } else if (x+dx >= paddleRightX && x+dx <= paddleRightX+paddleWidthVert && y+dy >= paddleRightY && y+dy <= paddleRightY+paddleHeightVert) {
        dx = -dx;
        ballObject.updateHealth(-1);
    } else if (x+dx >= paddleUpX && x+dx <= paddleUpX+paddleWidthHorz && y+dy >= paddleUpY && y+dy <= paddleUpY+paddleHeightHorz) {
        dy = -dy;
        ballObject.updateHealth(-1);
    } else if (x+dx >= paddleLowX && x+dx <= paddleLowX+paddleWidthHorz && y+dy >= paddleLowY && y+dy <= paddleLowY+paddleHeightHorz) {
        dy = -dy;
        ballObject.updateHealth(-1);
    }

    if(y > canvas.height-ballObject.radius || y < ballObject.radius) {
        dy = -dy;
    }
    
    if(x > canvas.width-ballObject.radius || x < ballObject.radius) {
        dx = -dx;
    }

    return {
        updatedSpeedX: dx,
        updatedSpeedY: dy
    }
}

function ballCollision(ballOne, ballTwo) {
    const deltaX = Math.abs(ballOne.x - ballTwo.x);
    const deltaY = Math.abs(ballOne.y - ballTwo.y);
    const gap = Math.sqrt(deltaX**2 + deltaY**2);
    
    let afterSpeedOneX = ballOne.dx
    let afterSpeedOneY = ballOne.dy;
    let afterSpeedTwoX = ballTwo.dx
    let afterSpeedTwoY = ballTwo.dy;
    
    if(gap <= ballOne.radius+ballTwo.radius) {
        afterSpeedOneX = (ballOne.dx*(ballOne.mass-ballTwo.mass) + (2*ballTwo.mass*ballTwo.dx)) / (ballOne.mass+ballTwo.mass);
        afterSpeedOneY = (ballOne.dy*(ballOne.mass-ballTwo.mass) + (2*ballTwo.mass*ballTwo.dy)) / (ballOne.mass+ballTwo.mass);
        afterSpeedTwoX = (ballTwo.dx*(ballTwo.mass-ballOne.mass) + (2*ballOne.mass*ballOne.dx)) / (ballOne.mass+ballTwo.mass);
        afterSpeedTwoY = (ballTwo.dy*(ballTwo.mass-ballOne.mass) + (2*ballOne.mass*ballOne.dy)) / (ballOne.mass+ballTwo.mass);
        console.log("TABRAKAN");
        // calculate impact point between two bois
        let impactX = (ballOne.x*ballTwo.radius + ballTwo.x*ballOne.radius) / (ballOne.radius + ballTwo.radius);
        let impactY = (ballOne.y*ballTwo.radius + ballTwo.y*ballOne.radius) / (ballOne.radius + ballTwo.radius);
    }
    
    return {
        updatedSpeedOneX: afterSpeedOneX,
        updatedSpeedOneY: afterSpeedOneY,
        updatedSpeedTwoX: afterSpeedTwoX,
        updatedSpeedTwoY: afterSpeedTwoY
    }
}

function showNyawa(BallClass) {
    let nyawa = BallClass.health;
    let player = BallClass.name;
    let nyawaBiru = document.getElementById("nyawaBiru");
    let nyawaHijau = document.getElementById("nyawaHijau");
    let player1 = document.getElementById("player1");
    let player2 = document.getElementById("player2");
    if (BallClass === playerOne) {
        player1.innerHTML = player;
        nyawaBiru.innerHTML = nyawa;
    } else {
        player2.innerHTML = player;
        nyawaHijau.innerHTML = nyawa;
    }
}

function mainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(playerOne);
    drawBall(playerTwo);
    drawPaddle(paddleUpX, paddleUpY, paddleHeightHorz, paddleWidthHorz);
    drawPaddle(paddleLowX, paddleLowY, paddleHeightHorz, paddleWidthHorz);
    drawPaddle(paddleLeftX, paddleLeftY, paddleHeightVert, paddleWidthVert);
    drawPaddle(paddleRightX, paddleRightY, paddleHeightVert, paddleWidthVert);
    showNyawa(playerOne);
    showNyawa(playerTwo);

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

  playerOne.checkLose();
    playerTwo.checkLose();
}

let interval = setInterval(mainGame, 20);