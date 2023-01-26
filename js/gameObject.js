class GameObject {
    constructor(x, y, name) {
        this.pos = new Vector2(x || 0, y || 0);
        this.classId = new.target.name;

        this.collider = null;
        this.drawCollider = false;

        this.onInit();
    }

    isOfType(type) {
        return type.name == this.classId;
    }

    addCollider(width, height, offset) {
        this.collider = {
            size: new Vector2(width || 10, height || 10),
            offset: offset || new Vector2(0, 0),
        };
    }

    checkCollision(other) {
        if (!this.collider || !other.collider)
            return false;
        
        let s1 = this.collider.size;
        let s2 = other.collider.size;
        let p1 = this.pos.duplicate().add(this.collider.offset).sub(s1.duplicate().divide(2));
        let p2 = other.pos.duplicate().add(other.collider.offset).sub(s2.duplicate().divide(2));

        return p1.x > p2.x && p1.x < p2.x + s2.x && p1.y > p2.y && p1.y < p2.y + s2.y &&
               p1.x + s1.x > p2.x && p1.x + s1.x < p2.x + s2.x && p1.y + s1.y > p2.y && p1.y + s1.y < p2.y + s2.y;
    }

    drawCollision(ctx) {
        if (!this.collider || !this.drawCollider)
            return;

        ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
        ctx.fillRect(
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
    
    // Input
    onKeyDown() {}
    onKeyUp() {}
    onGesture() {}
}