class PowerPellet extends GameObject {
    onInit() {
        this.size = 10;
        this.addCollider(this.size * 2, this.size * 2);
    }

    onDraw(ctx) {
        let cornerSize = 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-this.size / 2, -this.size / 2 + cornerSize, this.size, this.size - cornerSize * 2);
        ctx.fillRect(-this.size / 2 + cornerSize, -this.size / 2, this.size - cornerSize * 2, this.size);
    }

    onCollision(other) {
        if (!other.isOfType(Pacman))
            return;

        Game.state.powerUp.startTimer();
        Game.state.score += 50;
        Game.level.destroyGameObject(this);
    }
}