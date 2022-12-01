

class Obstacle {
    constructor(canvasW, playerH, playerY0, ctx) {
        this.ctx = ctx

        this.img = new Image()
        this.img.src = "./img/spring trees pack/10.png"

        this.w = 50
        this.h = this.w * 2

        this.x = canvasW
        this.y = playerY0 + playerH - this.h

        this.dx = 10
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    move() {
        this.x -= this.dx
    }
}

