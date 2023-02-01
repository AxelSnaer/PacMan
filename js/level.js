class Level {
    _objects = [];
    _objectsToDestroy = [];

    constructor() {
        this.onLoad();
    }

    _update(delta) {
        this.onUpdate(delta);
        this._objects.forEach(obj => obj.onUpdate(this.deltaTime));

        for (let i = 0; i < this._objects.length; i++) {
            for (let j = i + 1; j < this._objects.length; j++) {
                if (!this._objects[i].checkCollision(this._objects[j]))
                    continue;
                
                this._objects[i].onCollision(this._objects[j]);
                this._objects[j].onCollision(this._objects[i]);
            }
        }

        this._objects.forEach(obj => obj.onLateUpdate(this.deltaTime));
        
        this._destroyTaggedObjects();
    }

    _draw(ctx) {
        this._objects.forEach(obj => obj.onDraw(ctx));
        this._objects.forEach(obj => obj.drawCollision(ctx));

        this.onDrawUI(ctx);
    }

    _resize(width, height) {
        this._objects.forEach(obj => obj.onResize(this.width, this.height));
        this.onResize(width, height);
    }

    _destroyTaggedObjects() {
        this._objectsToDestroy.forEach(obj => this._objects.splice(this._objects.indexOf(obj), 1));
        this._objectsToDestroy = [];
    }

    _keyDown(key) {
        this._objects.forEach(obj => obj.onKeyDown(key));
    }

    _keyUp(key) {
        this._objects.forEach(obj => obj.onKeyUp(key));
    }

    newGameObject(type, x, y) {
        let obj = new type(x, y);
        this._objects.push(obj);
        return this._objects[this._objects.length - 1];
    }

    destroyGameObject(object) {
        this._objectsToDestroy.push(object);
    }
    
    
    onResize(width, height) {}
    onLoad() {}
    onUpdate(delta) {}
    onDrawUI(ctx) {}
    onCleanup() {}
}

class MainLevel extends Level {
    onLoad() {
        for (let x = 0; x < 10; x++)
            for (let y = 0; y < 10; y++)
                this.newGameObject(Dot, 100 + x * 25, 100 + y * 25);

        this.newGameObject(PowerPellet, 75, 75);
        this.newGameObject(PowerPellet, 350, 75);
        this.newGameObject(PowerPellet, 350, 350);
        this.newGameObject(PowerPellet, 75, 350);

        this.newGameObject(Obstacle, 200, 200);
        this.newGameObject(Obstacle, 200, 200);
        this.newGameObject(Obstacle, 200, 200);
        this.newGameObject(Obstacle, 200, 200);

        this.newGameObject(Ghost, 100, 100);
        this.newGameObject(Pacman, 40, 40);
    }

    onDrawUI(ctx) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Score: ${Game.state.score}`, 10, 25);
        ctx.fillText(`Lives: ${Game.state.lives}`, 330, 25);
    }
}