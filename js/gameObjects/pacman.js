class Pacman extends Rigidbody {
    onInit() {
        super.onInit();

        this.size  = 10;
        this.speed = 100;
        this.powerUpDuration = 5;
        this.invincibilityFrameDuration = 1;
        this.invincibilityFrames = new Stopwatch();
        this.deathTimer = new Stopwatch();

        this.addCollider(this.size, this.size);
        Game.state.lives = 3;
        Game.state.score = 0;
        Game.state.powerUp = new Stopwatch();
    }

    onUpdate(delta) {
        // If the player is not dead, then update the rigidbody
        if (!this.deathTimer.isActive())
            super.onUpdate(delta);

        // If the player is dead
        if (this.deathTimer.isActive()) {
            // Then load the game over level once enough time has passed
            if (this.deathTimer.elapsed() > 1) {
                Game.loadLevel(GameOverLevel);
            }
            
            return;
        }

        // If the power up time has run out, then stop the timer
        if (Game.state.powerUp.elapsed() > this.powerUpDuration) {
            Game.state.powerUp.stopTimer();
        }

        // If the invincibility time has run out, then stop the timer
        if (this.invincibilityFrames.elapsed() > this.invincibilityFrameDuration) {
            this.invincibilityFrames.stopTimer();
        }
    }

    onLateUpdate() {
        // If the player is dead, then don't do anything
        if (this.deathTimer.isActive())
            return;

        // Get all the dots and power ups in the scene
        let dots = Game.level.findGameObjectsOfType(Dot);
        let pellets = Game.level.findGameObjectsOfType(PowerPellet);

        // If there are none left, then load the win level
        if (dots.length + pellets.length === 0) {
            Game.loadLevel(WinLevel);
        }
    }

    onCollision(other) {
        if (!other.isOfType(Ghost))
            return;

        // If the player touches a ghost
        if (Game.state.powerUp.isActive()) {
            // and the power up is active, then destroy the ghost and add score
            Game.state.score += 100;
            Game.level.destroyGameObject(other);
        } else if (!this.invincibilityFrames.isActive()) {
            // otherwise, if the player is not invincible, then decrease the lives, vibrate the phone and make him invincible
            Game.state.lives--;
            window.navigator.vibrate(200);
            this.invincibilityFrames.startTimer();

            // If the player has run out of lives, then kill the player
            if (Game.state.lives === 0) {
                this.deathTimer.startTimer();
            }
        }
    }

    onDraw(ctx) {
        // If the player is invincible, then make him blink by not rendering him half of the time
        if (this.invincibilityFrames.isActive() && Math.floor(this.invincibilityFrames.elapsed() * 8) % 2 === 0)
            return;

        // Draw the player

        let heading = this.velocity.normalized();
        let rotationOffset = Math.atan2(heading.y, heading.x);
        let mouthOffset = Math.PI * 2 * ((Math.cos(Game.time * 16) + 1) / 16);

        let left = rotationOffset < -Math.PI * (1/2) || rotationOffset >= Math.PI * (1/2);
        let eyeRotationOffset = left ? Math.PI * (1/3) : -Math.PI * (1/3);
        let eyeDistanceOffset = this.size * (2/3);
        let eyePositionOffset = new Vector2(Math.cos(rotationOffset + eyeRotationOffset), Math.sin(rotationOffset + eyeRotationOffset)).multiply(eyeDistanceOffset);

        ctx.fillStyle = '#ffff00';

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
        // If the player is dead, don't do anything
        if (this.deathTimer.isActive())
            return;

        // Calculate the direction that the player should go in
        let hoz  = Number(Game.keyDown['d'] === true) - Number(Game.keyDown['a'] === true);
        let vert = Number(Game.keyDown['s'] === true) - Number(Game.keyDown['w'] === true);

        // If the player pressed a movement button
        if (hoz !== 0 || vert !== 0) {
            // Then set the velocity to the new move direction
            let move = new Vector2(hoz, vert)
                .normalize()
                .multiply(this.speed);

            this.velocity = move;
        }
    }

    onGesture(gesture) {
        // If the player is dead, then don't do anything
        if (this.deathTimer.isActive())
            return;

        // Set the velocity of the player to the direction of the swipe
        this.velocity = gesture.end.duplicate()
            .sub(gesture.start)
            .normalize()
            .multiply(this.speed);
    }
}