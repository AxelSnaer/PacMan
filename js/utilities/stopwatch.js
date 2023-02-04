// Class used for keeping track of time
class Stopwatch {
    constructor() {
        this._startTime = 0;
        this._active = false;
    }

    // Starts the timer
    startTimer() {
        this._active = true;
        this._startTime = Game.time;
    }

    // Stops and resets the timer
    stopTimer() {
        this._active = false;
        this._startTime = 0;
    }

    // Returns whether the timer is active
    isActive() {
        return this._active;
    }

    // Returns the time the stopwatch was started in seconds
    startTime() {
        return this._startTime;
    }

    // Returns the amount of time passed since the stopwatch was started in seconds
    elapsed() {
        return Game.time - this._startTime;
    }
}