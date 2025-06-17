/**
 * @file Defines the Enemy class for the platformer game.
 */

/**
 * Represents an enemy character that patrols a small area.
 */
class Enemy {
    /**
     * Creates a new Enemy instance.
     * @param {number} x - The initial x-coordinate of the enemy.
     * @param {number} y - The initial y-coordinate of the enemy.
     */
    constructor(x, y) {
        /**
         * The current x-coordinate of the enemy.
         * @type {number}
         */
        this.x = x;
        /**
         * The current y-coordinate of the enemy.
         * @type {number}
         */
        this.y = y;
        /**
         * The width of the enemy.
         * @type {number}
         */
        this.width = 40;
        /**
         * The height of the enemy.
         * @type {number}
         */
        this.height = 40;
        /**
         * The horizontal velocity of the enemy.
         * @type {number}
         */
        this.velocityX = 1;
        /**
         * The speed of the enemy.
         * @type {number}
         */
        this.speed = 1;
        /**
         * The direction of the enemy (1 for right, -1 for left).
         * @type {number}
         */
        this.direction = 1;
        /**
         * The range within which the enemy moves.
         * @type {number}
         */
        this.moveRange = 100; 
        /**
         * The initial x-coordinate of the enemy.
         * @type {number}
         */
        this.initialX = x;
        /**
         * Whether the enemy is alive.
         * @type {boolean}
         */
        this.alive = true; 
    }

    /**
     * Updates the enemy's position.
     * @param {Level} level - The current level object (not used in this simple AI).
     */
    update(level) {
        if (!this.alive) return; 

        this.x += this.velocityX;

        if (this.x > this.initialX + this.moveRange || this.x < this.initialX) {
            this.velocityX *= -1;
        }
    }

    /**
     * Draws the enemy on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    draw(ctx) {
        if (!this.alive) return; 

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Marks the enemy as not alive. This is called when the player stomps on it.
     */
    kill() {
        this.alive = false;
    }
}
