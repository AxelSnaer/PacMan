class Obstacle extends GameObject {
    onInit() {
        this.width = 20;
        this.height = 80;
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