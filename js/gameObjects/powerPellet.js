class PowerPellet extends GameObject {
    onInit() {
        this.size = 10;
        this.respawnTimer = new Stopwatch();
        this.respawnTime = 10;
        this.addCollider(this.size * 2, this.size * 2);
    }

    onUpdate(delta) {
        if (this.respawnTimer.elapsed() > this.respawnTime) {
            this.respawnTimer.stopTimer();
        }
    }

    onDraw(ctx) {
        // If the dot has been used recently, don't draw it
        if (this.respawnTimer.isActive())
            return;

        let cornerSize = 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-this.size / 2, -this.size / 2 + cornerSize, this.size, this.size - cornerSize * 2);
        ctx.fillRect(-this.size / 2 + cornerSize, -this.size / 2, this.size - cornerSize * 2, this.size);
    }

    onCollision(other) {
        // If the power pellet is on top of a dot, then destroy the dot
        if (other.isOfType(Dot))
            Game.level.destroyGameObject(other);

        // If the dot has been used recently, don't do anything
        if (this.respawnTimer.isActive())
            return;

        if (!other.isOfType(Pacman))
            return;
            
        // If the player touches the power pellet, then start the power up timer, increase the score and destroy the pellet
        Game.state.powerUp.startTimer();
        Game.state.score += 50;

        this.respawnTimer.startTimer();
    }
}