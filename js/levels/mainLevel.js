class MainLevel extends Level {
    onLoad() {
        for (let x = 0; x < 10; x++)
            for (let y = 0; y < 10; y++)
                this.newGameObject(Dot, 100 + x * 25, 100 + y * 25);

        this.newGameObject(PowerPellet, 75, 75);
        this.newGameObject(PowerPellet, 350, 75);
        this.newGameObject(PowerPellet, 350, 350);
        this.newGameObject(PowerPellet, 75, 350);

        this.newGameObject(Obstacle, 200, 200);
        this.newGameObject(Obstacle, 200, 200);
        this.newGameObject(Obstacle, 200, 200);
        this.newGameObject(Obstacle, 200, 200);

        this.newGameObject(Cherry, 350, 200);

        this.newGameObject(Ghost, 100, 100);
        this.newGameObject(Pacman, 40, 40);
    }

    onDrawUI(ctx) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Score: ${Game.state.score}`, 320, 25);

        // TODO: Health icons
        let p = new Path2D('M927.4 273.5v-95.4h-87.9V82.8h-201v95.3h-87.9v95.4h-78.5v-95.4h-88V82.8H183.2v95.3H95.3v95.4H16.7v190.6h78.6v95.4h75.3v95.3H246v95.3h87.9v95.4h100.5v95.3h153.9v-95.3h100.4v-95.4h88v-95.3H852.1v-95.3h75.3v-95.4h78.5V273.5z');
        ctx.fillStyle = '#E02D2D';
        ctx.translate(10, 10);
        ctx.scale(0.02, 0.02);

        for (let i = 0; i < Game.state.lives; i++) {
            ctx.fill(p);
            ctx.translate(30 / 0.02, 0);
        }
    }
}