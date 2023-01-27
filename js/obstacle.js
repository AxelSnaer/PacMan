class Obstacle extends GameObject {
    onInit() {
        this.width = 20;
        this.height = 80;
    }

    onDraw(ctx) {
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#00aaff';
        ctx.lineWidth = 2;
        ctx.fillRect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
        ctx.strokeRect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
    }
}