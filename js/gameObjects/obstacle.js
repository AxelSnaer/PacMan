class Obstacle extends GameObject {
    onInit(width, height) {
        this.width = width ?? 20;
        this.height = height ?? 20;

        this.addCollider(this.width, this.height);
    }

    onCollision(other) {
        if (other.isOfType(Dot)) {
            Game.level.destroyGameObject(other);
        }
    }

    onDraw(ctx) {
        let cornerSize = 3;
        
        ctx.fillStyle = '#0033ff';
        
        ctx.fillRect(-this.width / 2, cornerSize - this.height / 2, this.width, this.height - cornerSize * 2);
        ctx.fillRect(cornerSize - this.width / 2, -this.height / 2, this.width - cornerSize * 2, this.height);

        ctx.fillStyle = '#000000';

        ctx.fillRect(cornerSize - this.width / 2, cornerSize - this.height / 2, this.width - cornerSize * 2, this.height - cornerSize * 2);
    }
}