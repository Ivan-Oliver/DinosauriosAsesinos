// Buscar imagen para poner en lugar de los rectangulos
// La imagen del obstaculo se pinta igual que lo hemos hecho con las balas

class Obstacle {
    constructor(canvasW, playerH, playerY0, ctx) {
        this.ctx = ctx

        this.w = 25
        this.h = this.w * 3

        this.x = canvasW
        this.y = playerY0 + playerH - this.h

        this.dx = 10
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "red"
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fill()
        this.ctx.closePath();
    }

    move() {
        this.x -= this.dx
    }
}

