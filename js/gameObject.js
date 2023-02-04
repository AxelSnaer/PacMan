// Base class used for creating objects that can be updated and rendered in-game
class GameObject {
    constructor(x, y, ...args) {
        // Initialize members
        this.pos = new Vector2(x, y);
        this.collider = null;

        // Keep the name of the class for use in the 'ifOfType' function
        this.classId = new.target.name;

        // Call the onInit event for the subclass
        this.onInit(...args);
    }

    // Function to check if the object is of the specified type
    isOfType(type) {
        return type.name == this.classId;
    }

    // Add a simple box collider to the struct
    addCollider(width, height) {
        this.collider = {
            size: new Vector2(width, height),
            offset: new Vector2(0, 0),
        };
    }

    // Check if the object is colliding with another object
    checkCollision(other) {
        // If either object has no collider, then there cannot be any collision
        if (!this.collider || !other.collider)
            return false;
        
        // Get the size and position of both colliders
        let s1 = this.collider.size;
        let s2 = other.collider.size;
        let p1 = this.pos.duplicate().add(this.collider.offset).sub(s1.duplicate().divide(2));
        let p2 = other.pos.duplicate().add(other.collider.offset).sub(s2.duplicate().divide(2));

        // Return whether or not there is any overlap
        return p1.x < p2.x + s2.x &&
            p1.x + s1.x > p2.x &&
            p1.y < p2.y + s2.y &&
            s1.x + p1.y > p2.y;
    }

    // Draw the collider
    _drawCollision(ctx) {
        // If there is no collider, then return
        if (!this.collider)
            return;

        // Draw the collider with a solid outline and a semi-transparent fill color
        ctx.strokeStyle = 'rgba(255, 100, 100, 1)';
        ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
        ctx.fillRect(
            -this.collider.size.x / 2,
            -this.collider.size.y / 2,
            this.collider.size.x,
            this.collider.size.y
        );
        ctx.strokeRect(
            -this.collider.size.x / 2,
            -this.collider.size.y / 2,
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
    onKeyDown(key) {}
    onKeyUp(key) {}
    onGesture(gesture) {}
    onTap(pos) {}
}