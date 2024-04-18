// 21130447 - Võ Đức Minh - 0383350673 - Thứ 2, Ca 1


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const btn__load = document.querySelector('#btn__load');
const score = document.querySelector('.score');
const grid_size = 20;
const lv = document.querySelector('#level');
const time__bar = document.querySelector('#time__bar');
const ctx_bar = time__bar.getContext("2d");
const sp = document.querySelector('#speed')

document.getElementById("btn__popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});



var arr_hori = [];
var arr_ver = [];
let snakeBody = [];
let arr_food = [];
let snake_length = 1;
var direction = "";
let time = 30;
let k = time;
let cell = 600 / time;
let x_food_old, y_food_old;
var speed;
var speedAi;
var path = [];

//luu speed vao local
sp.addEventListener('change', () => {
    let speed = sp.value;
    console.log(speed);
    // window.localStorage.clear();
    localStorage.removeItem('speed');
    localStorage.setItem('speed', speed);
})

var cur_sp = window.localStorage.getItem('speed');

function load_speed() {
    sp.value = cur_sp;
}

if (cur_sp == 100) {
    speed = 1000;
    speedAi = 1100;
} else if (cur_sp == 500) {
    speed = 500;
    speedAi = 600;
} else {
    speed = 100
    speedAi = 150;
}


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

var point = 0;
let pointAi = 0;
var x_food, y_food;
// =============================================================================================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================
const makeFood = function () {

    x_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
    y_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;

    if (x_food <= 0 || y_food <= 0 || x_food >= canvas.width / grid_size || y_food >= canvas.width / grid_size) {
        makeFood();
    }
    // kiem tra moi trong body ran' ko
    if (snakeBody.some(function (item) {
        return item[0] == x_food * grid_size && item[1] == y_food * grid_size;
    })) {
        makeFood();
    } else {
        // kiem tra co nam trong tuong` ko
        if (isFoodInWall(x_food, y_food)) {

            makeFood();
        } else {
            // vex moi moi
            ctx.beginPath();
            ctx.rect(x_food * grid_size, y_food * grid_size, grid_size, grid_size);
            ctx.fillStyle = "white";
            ctx.fill();
        }
    }
}

//make food for AI
const makeFoodAi = function () {
    // Tạo một mồi mới ngẫu nhiên
    x_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
    y_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;


    if (x_food <= 0 || y_food <= 0 || x_food >= canvas.width / grid_size || y_food >= canvas.width / grid_size) {
        makeFoodAi();
    }

    if (isFoodInWall(x_food, y_food)) {

        makeFoodAi();
    }
    // kiem tra moi` co trong tuong` hay body ko
    if (snakeAiBody.some(function (item) {
        return item[0] == x_food && item[1] == y_food;
    }) || grid[y_food][x_food] == null) {
        makeFoodAi();
    } else {
        ctx.beginPath();
        ctx.rect(x_food * grid_size, y_food * grid_size, grid_size, grid_size);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}
//

// Hàm kiểm tra xem mồi mới có nằm trong tường không
const isFoodInWall = function (x_food, y_food) {
    // Kiểm tra xem mồi mới có nằm trong arr_hori hay arr_ver không
    for (let i = 0; i < arr_hori.length; i++) {
        if (x_food == arr_hori[i][0] && y_food == arr_hori[i][1]) {
            return true;
        }
    }
    for (let i = 0; i < arr_ver.length; i++) {
        if (x_food == arr_ver[i][0] && y_food == arr_ver[i][1]) {
            return true;
        }
    }
    // Kiểm tra xem mồi mới có nằm trong các biên của canvas không
    if (x_food <= 0 || y_food <= 0 || x_food >= canvas.width / grid_size || y_food >= canvas.width / grid_size) {
        return true;
    }
    return false;
}





// =============================================================================================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================

const eatFood = function () {
    let head = snakeBody[snakeBody.length - 1];

    if (head[0] == x_food * grid_size && head[1] == y_food * grid_size) {
        snake_length += 1;
        point++;
        k += 3;
        score.innerHTML = point;
        makeFood_by_lv();
        plus_time();
        //reset lai snake AI 
        count_path = 1;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j]) {
                    grid[i][j].visited = false;
                    grid[i][j].prev = null;
                }
            }
        }
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
// --------------------------------------------------------------------------------------------------------------------------
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
        // console.log(s.xpos + " " + s.ypos)
    }
}

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
    } else if (cur_lv == "4") {
        suicide_lv_4();
    } else if (cur_lv == "5") {
        suicide_lv_4();
    }
    else if (cur_lv == "6") {
        suicide_lv_4();
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
    else if (cur_lv == "4") {
        x_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
        y_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
        makeFood_lv_3();
    }
    else if (cur_lv == "5") {
        makeFood();
    }
    else if (cur_lv == "6") {
        makeFood();
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
    // window.localStorage.clear();
    localStorage.removeItem('level');
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
    load_lv();
    load_speed();
});




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

    arr_hori.forEach(element => {
        if (x_food == element[0] && y_food == element[1]) {
            draw_new_food();
        }
    });

    arr_ver.forEach(element => {
        if (x_food == element[0] && y_food == element[1]) {
            draw_new_food();
        }
    });

    if (x_food <= 0 || y_food <= 0 || x_food >= canvas.width || y_food >= canvas.width) {
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



function makeFood_lv_3() {
    setInterval(() => {
        update_food_direction();
        update_food_position();
        draw_new_food();
    }, 1500);
}

// -- lv4-----------------------------------------------------------------------------------------------------------------------------------

function draw_horizontal() {
    g = grid_size;
    i = 0;
    while (i <= 10) {
        arr_hori.push([Math.floor(Math.random() * 29), Math.floor(Math.random() * 29)]);
        i++;
    }
    arr_hori.forEach((element) => {
        x = element[0];
        y = element[1];
        ctx.beginPath();
        ctx.rect(x * g, y * g, 5 * g, g);
        ctx.fillStyle = "blue";
        ctx.fill();
    });

    let k = 1;
    arr_hori.forEach(element => {
        for (let n = 0; n < 4; n++) {
            arr_hori.push([element[0] + k, element[1]]);
            k++;
        }
        k = 1;
    });

}

function draw_vertital() {
    g = grid_size;
    i = 0;
    while (i <= 10) {
        arr_ver.push([Math.floor(Math.random() * 29), Math.floor(Math.random() * 29)]);
        i++;
    }
    arr_ver.forEach((element) => {
        x = element[0];
        y = element[1];
        ctx.beginPath();
        ctx.rect(x * g, y * g, g, 5 * g);
        ctx.fillStyle = "blue";
        ctx.fill();
    });

    let k = 1;
    arr_ver.forEach(element => {
        for (let n = 0; n < 4; n++) {
            arr_ver.push([element[0], element[1] + k]);
            k++;
        }
        k = 1;
    });

}



if (cur_lv == "4" || cur_lv == "5" || cur_lv == "6") {
    draw_horizontal();
    draw_vertital();
}

function suicide_lv_4() {
    let head = snakeBody[snakeBody.length - 1];

    arr_hori.forEach(element => {
        if (head[0] == element[0] * grid_size && head[1] == element[1] * grid_size) {
            gameOver();
        }
    });

    arr_ver.forEach(element => {
        if (head[0] == element[0] * grid_size && head[1] == element[1] * grid_size) {
            gameOver();
        }
    });

    for (let i = 0; i < snakeBody.length - 2; i++) {
        item = snakeBody[i];
        if (head[0] == item[0] && head[1] == item[1]) {
            gameOver();
        }
    }
}

// --time bar--------------------------------------------------------------------------------------------------------------------------------------

let intervalId;

function time_out() {
    ctx_bar.beginPath();
    ctx_bar.rect(0, 0, 600, 20);
    ctx_bar.fillStyle = "red";
    ctx_bar.fill();
    ctx_bar.closePath();
    // let k = time;
    intervalId = setInterval(() => {
        if (k < 0) {
            clearInterval(intervalId);
            gameOver();
            return;
        }
        ctx_bar.clearRect(k * cell, 0, cell, 20);
        k--;
        // console.log("point " + point)
    }, 1000);
}

if (cur_lv == '3' || cur_lv == '4' || cur_lv == '5' || cur_lv == '6') {
    time_out();
}

// -plus time----------------------------
function plus_time() {
    ctx_bar.beginPath();
    ctx_bar.rect((k - 3) * cell, 0, cell * 3, 20);
    ctx_bar.fillStyle = 'red';
    ctx_bar.fill();
    ctx.closePath();
}



// end time bar--------------------------------------------------------------------------------------------------------------------------------------

// khoi tao game
var x, y;
// Loop until we find a valid initial position for the snake
do {
    x = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
    y = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
} while (isInsideWall(x, y));

// Now x and y are guaranteed to be within the canvas and not inside walls

// Function to check if the position is inside the walls
function isInsideWall(x, y) {
    // Check if the position is within any horizontal or vertical walls
    for (let i = 0; i < arr_hori.length; i++) {
        if (x == arr_hori[i][0] && y == arr_hori[i][1]) {
            return true;
        }
    }
    for (let i = 0; i < arr_ver.length; i++) {
        if (x == arr_ver[i][0] && y == arr_ver[i][1]) {
            return true;
        }
    }
    // Check if the position is within the canvas boundaries
    return x <= 0 || y <= 0 || x >= canvas.width / grid_size || y >= canvas.width / grid_size;
}

// Now x and y are guaranteed to be within the canvas and not inside walls
// khoi tao lai vi tri con ran khi no nam trong tuong`
let s = new Snake(x * grid_size, y * grid_size);
s.draw(ctx);

let interval = setInterval(() => {
    if (cur_lv == "1") {
        moveToDirection();
    };

    if (cur_lv == "2") {
        //ve canvas
        moveToDirection_lv2();//colide with wall
    }

    if (cur_lv == "3") {
        moveToDirection_lv2();//
    }
    if (cur_lv == "4") {
        moveToDirection();
    }
    if (cur_lv == "5") {
        moveToDirection();
    }
    if (cur_lv == "6") {
        moveToDirection();
    }

}, speed);

// ============================================================================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================
// ====================================================NODE====================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================
class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.prev = null;
    }
}
var arr = [];
var grid = [];
var R, C;
var re = [];


function init_arr() {
    let arr = [];
    for (let i = 0; i < 30; i++) {
        arr[i] = [];
        for (let j = 0; j < 30; j++) {
            arr[i][j] = new Node(i, j);
        }
    }
    for (let i = 0; i < arr_ver.length; i++) {
        let e = arr_ver[i];
        let x_ver = e[1];
        let y_ver = e[0];
        if (x_ver >= 30 || y_ver >= 30) continue;
        arr[x_ver][y_ver] = null;
    }

    for (let i = 0; i < arr_hori.length; i++) {
        let e = arr_hori[i];
        let x_ver = e[1];
        let y_ver = e[0];
        if (x_ver >= 30 || y_ver >= 30) continue;
        arr[x_ver][y_ver] = null;
    }
    return arr;
}

//làm việc với biến toàn cục mà chỉ xây dựng hàm thay đổi 1 cái biến cục bộ
// ví dụ : cần xử lí load cái grid toàn cục
// mà dùng hàm bfs(node) trả về các neibor xung quanh node nhập vào
//nó chỉ thay đổi các node xung quanh đó chứ ko hề tác động gì tới các node trong grid hết***
// test
function getNeibor(node) {
    let list_nei = [];
    let dx = [-1, +1, 0, 0];
    let dy = [0, 0, -1, +1];

    for (let i = 0; i < 4; i++) {
        let neibor_x = node.x + dx[i];
        let neibor_y = node.y + dy[i];
        if (neibor_x >= R || neibor_y >= C || neibor_x < 0 || neibor_y < 0) continue;
        if (grid[neibor_x][neibor_y] == null) continue;
        let new_node = new Node(neibor_x, neibor_y);
        list_nei.push(new_node);
    }
    return list_nei;
}

function bfs(x, y) {
    let queue = [];
    queue.push(grid[x][y]);
    grid[x][y].visited = true;
    while (queue.length !== 0) {
        let cur = queue.shift();
        re.push(cur);
        let list_nei = getNeibor(cur);
        if (list_nei.length !== 0) {
            list_nei.forEach(e => {
                grid[e.x][e.y];
                if (grid[e.x][e.y].visited == false) {
                    grid[e.x][e.y].prev = cur;
                    grid[e.x][e.y].visited = true;
                    queue.push(grid[e.x][e.y]);
                }
            });
        }
    }
    return re;
}

function findPath(x1, y1, x2, y2) {

    if (grid[x2][y2] == null) {
        console.log('ko co duong di')
        return;
    }
    bfs(x1, y1);
    let cur = grid[x2][y2];
    let path = [];
    while (cur.prev !== null) {
        path.push(cur);
        cur = cur.prev
    }
    path.push(grid[x1][y1]);
    return path.reverse();
}



// ---------------------------------------TEST-----------------------------------------------------------------------------------------------------------

grid = init_arr();
var tempGrid = init_arr();
R = grid.length; C = R;

// =============================================================================================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================
// ================================================================================ SNAKE AI=============================================================================
var snake_length_ai = 1;
var count_path = 0;//nho update cho count ==1 khi thuc hien buoc di moi
var snakeAiBody = [];
var route = [];

class SnakeAI {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        snakeAiBody.push([this.x, this.y]);
        if (snake_length_ai > 1) {
            this.addSnakeToGrid();
        }
        if (snakeAiBody.length > snake_length_ai) {
            let itemRemove = snakeAiBody.shift();//tra ve gia tri vua dc xoa'
            ctx.clearRect(itemRemove[0] * grid_size, itemRemove[1] * grid_size, grid_size, grid_size);
            this.removeGrid(itemRemove[0], itemRemove[1]);
        }
        this.eatFoodAi();

        // this.updateGrid();
        ctx.beginPath();
        ctx.rect(this.x * grid_size, this.y * grid_size, grid_size, grid_size);
        ctx.fillStyle = "pink";
        ctx.fill();
    }

    eatFoodAi() {
        let head = snakeAiBody[snakeAiBody.length - 1];
        if (head[0] == x_food && head[1] == y_food) {

            point--;
            score.innerHTML = point;

            snake_length_ai += 1;
            count_path = 0;
            makeFoodAi();
            while (grid[y_food][x_food] == null) {
                makeFoodAi();
            }
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid.length; j++) {
                    if (grid[i][j]) {
                        grid[i][j].visited = false;
                        grid[i][j].prev = null;
                    }
                }
            }
        }
    }

    addSnakeToGrid() {
        for (let i = 0; i < snakeAiBody.length - 1; i++) {
            let cur = snakeAiBody[i];
            let x = cur[0];
            let y = cur[1];
            grid[y][x] = null;
        }
    }

    removeGrid(x, y) {
        grid[y][x] = new Node(y, x);
    }
}



var snakeAI = new SnakeAI(0, 0);
//make lv 6
if (cur_lv == '6') { snakeAI.draw(ctx); }

// cap nhat head Snake
function snakeAiMove() {
    let head = snakeAiBody[snakeAiBody.length - 1];
    let x = head[1];
    let y = head[0];
    // let path = [];
    //thay x = y_food cu~, y = x_food cu~

    path = findPath(x, y, y_food, x_food);
    if (path.length == 1) {
        snakeAiBody.forEach(e => {
            ctx.clearRect(e[0] * grid_size, e[1] * grid_size, grid_size, grid_size);
        });
        snake_length_ai = 1;
        snakeAiBody = [];
        snakeAiBody.push([0, 0]); // hoặc vị trí khởi tạo ban đầu của con rắn
        // Đặt lại lưới (grid) và chuẩn bị cho một lần chạy mới
        grid = init_arr();
        tempGrid = init_arr();
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j]) {
                    grid[i][j].visited = false;
                    grid[i][j].prev = null;
                }
            }
        }
        count_path = 0;
    }
    moveAlongPath(path);
}

//return count__path + set lai x,y cua Snake + ve~ lai Snake
//dang gap loi o path => quay tro ve 0,0 sau khi an moi
function moveAlongPath(path) {
    if (count_path < path.length) {
        let cur = path[count_path];
        snakeAI.x = cur.y;
        snakeAI.y = cur.x;
        snakeAI.draw(ctx);
        count_path++;
    }
}

var interval_snake_com = setInterval(snakeAiMove, speedAi);



// =============================================================================================================================================================
// hàm vẽ thân rắn liên tục để ko tạo ra hiệu ứng đứt đoạn thân rắn
function update_body_snake() {
    snakeBody.forEach(element => {
        ctx.beginPath();
        ctx.rect(element[0], element[1], grid_size, grid_size);
        ctx.fillStyle = "#87FF00";
        ctx.fill();
    });

    snakeAiBody.forEach(element => {
        ctx.beginPath();
        ctx.rect(element[0] * grid_size, element[1] * grid_size, grid_size, grid_size);
        ctx.fillStyle = "pink";
        ctx.fill();
    });
}
var interval_update_body_snake = setInterval(() => {
    update_body_snake();
}, 1);



//game over
function gameOver() {
    clearInterval(interval);
    clearInterval(intervalId);
    clearInterval(interval_snake_com);
    clearInterval(interval_update_body_snake);
    ctx.font = "60px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("THUA ÒI", 200, 100);
    ctx.fillText("CHƠI LẠI ĐI ^^", 140, 400);
}

function winGame() {
    if (point == 10) {
        // Tăng cấp độ hiện tại lên 1
        cur_lv = (parseInt(cur_lv) + 1).toString();
        // Lưu cấp độ mới vào localStorage
        localStorage.setItem('level', cur_lv);
        // Tải lại trang để bắt đầu màn chơi mới
        window.location.reload();
    }
}


intervalWinGame = setInterval(() => {
    winGame();
}, 1500)

