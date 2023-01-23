class Vector2 {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    duplicate() {
        return new Vector2(this.x, this.y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

    normalize() {
        let len = this.length();
        if (len === 0)
            return this;

        return this.divide(len);
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

    lerp(to, t) {
        this.x = lerp(this.x, to.x, t);
        this.y = lerp(this.y, to.y, t);

        return this;
    }
}

function lerp(v1, v2, t) {
    return v1 + (v2 - v1) * t;
}