class Player {
    constructor(canvasW, canvasH, keys, ctx) {
        this.ctx = ctx
        this.keys = keys

        this.canvasW = canvasW

        this.img = new Image()
        this.img.src = "./img/run.png"

        this.img.frames = 8
        this.img.frameIndex = 0

        this.w = 150;
        this.h = 150;

        this.x = canvasW * 0.08;

        this.y0 = canvasH * .6
        this.y = this.y0

        this.vy = 1

        this.bullets = []

        this.setControls()        
    }

    setControls() {
        document.addEventListener('keydown', (e) => {
            // console.log(e.keyCode) // Obtener KeyCodes de tecla pulsada
            if(e.keyCode === this.keys.TOP_KEY && this.y0 === this.y) {
                this.y -= 5 // Por la condición de fin de salto (move())  
                this.vy += -10
            } else if (e.keyCode === this.keys.SPACE)
                this.shoot()
        }) // 
    }

    shoot() {
        console.log("Disparar");

        this.bullets.push(new Bullet(
                this.x + this.w, 
                this.y + this.h / 2, 
                this.ctx))
    }

    draw(frameCounter) {
        this.ctx.drawImage(
            this.img, 
                // Calcula x del fograma actual
                this.img.frameIndex * Math.floor(this.img.width / this.img.frames), 
                0, 
                // Ancho de un fotograma
                Math.floor(this.img.width / this.img.frames), 
                this.img.height, 
                this.x, 
                this.y, 
                this.w,
                this.h
        );

        this.animateImg(frameCounter)

        this.bullets = this.bullets.filter((bullet) => bullet.x < this.canvasW)

        this.bullets.forEach((bullet) => {
        
            bullet.draw()
            bullet.move()
        })
    }

    // cambia el fotogramas del skin cada 6 frame
    animateImg(frameCounter) {
        if(frameCounter % 6 === 0) {
            this.img.frameIndex++

            if (this.img.frameIndex > this.img.frames - 1) 
                this.img.frameIndex = 0
        }
    }

    move() {
        let gravity = 0.4

        // Detecta el fin de salto
        if(this.y >= this.y0) {
            this.y = this.y0
            this.vy = 1
        } else {
            this.vy += gravity
            this.y += this.vy
        }
    }
}
