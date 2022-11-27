class Enemy {
    constructor(canvasW, playerH, playerY0, ctx) {
        this.ctx = ctx

        this.img = new Image()
        this.img.src = './img/andar/1.png'

        this.img.frameIndex = 1

        this.w = 80 * 2 
        this.h = 70 *2
 
        this.x = canvasW
        this.y = playerY0 + playerH - this.h + 20


        this.dx = 14
    }


    draw(frameCounter) {

        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)

        this.animateImg(frameCounter)  
    }

    animateImg(frameCounter) {
        if (frameCounter % 6 === 0) {
            this.img.src = `./img/andar/${++this.img.frameIndex}.png`

            if (this.img.frameIndex === 12)
                this.img.frameIndex = 0
        }
    }

    move() {    
        this.x -= this.dx
    }
}