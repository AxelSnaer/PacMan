class MainLevel extends Level {
    onLoad() {
        // Request fullscreen
        if (!document.fullscreenElement) {
            document.body.requestFullscreen();
        }

        // Spawn the dots around the map
        for (let x = 0; x <= 10; x++)
            for (let y = 0; y <= 10; y++)
                this.newGameObject(Dot, -125 + x * 25, -125 + y * 25);

        // Spawn a power pellet in each corner
        this.newGameObject(PowerPellet, -100, -100);
        this.newGameObject(PowerPellet, -100,  100);
        this.newGameObject(PowerPellet,  100, -100);
        this.newGameObject(PowerPellet,  100,  100);

        // Create the outer walls
        this.newGameObject(Obstacle, -150,  0,   20,  275);
        this.newGameObject(Obstacle,  150,  0,   20,  275);
        this.newGameObject(Obstacle,  0,   -150, 275, 20);
        this.newGameObject(Obstacle,  0,    150, 275, 20);

        // Create the inner walls
        this.newGameObject(Obstacle, -75, 0, 20, 175);
        this.newGameObject(Obstacle,  75, 0, 20, 175);
        this.newGameObject(Obstacle,  0, -100, 20, 75);
        this.newGameObject(Obstacle,  0, 100, 20, 75);

        // Place the cherry
        this.newGameObject(Cherry, 100, 100);

        // Spawn each of the four ghosts
        this.newGameObject(Ghost, 100, 10, 'blinky');
        this.newGameObject(Ghost, -100, -10, 'pinky');
        this.newGameObject(Ghost, -50, 100, 'inky');
        this.newGameObject(Ghost, 50, -100, 'clyde');

        // Spawn the player
        this.newGameObject(Pacman, 0, 0);
    }

    onDrawUI(ctx) {
        // Show the score in the top right corner

        // Select font and color
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';

        // Write the text
        let scoreText = `${Game.state.score}`;
        let scoreSize = ctx.measureText(scoreText)
        ctx.fillText(scoreText, Game.width - scoreSize.width - 15, 25);

        // Show the health in the top left corner as hearts
        
        // Create the heart graphic
        let p = new Path2D('M927.4 273.5v-95.4h-87.9V82.8h-201v95.3h-87.9v95.4h-78.5v-95.4h-88V82.8H183.2v95.3H95.3v95.4H16.7v190.6h78.6v95.4h75.3v95.3H246v95.3h87.9v95.4h100.5v95.3h153.9v-95.3h100.4v-95.4h88v-95.3H852.1v-95.3h75.3v-95.4h78.5V273.5z');
        ctx.fillStyle = '#E02D2D';
        ctx.translate(10, 10);
        ctx.scale(0.02, 0.02);

        // Place them in a row in the top left corner
        for (let i = 0; i < Game.state.lives; i++) {
            ctx.fill(p);
            ctx.translate(30 / 0.02, 0);
        }
    }

    onTap(pos) {
        // Toggle fullscreen when the screen is tapped
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }
    }
}