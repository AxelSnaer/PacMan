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

        this.newGameObject(Ghost, 100, 100);
        this.newGameObject(Pacman, 40, 40);
    }

    onDrawUI(ctx) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Score: ${Game.state.score}`, 10, 25);
        ctx.fillText(`Lives: ${Game.state.lives}`, 330, 25);

        // TODO: Health icons
        // let p = new Path2D('M10 10 h 80 v 80 h -80 Z');
        // ctx.translate(0, 0);
        // ctx.fill(p);
    }
}