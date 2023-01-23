class Pacman extends GameObject {
    pos = new Vector2(40, 40);
    velocity = new Vector2(0, 0);

    size = 10;
    speed = 1.5;

    onUpdate() {
        this.pos.add(this.velocity);
    }

    onDraw(ctx, frame) {
        let rotationOffset = 0;
        let mouthOffset = Math.PI * 2 * ((Math.cos(frame / 4) + 1) / 16);

        ctx.fillStyle = 'rgb(255, 150, 0)';

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, mouthOffset + rotationOffset, Math.PI + mouthOffset + rotationOffset);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, Math.PI - mouthOffset + rotationOffset, Math.PI * 2 - mouthOffset + rotationOffset);
        ctx.fill();
    }

    onKeyDown(key) {
        let hoz  = Number(Game.keyDown['d'] === true) - Number(Game.keyDown['a'] === true);
        let vert = Number(Game.keyDown['s'] === true) - Number(Game.keyDown['w'] === true);

        if (hoz !== 0 || vert !== 0) {
            let move = new Vector2(hoz, vert)
                .normalize()
                .multiply(this.speed);

            this.velocity = move;
        }
    }
}