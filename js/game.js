const Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    fps: 60, 
    randomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
    
    keys: {
        TOP_KEY: 87,
        SPACE: 32
    },

    init: function() {
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.start()

        this.audio = new Audio('musica/ace.mp3')
        this.audio.play()
    },

    start: function() {
        this.reset()
        this.scoreBoard.init(this.ctx)

        // Bucle de renderizado
        this.interval = setInterval(() => {
            this.clear()
            this.score += 0.01
            // Mecanismo para generar acciones cada X frames
            this.frameCounter++;

            // Generar obstaculo cada 50 frames
            if(this.frameCounter % this.randomInt(50, 200) === 0)
                this.generateObstacle()

            if(this.frameCounter % 80 === 0)
                this.generateEnemy()
    
              if(this.isCollision()) 
                  this.gameOver()

              if(this.isCollision2())
                 this.gameOver()

             this.isImpact()
        
            


            this.drawAll()
            this.moveAll()

            this.clearObstacles()
        }, 1000 / this.fps)
    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx) 
        this.player = new Player(this.canvas.width, this.canvas.height, this.keys, this.ctx)
        this.scoreBoard = ScoreBoard
        this.frameCounter = 0
        
        this.score = 0
        this.obstacles = []
        this.enemies = []
        
    },

    clear: function () {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    },

    moveAll: function() {
        this.background.move()
        this.player.move()

        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })

        this.enemies.forEach(enemy => {
            enemy.move()
        })
    },

    drawAll: function () {
        this.background.draw()
        this.player.draw(this.frameCounter)

        this.obstacles.forEach(obstacle => {
            obstacle.draw()
        })

        this.enemies.forEach(enemy => {
            enemy.draw(this.frameCounter)
        })

        this.drawScore(this.score)
    },

    generateObstacle: function() {
        this.obstacles.push(new Obstacle(this.canvas.width, this.player.h ,this.player.y0, this.ctx))
    },

    generateEnemy: function() {
        this.enemies.push(new Enemy(this.canvas.width, this.player.h ,this.player.y0, this.ctx))
    },

    clearObstacles: function () {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.w >= 0)
    },

    isCollision() {
        return this.obstacles.some((obstacle) => {
            return (
                this.player.x + this.player.w -50 >=  obstacle.x &&
                this.player.x +50 <= obstacle.x + obstacle.w &&
                this.player.y + this.player.h - 50 >= obstacle.y &&
                this.player.y <= obstacle.y + obstacle.h
            )
        })
    },

    isCollision2() {
        return this.enemies.some((enemies) => {
            return (
                this.player.x + this.player.w -70 >=  enemies.x &&
                this.player.x +70 <= enemies.x + enemies.w &&
                this.player.y + this.player.h -70 >= enemies.y &&
                this.player.y <= enemies.y + enemies.h
            )
        })
    },

    isImpact() {
        return this.enemies.some((enemy) => {
            return  this.player.bullets.some((bullet) => {     
                const result = (
                bullet.x + bullet.w -10 >=  enemy.x &&
                bullet.x <= enemy.x + enemy.w &&
                bullet.y + bullet.h -10 >= enemy.y &&
                bullet.y <= enemy.y + enemy.h)

                if (result) {
                    this.player.bullets = this.player.bullets.filter((b) => b != bullet )
                    this.enemies = this.enemies.filter((e) => e != enemy)

                }

                return result
        })
 
        })

    },


    stop() {
        clearInterval(this.interval)
    },
    
    gameOver() {
        this.stop()

        if(confirm("JAJA Pringao, COME PINGAS"))
            this.start()
    },

    drawScore(score) {
        ScoreBoard.update(score)
    }
}

// 2. (DIFICULTAD FACIL) CREAR COLISIÓN PERSONAJE-DINOSAURIO

// 3. (DIFICULTAD MEDIA) (DESCOMENTAR LAs COLISIONE). ENTENDER EL CODIGO DE LA COLISION PARA AJUSTAR AMBAS COLISIONES. PERSONAJE-OBSTACULO PERSONAJE-DINOSAURIO. (CLASSROOM HAY VIDEOS de como lo hice) 

//---------------

// 4. (DIFICULTAD DIFICIL) CREAR LA COLISIÓN DE CUALQUIER BALA CON CUALQUIER DINOSAURIO
// 5. (DIFICULTAD DIFICIL) QUE DESAPAREZCA EL DINOSAURIO CUANDO LO GOLPEE LA BALA 

// 6. (DIFICULTAD IMPOSIBLE) Haz que antes de colisionar el dinosaurio con el personaje lance la animación de ataque. 




