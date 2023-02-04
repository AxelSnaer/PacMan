// Base class used for creating levels
class Level {
    _objects = [];
    _objectsToDestroy = [];

    constructor() {
        // Call the onLoad event that the subclass can override
        this.onLoad();
    }

    // Creates a new game object of the specified type and places it into the level at the provided position
    newGameObject(type, x, y, ...args) {
        this._objects.push(new type(x, y, ...args));
    }

    // Tags a game object for destruction later in the frame
    destroyGameObject(object) {
        this._objectsToDestroy.push(object);
    }

    // Finds all game object of a specific type
    findGameObjectsOfType(type) {
        let objs = [];
        this._objects.forEach(obj => {
            if (obj.isOfType(type))
                objs.push(obj);
        });

        return objs;
    }

    // Updates every object in the level and checks for collisions
    _update(delta) {
        // Call both the onUpdate event for the level and every object in it
        this.onUpdate(delta);
        this._objects.forEach(obj => obj.onUpdate(delta));

        // Check collisions between every object
        for (let i = 0; i < this._objects.length; i++) {
            for (let j = i + 1; j < this._objects.length; j++) {
                // If there is no collision, continue
                if (!this._objects[i].checkCollision(this._objects[j]))
                    continue;

                // Otherwise, call the onCollision event for both objects
                this._objects[i].onCollision(this._objects[j]);
                this._objects[j].onCollision(this._objects[i]);
            }
        }

        // Call the late update event for each object
        this._objects.forEach(obj => obj.onLateUpdate(this.deltaTime));
        
        // Destroy all objects that were tagged by the 'destroyGameObject' function
        this._destroyTaggedObjects();
    }

    _draw(ctx) {
        // Draw each object
        this._objects.forEach(obj => {
            // Move the context to the object's position
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(Game.width / 2, Game.height / 2);
            ctx.translate(obj.pos.x, obj.pos.y);

            // Draw the object
            obj.onDraw(ctx)
        });

        // If 'showColliders' is on, then draw every collider
        if (Game.showColliders) {
            this._objects.forEach(obj => {
                // If there is no collider, continue
                if (!obj.collider)
                    return;

                // Move the context to the position of the object plus the offset of the collider
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.translate(Game.width / 2, Game.height / 2);
                ctx.translate(obj.pos.x + obj.collider.offset.x, obj.pos.y + obj.collider.offset.y);
                obj._drawCollision(ctx)
            });
        }

        // Reset the context and draw the ui
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.onDrawUI(ctx);
    }

    // Destroys all objects that were tagged by the 'destroyGameObject' function
    _destroyTaggedObjects() {
        this._objectsToDestroy.forEach(obj => this._objects.splice(this._objects.indexOf(obj), 1));
        this._objectsToDestroy = [];
    }

    // Key down event handler
    _keyDown(key) {
        // Pass the event on to the level subclass and each object
        this.onKeyDown(key)
        this._objects.forEach(obj => obj.onKeyDown(key));
    }

    // Key up event handler
    _keyUp(key) {
        // Pass the event on to the level subclass and each object
        this.onKeyUp(key)
        this._objects.forEach(obj => obj.onKeyUp(key));
    }

    // Gesture event handler
    _gesture(gesture) {
        // Pass the event on to the level subclass and each object
        this.onGesture(gesture)
        this._objects.forEach(obj => obj.onGesture(gesture));
    }

    // Tap event handler
    _tap(pos) {
        // Pass the event on to the level subclass and each object
        this.onTap(pos)
        this._objects.forEach(obj => obj.onTap(pos));
    }
    
    
    onLoad() {}
    onUpdate(delta) {}
    onDrawUI(ctx) {}
    onKeyDown(key) {}
    onKeyUp(key) {}
    onGesture(gesture) {}
    onPress(pos) {}
}