const Game = {
    objects: [],
    frame: 0,
    keyDown: {},

    objectsToDestroy: [],
    
    init() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d')

        this.width  = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

        this.update();
    },

    update() {
        this.objects.forEach(obj => obj.onUpdate());
        this.objects.forEach(obj => obj.onLateUpdate());

        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                if (!this.objects[i].checkCollision(this.objects[j]))
                    continue;
                
                this.objects[i].onCollision(this.objects[j]);
                this.objects[j].onCollision(this.objects[i]);
            }
        }
        
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.objects.forEach(obj => obj.onDraw(this.ctx, this.frame));
        this.objects.forEach(obj => obj.drawCollision(this.ctx, this.frame));

        this.destroyTaggedObjects();

        this.frame++;
        window.requestAnimationFrame(this.update.bind(this));
    },

    newGameObject(type, x, y) {
        this.objects.push(new type(x, y));
    },

    destroyGameObject(object) {
        this.objectsToDestroy.push(object);
    },

    destroyTaggedObjects() {
        this.objectsToDestroy.forEach(obj => this.objects.splice(this.objects.indexOf(obj), 1));
        this.objectsToDestroy = [];
    },

    onKeyDown(e) {
        if (this.keyDown[e.key] !== true) {
            this.keyDown[e.key] = true;
            this.objects.forEach(obj => obj.onKeyDown(e.key));
            return;
        }
        
        this.keyDown[e.key] = true;
    },

    onKeyUp(e) {
        this.keyDown[e.key] = false;
        this.objects.forEach(obj => obj.onKeyUp(e.key));
    },
};