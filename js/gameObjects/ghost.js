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

        // Update the rigidbody
        super.onUpdate(delta);
    }

    onDraw(ctx) {
        // Draw the ghost
        this.drawMainShape(ctx);
        this.drawEyes(ctx);
    }

    drawMainShape(ctx) {
        // Get the ghost's color and set it as the fill color
        let color = this.getColor();
        ctx.fillStyle = color;

        // If the player has a powerup, then switch between two colors to make the ghost blink
        if (Game.state.powerUp.isActive()) {
            ctx.fillStyle = Math.floor(Game.state.powerUp.elapsed() * 8) % 2 === 0
                ? '#ffffff' : '#0000ff';
        }

        // Draw the main shape
        ctx.beginPath();
        ctx.arc(0, -this.size / 2,  this.size / 2, 0, Math.PI, true);
        ctx.moveTo(-this.size / 2, -this.size / 2);
        ctx.lineTo( this.size / 2, -this.size / 2);
        ctx.lineTo( this.size / 2,  this.size / 2);

        // Draw the squiggles
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
        // Calculate an offset for the eyes so they look in the direction the ghost moves in
        let eyeOffset = this.velocity.normalized().multiply(this.size / 8);
        
        // Draw the eyes
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
        // Returns the color the ghost should be based on it's type
        switch (this.type) {
            case 'blinky': return '#ff0000';
            case 'pinky':  return '#ff0099';
            case 'inky':   return '#00ccff';
            case 'clyde':  return '#ffaa00';
        }
    }
}