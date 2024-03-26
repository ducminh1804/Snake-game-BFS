const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


const grid_size = 20;
let snakeBody = [];
let arr_food = [];
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
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.grid_size = 20;
    }
    draw(ctx) {
        snakeBody.push([this.xpos, this.ypos]);
        if (snakeBody.length > 2) {
            var itemRemove = snakeBody.shift();//tra ve gia tri vua dc xoa'
            ctx.clearRect(itemRemove[0], itemRemove[1], this.grid_size, this.grid_size);
        }

        ctx.beginPath();
        ctx.rect(this.xpos, this.ypos, this.grid_size, this.grid_size);
        ctx.fillStyle = "#87FF00";
        ctx.fill();


    }
}

// 
var direction = "";
let s = new Snake(40, 20);
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
    s.draw(ctx);
}



//hàm tạo 1 điểm thức ăn => tránh trường hợp thức ăn trùng với ô nằm trong thân rắn
const makeFood = function () {
    let x_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
    let y_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;

    if (snakeBody.some(function (item) {
        return item[0] == x_food && item[1] == y_food;
    })) {
        makeFood();
    } else {
        ctx.beginPath();
        ctx.rect(x_food * grid_size, y_food * grid_size, grid_size, grid_size);
        ctx.fillStyle = "white";
        ctx.fill()
    }
}


makeFood()




setInterval(() => {
    moveToDirection();
}, 100);
