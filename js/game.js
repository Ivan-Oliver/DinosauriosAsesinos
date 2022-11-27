const Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    fps: 60, 
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
            if(this.frameCounter % 50 === 0)
                this.generateObstacle()

            if(this.frameCounter % 80 === 0)
                this.generateEnemy()
    
            // if(this.isCollision()) 
            //     this.gameOver()
            
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
                this.player.x + this.player.w >= obstacle.x &&
                this.player.x <= obstacle.x + obstacle.w &&
                this.player.y + this.player.h - 20 >= obstacle.y &&
                this.player.y <= obstacle.y + obstacle.h
            )
        })
    },

    stop() {
        clearInterval(this.interval)
    },
    
    gameOver() {
        this.stop()

        if(confirm("Te has chocado amigo, (quiéres jugar de nuevo?"))
            this.start()
    },

    drawScore(score) {
        ScoreBoard.update(score)
    }
}

// 1. (DIFICULTAD FACIL) Buscar imagen para poner en lugar de los rectangulos de los obtaculos. La imagen se pinta igual que hemos hecho con las balas. 
// 2. (DIFICULTAD FACIL) CREAR COLISIÓN PERSONAJE-DINOSAURIO

// 3. (DIFICULTAD MEDIA) (DESCOMENTAR LAs COLISIONE). ENTENDER EL CODIGO DE LA COLISION PARA AJUSTAR AMBAS COLISIONES. PERSONAJE-OBSTACULO PERSONAJE-DINOSAURIO. (CLASSROOM HAY VIDEOS de como lo hice) 

//---------------

// 4. (DIFICULTAD DIFICIL) CREAR LA COLISIÓN DE CUALQUIER BALA CON CUALQUIER DINOSAURIO
// 5. (DIFICULTAD DIFICIL) QUE DESAPAREZCA EL DINOSAURIO CUANDO LO GOLPEE LA BALA 

// 6. (DIFICULTAD IMPOSIBLE) Haz que antes de colisionar el dinosaurio con el personaje lance la animación de ataque. 




