class Ghost extends Rigidbody {
    onInit(type) {
        super.onInit();

        this.type = type;
        this.size = 20;
        this.move = true;
        this.addCollider(this.size, this.size * 2);

        this.velocity.set(Math.random(), Math.random()).normalize().multiply(70);
    }

    onUpdate(delta) {
        if (!this.move)
            return;

        super.onUpdate(delta);
    }

    onDraw(ctx) {
        this.drawMainShape(ctx);
        this.drawEyes(ctx);
    }

    drawMainShape(ctx) {
        let color = this.getColor();
        ctx.fillStyle = color;

        if (Game.state.powerUp.isActive()) {
            ctx.fillStyle = Math.floor(Game.state.powerUp.elapsed() * 8) % 2 === 0
                ? '#ffffff' : '#0000ff';
        }

        ctx.beginPath();
        ctx.arc(0, -this.size / 2,  this.size / 2, 0, Math.PI, true);
        ctx.moveTo(-this.size / 2, -this.size / 2);
        ctx.lineTo( this.size / 2, -this.size / 2);
        ctx.lineTo( this.size / 2,  this.size / 2);

        const squiggleCount = 6;
        const squiggleDepth = 4;

        for (let i = 0; i < squiggleCount; i++) {
            ctx.lineTo(this.size / 2 - (i * this.size) / squiggleCount, this.size / 2 - (i % 2) * squiggleDepth);
        }

        ctx.lineTo(-this.size / 2, this.size / 2);
        ctx.closePath();
        ctx.fill();
    }

    drawEyes(ctx) {
        let eyeOffset = this.velocity.normalized().multiply(this.size / 8);
        
        ctx.fillStyle = '#ffffff';
        
        ctx.beginPath();
        ctx.arc(eyeOffset.x - this.size / 4, eyeOffset.y - this.size / 2, this.size / 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(eyeOffset.x + this.size / 4, eyeOffset.y - this.size / 2, this.size / 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#0000aa';

        ctx.beginPath();
        ctx.arc(eyeOffset.x * 1.2 - this.size / 4, eyeOffset.y * 1.2 - this.size / 2, this.size / 10, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(eyeOffset.x * 1.2 + this.size / 4, eyeOffset.y * 1.2 - this.size / 2, this.size / 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    getColor() {
        switch (this.type) {
            case 'blinky': return '#ff0000';
            case 'pinky':  return '#ff0099';
            case 'inky':   return '#00ccff';
            case 'clyde':  return '#ffaa00';
        }
    }
}