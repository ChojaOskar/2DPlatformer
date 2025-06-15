const GRAVITY = 0.2;
const JUMP_FORCE = -8;
const MOVE_SPEED = 2;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = false;
    }

    update(level) {
        // Horizontal movement and collision
        this.x += this.velocityX;
        const collisionResultX = this.checkCollisions(level, 'x');

        // Vertical movement and collision
        this.velocityY += GRAVITY;
        this.y += this.velocityY;
        this.onGround = false;
        const collisionResultY = this.checkCollisions(level, 'y');

        if (collisionResultX === 'coin_collected' || collisionResultY === 'coin_collected') {
            return 'coin_collected';
        }
        if (collisionResultX === 'goal_reached' || collisionResultY === 'goal_reached') {
            return 'goal_reached';
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    jump() {
        if (this.onGround) {
            this.velocityY = JUMP_FORCE;
        }
    }

    checkCollisions(level, axis) {
        const tileSize = level.tileSize;
        const tiles = level.tiles;

        for (let r = 0; r < tiles.length; r++) {
            for (let c = 0; c < tiles[r].length; c++) {
                const tileValue = tiles[r][c];
                if (tileValue === 0) continue;

                const tile = { x: c * tileSize, y: r * tileSize, width: tileSize, height: tileSize };

                if (this.x < tile.x + tile.width &&
                    this.x + this.width > tile.x &&
                    this.y < tile.y + tile.height &&
                    this.y + this.height > tile.y) {

                    if (tileValue === 1) { // Solid tile
                        if (axis === 'x') {
                            if (this.velocityX > 0) { // Moving right
                                this.x = tile.x - this.width;
                            } else if (this.velocityX < 0) { // Moving left
                                this.x = tile.x + tile.width;
                            }
                        } else if (axis === 'y') {
                            if (this.velocityY > 0) { // Moving down
                                this.y = tile.y - this.height;
                                this.velocityY = 0;
                                this.onGround = true;
                            } else if (this.velocityY < 0) { // Moving up
                                this.y = tile.y + tile.height;
                                this.velocityY = 0;
                            }
                        }
                    } else if (tileValue === 2) { // Goal tile
                        return 'goal_reached';
                    } else if (tileValue === 3) { // Coin tile
                        level.tiles[r][c] = 0; // Remove coin
                        return 'coin_collected';
                    }
                }
            }
        }
    }
}