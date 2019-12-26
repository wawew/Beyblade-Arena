let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

// let ball(radius, x, y, dx, dy) {
//     this.radius = radius;
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
// }

let ball = {
    radius: 10,
    x: this.radius,
    y: this.radius,
    dx: 2,
    dy: 2,
    setPosition: (x,y) => {
        this.x = x;
        this.y = y;
    },
    setSpeed: (dx, dy) => {
        this.dx = dx;
        this.dy = dy;
    }
}

function drawBall(ballObject) {
    const ball = ballObject;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let playerOne = ball;
    let playerTwo = ball;
    // playerTwo.setPosition(canvas.width, canvas.height);
    drawBall(playerOne);
    drawBall(playerTwo);
    
    if(playerOne.x + playerOne.dx > canvas.width-playerOne.radius || playerOne.x + playerOne.dx < playerOne.radius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 20);