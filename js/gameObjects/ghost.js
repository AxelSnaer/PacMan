class Ghost extends GameObject {
    onInit() {
        this.color = '#00ccff';
        this.size = 20;
        this.speed = 40;
        this.velocity = new Vector2(1, 1);
        this.move = true;
        this.addCollider(this.size, this.size * 2);
    }

    onUpdate(delta) {
        if (!this.move)
            return;

        this.pos.add(this.velocity.normalized().multiply(delta).multiply(this.speed));
        
        if (this.pos.x - this.size / 2 < -Game.width / 2 || this.pos.x + this.size / 2 > Game.width / 2)
            this.velocity.set(-this.velocity.x, this.velocity.y);
        if (this.pos.y - this.size < -Game.height || this.pos.y + this.size > Game.height / 2)
            this.velocity.set(this.velocity.x, -this.velocity.y);
    }

    onDraw(ctx) {
        ctx.fillStyle = this.color;

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
}