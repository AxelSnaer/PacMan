class Dot extends GameObject {
    onInit() {
        this.size = 6;
        this.addCollider(this.size * 2, this.size * 2);
    }

    onDraw(ctx, frame) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);
    }
}