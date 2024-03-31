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