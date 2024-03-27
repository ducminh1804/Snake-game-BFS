const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const btn__load = document.querySelector('#btn__load');
const score = document.querySelector('.score');
const grid_size = 20;
let snakeBody = [];
let arr_food = [];
let snake_length = 2;
var direction = "";


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

let point = 0;
let x_food, y_food;
const makeFood = function () {
    // Tạo một mồi mới ngẫu nhiên
    x_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
    y_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;

    // Kiểm tra xem mồi mới có nằm trong thân rắn hay không
    if (snakeBody.some(function (item) {
        return item[0] == x_food * grid_size && item[1] == y_food * grid_size;
    })) {
        // Nếu có, gọi lại hàm makeFood() để tạo mồi mới khác
        makeFood();
    } else {
        // Nếu không, vẽ mồi mới lên canvas
        ctx.beginPath();
        ctx.rect(x_food * grid_size, y_food * grid_size, grid_size, grid_size);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}
makeFood();
const eatFood = function () {
    let head = snakeBody[snakeBody.length - 1];

    if (head[0] == x_food * grid_size && head[1] == y_food * grid_size) {
        snake_length += 1;
        point++;
        score.innerHTML = point;
        makeFood();
        // snakeBody.push([x_food,y_food]);
    }
}

//tu. sat'
const suicide = function () {
    let head = snakeBody[snakeBody.length - 1];
    for (let i = 0; i < snakeBody.length - 2; i++) {
        item = snakeBody[i];
        if (head[0] == item[0] && head[1] == item[1]) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(interval);
    alert('game over');
}


// main
class Snake {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.grid_size = 20;
    }
    draw(ctx) {
        snakeBody.push([this.xpos, this.ypos]);
        if (snakeBody.length > snake_length) {
            var itemRemove = snakeBody.shift();//tra ve gia tri vua dc xoa'
            ctx.clearRect(itemRemove[0], itemRemove[1], this.grid_size, this.grid_size);
        }
        eatFood();
        suicide();
        ctx.beginPath();
        ctx.rect(this.xpos, this.ypos, this.grid_size, this.grid_size);
        ctx.fillStyle = "#87FF00";
        ctx.fill();
    }
}

// 
x = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
y = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
let s = new Snake(x * grid_size, y * grid_size);
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



let interval = setInterval(() => {
    moveToDirection();
}, 50);

btn__load.addEventListener("click", function (e) {
    window.location.reload();
})


const control_direction = function () {
    document.addEventListener("keydown", function (event) {
        // Kiểm tra xem phím nào được nhấ
        let keyCode = event.key;

        switch (keyCode) {
            case 37:
                if (direction == "right") {
                    event.preventDefault();
                }
                break;

            default:
                break;
        }
    });

}

control_direction();

