// Game singleton used to run the game loop and keep track of the game's state
const Game = {
    frame: 0,
    time: 0,
    deltaTime: 0,
    width: 0,
    height: 0,
    keyDown: {},
    state: {},
    level: null,
    showColliders: false,
    
    _oldTimeStamp: 0,
    _canvas: null,
    _ctx: null,
    _touches: {},
    
    // Initializes the main game singleton
    init() {
        // Fetch canvas and create context
        this._canvas = document.getElementById('canvas');
        this._ctx = this._canvas.getContext('2d')

        // Set correct width and height
        this.width  = this._canvas.clientWidth;
        this.height = this._canvas.clientHeight;
        
        // Bind functions to events
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup',   this._onKeyUp.bind(this));
        this._canvas.addEventListener('touchstart', this._onTouchStart.bind(this));
        this._canvas.addEventListener('touchmove',  this._onTouchMove.bind(this));
        this._canvas.addEventListener('touchend',   this._onTouchEnd.bind(this));

        // Start main game loop
        window.requestAnimationFrame(this._gameLoop.bind(this));
    },

    // Creates and loads a level
    loadLevel(level) {
        this.level = new level();
    },

    // Saves a variable to localStorage
    saveVar(name, value) {
        localStorage[name] = value;
    },

    // Retrieves a variable from localStorage
    loadVar(name) {
        return localStorage[name];
    },

    // The main game loop
    _gameLoop(timeStamp) {
        // Update time information using the new time stamp
        this._updateTime(timeStamp);

        // Handle resizing
        this._updateGameSize();
        
        // Updates the level
        this.level?._update(this.deltaTime);
        
        // Reset context state and clear the screen
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.fillStyle = '#000000';
        this._ctx.fillRect(0, 0, this.width, this.height);

        // Draw the level
        this.level?._draw(this._ctx);
        
        // Advance to the next frame
        this.frame++;
        window.requestAnimationFrame(this._gameLoop.bind(this));
    },

    // Update time information based on the provided time stamp
    _updateTime(timeStamp) {
        // Update time & delta time
        this.time = timeStamp / 1000;
        this.deltaTime = this.time - this._oldTimeStamp;

        // Save this time stamp for the next calculation
        this._oldTimeStamp = this.time;
    },
    
    // Updates the canvas size based on the window size
    _updateGameSize() {
        // If the size of the window does not equal the size of the canvas...
        if (this.width !== window.innerWidth || this.height !== window.innerHeight) {
            // ...then update the size of the canvas to match the size of the window
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
    },

    // Key down event handler
    _onKeyDown(e) {
        // Get whether the key is pressed or not
        let wasDown = this.keyDown[e.key];
        
        // Set the key as being pressed
        this.keyDown[e.key] = true;

        // If the key was not already pressed (for repeats, i.e. holding down the key)...
        if (!wasDown) {
            // Invoke the key down event in the current level
            this.level._keyDown(e.key);

            // If the key was 'F2'...
            if (e.key === 'F2') {
                // then show all hitboxes
                this.showColliders = !this.showColliders;
            }
        }
    },

    // Key up event handler
    _onKeyUp(e) {
        // Set the key as being released
        this.keyDown[e.key] = false;

        // Call the key up event for the level
        this.level._keyUp(e.key);
    },

    // Touch start event handler
    _onTouchStart(e) {
        e.preventDefault();

        // For each touch, record it into the this._touches variable for future access
        for (let i = 0; i < e.changedTouches.length; i++) {
            this._touches[e.changedTouches[i].identifier] = e.changedTouches[i];
        }
    },

    // Touch move event handler
    _onTouchMove(e) {
        e.preventDefault();
    },

    // Touch end event handler
    _onTouchEnd(e) {
        e.preventDefault();

        // For each of the affected touches
        for (let i = 0; i < e.changedTouches.length; i++) {
            // Get the start and end position
            let start = this._touches[e.changedTouches[i].identifier];
            let end = e.changedTouches[i];

            // Create a gesture object
            let gesture = {
                start: new Vector2(start.clientX, start.clientY),
                end: new Vector2(end.clientX, end.clientY),
            };

            // If the start and end position are equal
            if (gesture.start.equals(gesture.end)) {
                // then it was a tap
                this.level._tap(gesture.start);
            } else {
                // otherwise it was a gesture
                this.level._gesture(gesture);
            }
        }
    }
};