class Bullet {
    constructor(x, y, ctx) {
        this.ctx = ctx

        this.img = new Image()
        this.img.src = "./img/projectile.png"

        this.x = x
        this.y = y
    
        this.w = 40 * 2
        this.h = 5 * 2
        
        this.vx = 20
    }

    draw() {
      
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }


    move() {

        this.x += this.vx
    }
}