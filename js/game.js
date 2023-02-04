const Game = {
    frame: 0,
    time: 0,
    deltaTime: 0,
    width: 0,
    height: 0,
    keyDown: {},
    paused: false,
    state: {}, // Public mutable state to keep track of global game information
    level: null,
    showColliders: false,
    
    _oldTimeStamp: 0,
    _canvas: null,
    _ctx: null,
    _touches: {},
    
    init() {
        this._canvas = document.getElementById('canvas');
        this._ctx = this._canvas.getContext('2d')

        this.width  = this._canvas.clientWidth;
        this.height = this._canvas.clientHeight;
        
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup',   this._onKeyUp.bind(this));
        document.addEventListener('touchstart', this._onTouchStart.bind(this));
        document.addEventListener('touchmove',  this._onTouchMove.bind(this));
        document.addEventListener('touchend',   this._onTouchEnd.bind(this));

        window.requestAnimationFrame(this._gameLoop.bind(this));
    },

    loadLevel(level) {
        this.level?.onCleanup();
        this.level = new level();
    },

    saveVar(name, value) {
        localStorage[name] = value;
    },

    loadVar(name) {
        return localStorage[name];
    },


    _gameLoop(timeStamp) {
        this._updateTime(timeStamp);

        if (this.width !== window.innerWidth || this.height !== window.innerHeight) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.level._resize(this.width, this.height);
        }
                
        if (!this.paused)
            this.level?._update(this.deltaTime);
        
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.fillStyle = '#000000';
        this._ctx.fillRect(0, 0, this.width, this.height);

        this.level?._draw(this._ctx);
        this.frame++;

        window.requestAnimationFrame(this._gameLoop.bind(this));
    },

    _updateTime(timeStamp) {
        this.time = timeStamp / 1000;
        this.deltaTime = this.time - this._oldTimeStamp;
        this._oldTimeStamp = this.time;
        this.framerate = 1 / this.deltaTime;
    },

    _onKeyDown(e) {
        if (this.keyDown[e.key] !== true) {
            this.keyDown[e.key] = true;
            this.level._keyDown(e.key);

            if (e.key === 'f') {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.body.requestFullscreen();
                }
            }
            if (e.key === 'F2') {
                this.showColliders = !this.showColliders;
            }

            return;
        }
        
        this.keyDown[e.key] = true;
    },

    _onKeyUp(e) {
        this.keyDown[e.key] = false;
        this.level._keyUp(e.key);
    },

    _onTouchStart(e) {
        e.preventDefault();

        for (let i = 0; i < e.changedTouches.length; i++) {
            this._touches[e.changedTouches[i].identifier] = e.changedTouches[i];
        }
    },

    _onTouchMove(e) {
        e.preventDefault();
    },

    _onTouchEnd(e) {
        e.preventDefault();

        for (let i = 0; i < e.changedTouches.length; i++) {
            let start = this._touches[e.changedTouches[i].identifier];
            let end = e.changedTouches[i];

            let gesture = {
                start: new Vector2(start.clientX, start.clientY),
                end: new Vector2(end.clientX, end.clientY),
            };

            if (gesture.start.equals(gesture.end)) {
                this.level._press(gesture.start);
            } else {
                this.level._gesture(gesture);
            }
        }
    }
};