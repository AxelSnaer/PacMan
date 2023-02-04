class Stopwatch {
    constructor() {
        this._startTime = 0;
        this._active = false;
    }

    startTimer() {
        this._active = true;
        this._startTime = Game.time;
    }

    stopTimer() {
        this._active = false;
        this._startTime = 0;
    }

    isActive() {
        return this._active;
    }

    startTime() {
        return this._startTime;
    }

    elapsed() {
        return Game.time - this._startTime;
    }
}