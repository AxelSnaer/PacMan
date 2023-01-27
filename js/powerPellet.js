class PowerPellet extends GameObject {
    onInit() {
        this.size = 10;
        this.addCollider(this.size * 2, this.size * 2);
    }

    onDraw(ctx) {
        ctx.fillStyle = 'rgb(255, 255, 0)';

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}