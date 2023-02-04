class Rigidbody extends GameObject {
    onInit() {
        this.velocity = new Vector2(0, 0);
    }

    onUpdate(delta) {
        // Throw a warning if there is no collider, as that would make the rigidbody useless
        if (!this.collider) {
            console.warn(`Missing collider for rigidbody of type: ${this.classId}`);
            return;
        }

        // Get all obstacles and the amount the rigidbody is gonna move
        let obstacles = Game.level.findGameObjectsOfType(Obstacle);
        let moveAmount = this.velocity.duplicate().multiply(delta);

        // For every obstacle
        obstacles.forEach(obstacle => {
            //  Move the collider in the x axis
            this.collider.offset.x += moveAmount.x;

            // If there was a collision, bounce in the x axis
            if (this.checkCollision(obstacle)) {
                this.velocity.x = -this.velocity.x;
            }

            // Move the collider in the y axis and move back the collider in the x axis
            this.collider.offset.x -= moveAmount.x;
            this.collider.offset.y += moveAmount.y;
            
            // If there was a collision, bounce in the y axis
            if (this.checkCollision(obstacle)) {
                this.velocity.y = -this.velocity.y;
            }

            // Move back the collider in the y axis
            this.collider.offset.y -= moveAmount.y;
        });
        
        // Move the rigidbody by the new velocity
        this.pos.add(this.velocity.duplicate().multiply(delta));

        // If the rigidbody reaches the end of the level, then bounce back in
        if (this.pos.x - this.size / 2 < -Game.width / 2 || this.pos.x + this.size / 2 > Game.width / 2)
            this.velocity.set(-this.velocity.x, this.velocity.y);
        if (this.pos.y - this.size < -Game.height / 2|| this.pos.y + this.size > Game.height / 2)
            this.velocity.set(this.velocity.x, -this.velocity.y);
    }
}