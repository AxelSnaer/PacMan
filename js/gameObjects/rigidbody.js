class Rigidbody extends GameObject {
    onInit() {
        this.velocity = new Vector2(0, 0);
    }

    onUpdate(delta) {
        if (!this.collider) {
            console.warn(`Missing collider for rigidbody of type: ${this.classId}`);
            return;
        }

        let obstacles = Game.level.findGameObjectsOfType(Obstacle);
        let moveAmount = this.velocity.duplicate().multiply(delta);

        obstacles.forEach(obstacle => {
            this.collider.offset.x += moveAmount.x;
            if (this.checkCollision(obstacle)) {
                this.velocity.x = -this.velocity.x;
            }

            this.collider.offset.x -= moveAmount.x;
            this.collider.offset.y += moveAmount.y;
            
            if (this.checkCollision(obstacle)) {
                this.velocity.y = -this.velocity.y;
            }

            this.collider.offset.y -= moveAmount.y;
        });
        
        this.pos.add(this.velocity.duplicate().multiply(delta));

        if (this.pos.x - this.size / 2 < -Game.width / 2 || this.pos.x + this.size / 2 > Game.width / 2)
            this.velocity.set(-this.velocity.x, this.velocity.y);
        if (this.pos.y - this.size < -Game.height / 2|| this.pos.y + this.size > Game.height / 2)
            this.velocity.set(this.velocity.x, -this.velocity.y);
    }
}