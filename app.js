const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


const grid_size = 20;

for (let i = 1; i < 30; i++) {
    ctx.beginPath();
    ctx.moveTo(i * grid_size, 0);
    ctx.lineTo(i * grid_size, 600);
    ctx.strokeStyle = "#1F1F2D";
    ctx.stroke();
}

for (let i = 1; i < 30; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * grid_size);
    ctx.lineTo(600, i * grid_size);
    ctx.strokeStyle = "#1D1D2B";
    ctx.stroke();
}
class Snake {
    constructor(xpos, ypos, grid_size) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.grid_size = grid_size;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.xpos, this.ypos, this.grid_size, this.grid_size);
        ctx.fillStyle = "#87FF00";
        ctx.fill();
    }
}

// 
var direction = "";
let s = new Snake(40, 20, 20);
s.draw(ctx);


document.onkeydown = function (e) {
    let keyCode;
    if (e == null) {
        keyCode = window.e.keyCode;
    } else {
        keyCode = e.keyCode;
    }
    switch (keyCode) {
        case 37:
            direction = "left";
            break;
        case 38:
            direction = "up";
            break;
        case 39:
            direction = "right";
            break;
        case 40:
            direction = "down";
            break;
        default:
            break;
    }
}

const moveToDirection = function () {
    switch (direction) {
        case "up":
            if (s.ypos <= 0) {
                s.ypos = 600;
            }
            s.ypos -= s.grid_size;
            break;
        case "down":
            if (s.ypos >= canvas.height - 20) {
                s.ypos = -20;
            }
            s.ypos += s.grid_size;
            break;
        case "right":
            if (s.xpos >= canvas.width - 20) {
                s.xpos = -20;
            }
            s.xpos += s.grid_size;
            break;
        case "left":
            if (s.xpos <= 0) {
                s.xpos = 600;
            }
            s.xpos -= s.grid_size;
            break;
        default:
            break;
    }
    ctx.clearRect(0, 0, 600, 600);
    s.draw(ctx);
}

setInterval(() => {
    moveToDirection();
}, 200);


console.log(s.xpos)
console.log(s.ypos)

