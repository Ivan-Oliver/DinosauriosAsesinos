class Background {
    constructor(canvasW, canvasH, ctx){
        console.log("Background creado");

        this.ctx = ctx

        this.img = new Image()
        this.img.src = "./img/ba30ebe810c686c2c511b5d95fb44af0--pixel-art-moodboard.jpg"

        // Tamaño imagen
        this.w = canvasW
        this.h = canvasH

        // Posición inicial
        this.x = 0
        this.y = 0

        this.dx = 10
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)

        this.ctx.drawImage(
            this.img, 
            this.x + this.w, 
            this.y, 
            this.w,
            this.h
        )
    }

    move() {
        this.x -= this.dx

        if (this.x <= -this.w) this.x = 0
    }
   
}





