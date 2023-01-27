const Game = {
    frame: 0,
    time: 0,
    deltaTime: 0,
    width: 0,
    height: 0,
    keyDown: {},
    paused: false,
    state: {}, // Public mutable state to keep track of global game information
    
    _objects: [],
    _objectsToDestroy: [],
    _oldTimeStamp: 0,
    
    init() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d')

        this.width  = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));

        window.requestAnimationFrame(this._gameLoop.bind(this));
    },

    newGameObject(type, x, y) {
        this._objects.push(new type(x, y));
    },

    destroyGameObject(object) {
        this._objectsToDestroy.push(object);
    },

    save(name, value) {
        localStorage[name] = value;
    },

    load(name) {
        return localStorage[name];
    },


    _gameLoop(timeStamp) {
        this._updateTime(timeStamp);

        if (!this.paused)
            this._update();
        
        this._render();

        window.requestAnimationFrame(this._gameLoop.bind(this));
    },

    _updateTime(timeStamp) {
        this.time = timeStamp / 1000;
        this.deltaTime = this.time - this._oldTimeStamp;
        this._oldTimeStamp = this.time;
    },

    _update() {
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

        this._render();
    },

    _render() {
        if (this.width !== window.innerWidth || this.height !== window.innerHeight) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this._objects.forEach(obj => obj.onResize(this.width, this.height));
        }
        
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this._objects.forEach(obj => obj.onDraw(this.ctx));
        this._objects.forEach(obj => obj.drawCollision(this.ctx));

        this._destroyTaggedObjects();

        this.frame++;
    },

    _destroyTaggedObjects() {
        this._objectsToDestroy.forEach(obj => this._objects.splice(this._objects.indexOf(obj), 1));
        this._objectsToDestroy = [];
    },

    _onKeyDown(e) {
        if (this.keyDown[e.key] !== true) {
            this.keyDown[e.key] = true;
            this._objects.forEach(obj => obj.onKeyDown(e.key));
            return;
        }
        
        this.keyDown[e.key] = true;
    },

    _onKeyUp(e) {
        this.keyDown[e.key] = false;
        this._objects.forEach(obj => obj.onKeyUp(e.key));
    },
};