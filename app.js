const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const btn__load = document.querySelector('#btn__load');
const score = document.querySelector('.score');
const grid_size = 20;
const lv = document.querySelector('#level');
const time__bar = document.querySelector('#time__bar');
const ctx_bar = time__bar.getContext("2d");

var arr_hori = [];
var arr_ver = [];
let snakeBody = [];
let arr_food = [];
let snake_length = 1;
var direction = "";
let time = 200000;
let k = time;
let cell = 600 / time;

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
var x_food, y_food;
// const makeFood = function () {
//     // Tạo một mồi mới ngẫu nhiên
//     x_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
//     y_food = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;

//     // Kiểm tra xem mồi mới có nằm trong thân rắn hay không
//     if (snakeBody.some(function (item) {
//         return item[0] == x_food * grid_size && item[1] == y_food * grid_size;
//     })) {
//         // Nếu có, gọi lại hàm makeFood() để tạo mồi mới khác
//         makeFood();
//     } else {
//         // Nếu không, vẽ mồi mới lên canvas
//         ctx.beginPath();
//         ctx.rect(x_food * grid_size, y_food * grid_size, grid_size, grid_size);
//         ctx.fillStyle = "white";
//         ctx.fill();
//     }
// }





// =============================================================================================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================
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
        // Kiểm tra xem mồi mới có nằm trong tường không
        if (isFoodInWall(x_food, y_food)) {
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
}

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
    }
    // console.log("k= " + k)
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


function gameOver() {
    clearInterval(interval);
    clearInterval(intervalId);
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
// console.log(arr_hori);

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

time_out();

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
var x = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
var y = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
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

}, 100);



// ------------------------test-----------------
function randPos() {
    var randX = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
    var randY = Math.floor(Math.random() * (canvas.width / grid_size - 1)) + 1;
    if (randX == x || randY == y || randX == x_food || randY == y_food) {
        randPos();
    }
    // arr_hori.forEach(element => {
    //     if (element[0] == randX) {
    //         randPos();
    //     }
    // });

    // arr_ver.forEach(element => {
    //     if (element[1] == randY) {
    //         randPos();
    //     }
    // });
    return [randX, randY]
}
// 


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
        console.log("ko co duong di");
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
R = grid.length; C = R;

console.log(grid)
// console.log(grid[0][0])
// console.log(findPath(0, 0, 10,10))

// =============================================================================================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================
// ================================================================================ SNAKE AI=============================================================================
var snake_length_ai = 1;
var count_path = 1;//nho update cho count ==1 khi thuc hien buoc di moi
var snakeAiBody = [];

class SnakeAI {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        snakeAiBody.push([this.x, this.y]);
        if (snakeAiBody.length > snake_length_ai) {
            let itemRemove = snakeAiBody.shift();//tra ve gia tri vua dc xoa'
            ctx.clearRect(itemRemove[0] * grid_size, itemRemove[1] * grid_size, grid_size, grid_size);
        }
        this.eatFood();

        ctx.beginPath();
        ctx.rect(this.x * grid_size, this.y * grid_size, grid_size, grid_size);
        ctx.fillStyle = "pink";
        ctx.fill();
        // console.log(snakeAiBody)
    }

    eatFood() {
        let head = snakeAiBody[snakeAiBody.length - 1];
        if (head[0] == x_food && head[1] == y_food) {
            snake_length_ai += 1;
            makeFood();
            count_path = 1;
        }
    }
}

var snakeAI = new SnakeAI(0, 0);
snakeAI.draw(ctx);

//return count__path + set lai x,y cua Snake + ve~ lai Snake
//dang gap loi o path => quay tro ve 0,0 sau khi an moi
function moveAlongPath(path) {
    if (count_path < path.length) {
        let cur = path[count_path];
        snakeAI.x = cur.y;
        snakeAI.y = cur.x;
        snakeAI.draw(ctx);
        count_path++;
        console.log('///////////');
        console.log("head.x " + cur.x);
        console.log("head.y " + cur.y);
        snakeAiBody.forEach(element => {
            console.log(element[0] + ' ' + element[1]);
        });
        console.log('///////////');
    }
}

// cap nhat head Snake
function snakeAiMove() {
    let head = snakeAiBody[snakeAiBody.length - 1];
    let x = head[1];
    let y = head[0];
    //thay x = y_food cu~, y = x_food cu~
    let path = findPath(x, y, y_food, x_food);
    moveAlongPath(path);
}

// snakeAiMove()
var interval_snake_com = setInterval(snakeAiMove, 10)
// console.log(findPath(0, 0, y_food, x_food));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// console.log(findPath(0, 0, 23, 22));


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const eatFood = function () {
//     let head = snakeBody[snakeBody.length - 1];

//     if (head[0] == x_food * grid_size && head[1] == y_food * grid_size) {
//         snake_length += 1;
//         point++;
//         k += 3;
//         score.innerHTML = point;
//         makeFood_by_lv();
//         plus_time();
//     }
//     // console.log("k= " + k)
// }


// =============================================================================================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================
// =============================================================================================================================================================

