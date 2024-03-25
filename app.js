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
        ctx.rect(this.xpos, this.ypos, this.grid_size, this.grid_size);
        ctx.fillStyle = "#87FF00";
        ctx.fill();
    }
}

// 
var direction;
let s = new Snake(40, 20, 20);
s.draw(ctx);


document.onkeydown = function (e) {
    let keyCode;
    if (e == null) {
        keyCode = window.e.keyCode;
    } else {
        keyCode = e.keyCode;
    }
    // console.log(keyCode);

    switch (keyCode) {
        case 37:
            keyCode = 37
            s.xpos -= s.grid_size;
            s.draw(ctx);
            console.log("left");
            break;
        case 38:
            s.ypos -= s.grid_size;
            s.draw(ctx);
            console.log("up");

            break;
        case 39:
            s.xpos += s.grid_size;
            s.draw(ctx);
            console.log("right");

            break;
        case 40:
            s.ypos += s.grid_size;
            s.draw(ctx);
            console.log("down");

            break;
        default:
            break;
    }
}


// const update = function () {
//     s.xpos += s.grid_size;
//     s.draw(ctx);
// }


// setInterval(() => {
//     update()
// }, 500);
