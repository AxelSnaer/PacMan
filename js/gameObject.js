class GameObject {
    constructor(x, y) {
        this.pos = new Vector2(x, y);
        this.classId = new.target.name;

        this.collider = null;
        this.drawCollider = false;

        this.onInit();
    }

    isOfType(type) {
        return type.name == this.classId;
    }

    addCollider(width, height) {
        this.collider = {
            size: new Vector2(width, height),
            offset: new Vector2(0, 0),
        };
    }

    checkCollision(other) {
        if (!this.collider || !other.collider)
            return false;
        
        let s1 = this.collider.size;
        let s2 = other.collider.size;
        let p1 = this.pos.duplicate().add(this.collider.offset).sub(s1.duplicate().divide(2));
        let p2 = other.pos.duplicate().add(other.collider.offset).sub(s2.duplicate().divide(2));

        return p1.x < p2.x + s2.x &&
            p1.x + s1.x > p2.x &&
            p1.y < p2.y + s2.y &&
            s1.x + p1.y > p2.y;
    }

    drawCollision(ctx) {
        if (!this.collider || !this.drawCollider)
            return;

        ctx.strokeStyle = 'rgba(255, 100, 100, 1)';
        ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
        ctx.fillRect(
            this.pos.x + this.collider.offset.x - this.collider.size.x / 2,
            this.pos.y + this.collider.offset.y - this.collider.size.y / 2,
            this.collider.size.x,
            this.collider.size.y
        );
        ctx.strokeRect(
            this.pos.x + this.collider.offset.x - this.collider.size.x / 2,
            this.pos.y + this.collider.offset.y - this.collider.size.y / 2,
            this.collider.size.x,
            this.collider.size.y
        );
    }

    // Initialization
    onInit() {}

    // Update
    onUpdate() {}
    onLateUpdate() {}
    onCollision(collider) {}

    // Graphics
    onDraw(ctx, frame) {}
    onResize(newWidth, newHeight) {}
    
    // Input
    onKeyDown() {}
    onKeyUp() {}
    onGesture() {}
}