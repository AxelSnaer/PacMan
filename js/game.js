const Game = {
    objects: [],
    frame: 0,
    keyDown: {},
    
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
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, 600, 480);

        this.objects.forEach(obj => obj.onUpdate());
        this.objects.forEach(obj => obj.onLateUpdate());
        this.objects.forEach(obj => obj.onDraw(this.ctx, this.frame));

        this.frame++;
        window.requestAnimationFrame(this.update.bind(this));
    },

    newGameObject(object) {
        this.objects.push(object);
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