class GameObject {
    constructor(x, y, name) {
        this.pos = new Vector2(x || 0, y || 0);
        this.name = name || 'object';
    }

    // Update
    onUpdate() {}
    onLateUpdate() {}

    // Graphics
    onDraw(ctx, frame) {}
    
    // Input
    onKeyDown() {}
    onKeyUp() {}
    onGesture() {}
}