let ab = 0;

// Simple 2d vector class with a bunch of helper functions
class Vector2 {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    // Returns a copy of this vector
    duplicate() {
        return new Vector2(this.x, this.y);
    }

    // Sets the x and y values of the vector
    set(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;

        return this;
    }

    // Checks whether this vector is equal to the provided vector
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    // Normalizes the vector (makes it's length 1)
    normalize() {
        let len = this.length();
        if (len === 0)
            return this;

        return this.divide(len);
    }

    // Creates a copy of this vector that is normalized
    normalized() {
        return this.duplicate().normalize();
    }

    // Returns the length of the vector
    length() {
        return Math.abs(Math.sqrt(this.x ** 2 + this.y ** 2));
    }

    // Returns the distance between this vector and another
    dist(vec) {
        return vec.duplicate().sub(this).length();
    }

    // Adds another vector to this vector
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    }

    // Subtracts another vector from this vector
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    // Multiplies this vector by a number
    multiply(amt) {
        this.x *= amt;
        this.y *= amt;

        return this;
    }

    // Divides this vector by a number
    divide(amt) {
        this.x /= amt;
        this.y /= amt;

        return this;
    }
}