let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 1;
let dy = -1;

// function ball() {//radius, x, y, dx, dy) {}
//     let this.radius = ballRadius;
//     let this.x = x;
//     let this.y = y;
//     let this.dx = dx;
//     let this.dy = dy;
// }

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

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    let radSpeed
    if(rightPressed) {
        dx += 0.2;
        radSpeed = Math.sqrt((dx ** 2) + (dy ** 2))
        if (radSpeed > 5){
            dx -= 0.2;
        }
    }
    else if(leftPressed) {
        dx -= 0.2;
        radSpeed = Math.sqrt((dx ** 2) + (dy ** 2))
        if (radSpeed > 5){
            dx += 0.2;
        }
    }
    else if(upPressed) {
        dy -= 0.2;
        radSpeed = Math.sqrt((dx ** 2) + (dy ** 2))
        if (radSpeed > 5){
            dy += 0.2;
        }
    }
    else if(downPressed) {
        dy += 0.2;
        radSpeed = Math.sqrt((dx ** 2) + (dy ** 2))
        if (radSpeed > 5){
            dy -= 0.2;
        }
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 20);