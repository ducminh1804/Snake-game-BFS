const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const btn__load = document.querySelector('#btn__load');
const score = document.querySelector('.score');
const grid_size = 20;
const lv = document.querySelector('#level');


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
    ctx.lineTo(canvas.width, i * grid_size);
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



const eatFood = function () {
    let head = snakeBody[snakeBody.length - 1];

    if (head[0] == x_food * grid_size && head[1] == y_food * grid_size) {
        snake_length += 1;
        point++;
        score.innerHTML = point;
        makeFood_by_lv();
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






// main

makeFood();
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
        suicide_by_lv()

        ctx.beginPath();
        ctx.rect(this.xpos, this.ypos, this.grid_size, this.grid_size);
        ctx.fillStyle = "#87FF00";
        ctx.fill();
    }
}

// 


//cach 1: truyen doi tuong snake vao function(snake) va` dung snake.xpos
//cach 2: goi thang doi tuong s.xpos
const suicide_lv_2 = function () {
    let head = snakeBody[snakeBody.length - 1];
    for (let i = 0; i < snakeBody.length - 2; i++) {
        item = snakeBody[i];
        if (head[0] == item[0] && head[1] == item[1]) {
            gameOver();
        }
    }
    // console.log(s.xpos + "  " + s.ypos)

    if (s.xpos < 0 || s.ypos < 0 || s.xpos > canvas.width || s.ypos > canvas.width) {
        gameOver()
    }
}

function suicide_by_lv() {
    if (cur_lv == "1") {
        suicide();
    } else if (cur_lv == "2") {
        suicide_lv_2();
    }
    else if (cur_lv == "3") {
        suicide_lv_2();
    }
}

function makeFood_by_lv() {
    if (cur_lv == "1") {
        makeFood();
    } else if (cur_lv == "2") {
        makeFood();
    }
    else if (cur_lv == "3") {
        x_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
        y_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
        makeFood_lv_3();
    }
}

//nếu muốn so sánh hướng mới và hướng cũ 
// => cho hướng cũ vào biến temp và so sánh thoyy
document.addEventListener("keydown", function (event) {
    let newDirection;

    switch (event.key) {
        case "ArrowLeft":
            newDirection = "left";
            break;
        case "ArrowUp":
            newDirection = "up";
            break;
        case "ArrowRight":
            newDirection = "right";
            break;
        case "ArrowDown":
            newDirection = "down";
            break;
        default:
            break;
    }

    //ban đầu sẽ cập nhật được hướng direction
    if (
        (newDirection === "left" && direction !== "right") ||
        (newDirection === "right" && direction !== "left") ||
        (newDirection === "up" && direction !== "down") ||
        (newDirection === "down" && direction !== "up")
    ) {
        direction = newDirection;
    }
});


const moveToDirection = function () {
    switch (direction) {
        case "up":
            if (s.ypos <= 0) {
                s.ypos = canvas.width;
            }
            s.ypos -= s.grid_size;
            break;
        case "down":
            if (s.ypos >= canvas.height - grid_size) {
                s.ypos = -grid_size;
            }
            s.ypos += s.grid_size;
            break;
        case "right":
            if (s.xpos >= canvas.width - grid_size) {
                s.xpos = -grid_size;
            }
            s.xpos += s.grid_size;
            break;
        case "left":
            if (s.xpos <= 0) {
                s.xpos = canvas.width;
            }
            s.xpos -= s.grid_size;
            break;
        default:
            break;
    }
    s.draw(ctx);
}



//luu lv vao local
const op = document.querySelectorAll('option');
lv.addEventListener('change', (e) => {
    let level = lv.value;
    window.localStorage.clear();
    localStorage.setItem('level', level);
})


btn__load.addEventListener("click", function (e) {
    window.location.reload();
})

var cur_lv = window.localStorage.getItem('level');

function load_lv() {
    lv.value = cur_lv;
}



document.addEventListener("DOMContentLoaded", function (event) {
    load_lv()
});





// let interval = setInterval(() => {
//     moveToDirection();
// }, 50);

function gameOver() {
    clearInterval(interval);
    alert('game over');
}

// -------------------------------------------------------------------------------------------------------------------------------------
//level 2
//make a wall
function moveToDirection_lv2() {
    switch (direction) {
        case "up":
            s.ypos -= s.grid_size;
            break;
        case "down":
            s.ypos += s.grid_size;
            break;
        case "right":
            s.xpos += s.grid_size;
            break;
        case "left":
            s.xpos -= s.grid_size;
            break;
        default:
            break;
    }
    s.draw(ctx);
}


// -------------------------------------------------------------------------------------------------------------------------------------
//level 3
//make a fodd escape



let f_direction = "";

// setInterval(() => {
//     update_food_direction()
//     console.log(f_direction);
// }, 1000);

function update_food_direction() {
    let temp = Math.floor(Math.random() * 4) + 1;
    switch (temp) {
        case 1:
            f_direction = "left";
            break;
        case 2:
            f_direction = "up";
            break;
        case 3:
            f_direction = "right";
            break;
        case 4:
            f_direction = "down";
            break;
        default:
            break;
    }
}


function update_food_position() {
    switch (f_direction) {
        case "up":
            if (y_food > 0) {
                y_food--;
            }
            break;
        case "down":
            if (y_food < canvas.width / grid_size) {
                y_food++;
            }
            break;
        case "left":
            if (x_food > 0) {
                x_food--;
            }
            break;
        case "right":
            if (x_food < canvas.width / grid_size) {
                x_food++;
            }
            break;
        default:
            break;
    }
}


let food_body = [];
function draw_new_food() {
    if (snakeBody.some(function (item) {
        return item[0] == x_food * grid_size && item[1] == y_food * grid_size;
    })) {
        // Nếu có, gọi lại hàm draw_new_food() để tạo mồi mới khác
        draw_new_food();
    }
    else {
        food_body.push([x_food, y_food]);
        ctx.beginPath();
        ctx.rect(x_food * grid_size, y_food * grid_size, grid_size, grid_size);
        ctx.fillStyle = "red";
        ctx.fill();
    }

    if (food_body.length > 1) {
        var foodRemove = food_body.shift(); // Lấy vị trí thức ăn cũ từ mảng food_body
        ctx.clearRect(foodRemove[0] * grid_size, foodRemove[1] * grid_size, grid_size, grid_size);
    }
}

// draw_new_food()
const makeFood_lv_3 = setInterval(() => {
    console.log('---------------------------')
    // makeFood();
    update_food_direction();
    update_food_position();
    draw_new_food();
    // console.log(f_direction);
    // console.log("x_food = " + x_food)
    // console.log("y_food = " + y_food)
    // console.log('---------------------------')
}, 1000);


// -------------------------------------------------------------------------------------------------------------------------------------



// khoi tao game
x = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
y = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
let s = new Snake(x * grid_size, y * grid_size);
s.draw(ctx);

let interval = setInterval(() => {
    if (cur_lv == "1") {
        moveToDirection();
    };

    if (cur_lv == "2") {
        //ve canvas
        moveToDirection_lv2();
    }

    if (cur_lv == "3") {
        moveToDirection_lv2();
    }
}, 100);