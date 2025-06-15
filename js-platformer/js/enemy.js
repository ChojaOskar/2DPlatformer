class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.velocityX = 1;
        this.speed = 1;
        this.direction = 1;
        this.moveRange = 100; 
        this.initialX = x;
        this.alive = true; 
    }

    update(level) {
        if (!this.alive) return; 

        this.x += this.velocityX;

        if (this.x > this.initialX + this.moveRange || this.x < this.initialX) {
            this.velocityX *= -1;
        }
    }

    draw(ctx) {
        if (!this.alive) return; 

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    kill() {
        this.alive = false;
    }
}
