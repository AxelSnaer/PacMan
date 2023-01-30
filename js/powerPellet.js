class PowerPellet extends GameObject {
    onInit() {
        this.size = 10;
        this.addCollider(this.size * 2, this.size * 2);
    }

    onDraw(ctx) {
        let cornerSize = 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.pos.x - this.size / 2, this.pos.y - this.size / 2 + cornerSize, this.size, this.size - cornerSize * 2);
        ctx.fillRect(this.pos.x - this.size / 2 + cornerSize, this.pos.y - this.size / 2, this.size - cornerSize * 2, this.size);
        
    }
}