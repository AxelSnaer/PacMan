let ab = 0;

class Vector2 {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    duplicate() {
        return new Vector2(this.x, this.y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    normalize() {
        let len = this.length();
        if (len === 0)
            return this;

        return this.divide(len);
    }

    normalized() {
        return this.duplicate().normalize();
    }

    length() {
        return Math.abs(Math.sqrt(this.x ** 2 + this.y ** 2));
    }

    dist(vec) {
        return vec.duplicate().sub(this).length();
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    multiply(amt) {
        this.x *= amt;
        this.y *= amt;

        return this;
    }

    divide(amt) {
        this.x /= amt;
        this.y /= amt;

        return this;
    }
}