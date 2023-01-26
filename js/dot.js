class Dot extends GameObject {
    size = 5;

    onInit() {
        this.name = 'dot';
        this.addCollider(this.size, this.size);
    }

    onDraw(ctx, frame) {
        ctx.fillStyle = 'rgb(255, 255, 0)';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}