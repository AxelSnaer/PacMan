class Pacman extends GameObject {
    velocity = new Vector2(0, 0);

    size  = 10;
    speed = 1.5;

    onInit() {
        this.name = 'pacman';
        this.addCollider(this.size, this.size);
    }

    onUpdate() {
        this.pos.add(this.velocity);

        Game.objects.forEach(obj => {
            if (obj.name !== 'dot')
                return;

            if (this.pos.dist(obj.pos) < obj.size * 2)
                Game.destroyGameObject(obj);
        });
    }

    onCollision(other) {
        console.log('Collided with: ' + other.name);
        if (other.name === 'dot') {
            Game.destroyGameObject(other);
        }
    }

    onDraw(ctx, frame) {
        let heading = this.velocity.normalized();
        let rotationOffset = Math.atan2(heading.y, heading.x);
        let mouthOffset = Math.PI * 2 * ((Math.cos(frame / 4) + 1) / 16);

        let left = rotationOffset < -Math.PI * (1/2) || rotationOffset >= Math.PI * (1/2);
        let eyeRotationOffset = left ? Math.PI * (1/3) : -Math.PI * (1/3);
        let eyeDistanceOffset = this.size * (2/3);
        let eyePositionOffset = new Vector2(Math.cos(rotationOffset + eyeRotationOffset), Math.sin(rotationOffset + eyeRotationOffset)).multiply(eyeDistanceOffset);

        ctx.fillStyle = left ? 'rgb(255, 150, 0)' : 'rgb(150, 0, 255)';

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, mouthOffset + rotationOffset, Math.PI + mouthOffset + rotationOffset);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, Math.PI - mouthOffset + rotationOffset, Math.PI * 2 - mouthOffset + rotationOffset);
        ctx.fill();

        ctx.fillStyle = '#000000';

        ctx.beginPath();
        ctx.arc(this.pos.x + eyePositionOffset.x, this.pos.y + eyePositionOffset.y, this.size / 6, 0, 2 * Math.PI);
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