class Pacman extends GameObject {
    onInit() {
        this.velocity = new Vector2(0, 0);
        this.size  = 10;
        this.speed = 100;
        this.powerUpDuration = 5;
        this.invincibilityFrames = new Stopwatch();

        this.addCollider(this.size, this.size);
        Game.state.lives = 3;
        Game.state.score = 0;
        Game.state.powerUp = new Stopwatch();
    }

    onUpdate(delta) {
        this.pos.add(this.velocity.duplicate().multiply(delta));

        if (Game.state.powerUp.elapsed() > this.powerUpDuration) {
            Game.state.powerUp.stopTimer();
        }

        if (this.pos.x - this.size < 0 || this.pos.x + this.size > Game.width)
            this.velocity.set(-this.velocity.x, this.velocity.y);
        if (this.pos.y - this.size < 0 || this.pos.y + this.size > Game.height)
            this.velocity.set(this.velocity.x, -this.velocity.y);
    }

    onCollision(other) {
        if (!other.isOfType(Ghost))
            return;

        if (Game.state.powerUp.isActive()) {
            Game.state.score += 100;
            Game.level.destroyGameObject(other);
        } else {
            Game.state.lives--;
            window.navigator.vibrate(200);

            if (Game.state.lives === 0) {
                Game.loadLevel(GameOverLevel);
            }
        }
    }

    onDraw(ctx) {
        let heading = this.velocity.normalized();
        let rotationOffset = Math.atan2(heading.y, heading.x);
        let mouthOffset = Math.PI * 2 * ((Math.cos(Game.time * 16) + 1) / 16);

        let left = rotationOffset < -Math.PI * (1/2) || rotationOffset >= Math.PI * (1/2);
        let eyeRotationOffset = left ? Math.PI * (1/3) : -Math.PI * (1/3);
        let eyeDistanceOffset = this.size * (2/3);
        let eyePositionOffset = new Vector2(Math.cos(rotationOffset + eyeRotationOffset), Math.sin(rotationOffset + eyeRotationOffset)).multiply(eyeDistanceOffset);

        ctx.fillStyle = 'rgb(255, 255, 0)';

        ctx.beginPath();
        ctx.arc(0, 0, this.size, mouthOffset + rotationOffset, Math.PI + mouthOffset + rotationOffset);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, this.size, Math.PI - mouthOffset + rotationOffset, Math.PI * 2 - mouthOffset + rotationOffset);
        ctx.fill();

        ctx.fillStyle = '#000000';

        ctx.beginPath();
        ctx.arc(eyePositionOffset.x, eyePositionOffset.y, this.size / 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    onKeyDown(key) {
        if (Game.paused)
            return;

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