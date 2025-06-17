/**
 * @file Defines the Player class, which controls the player character's behavior.
 */

const GRAVITY = 0.2;
const JUMP_FORCE = -8;
const MOVE_SPEED = 2;

/**
 * Represents the player character.
 */
class Player {
    /**
     * Creates a new Player instance.
     * @param {number} x - The initial x-coordinate of the player.
     * @param {number} y - The initial y-coordinate of the player.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = false;
        this.lives = 3;
        this.respawnPoint = { x: x, y: y };
        this.isInvincible = false;
        this.invincibilityTimer = 0;
        this.angle = 0;
    }

    /**
     * Updates the player's state for the current frame.
     * @param {Level} level - The current level object.
     * @returns {string|null} A string indicating the player's status (e.g., 'coin_collected'), or null.
     */
    update(level) {
        // 1. Handle invincibility state
        if (this.isInvincible) {
            this.invincibilityTimer--;
            if (this.invincibilityTimer <= 0) {
                this.isInvincible = false;
            }
        }

        // 2. Apply forces (input from game.js, gravity here)
        this.velocityY += GRAVITY;

        // 3. Move and resolve collisions with solid tiles
        this.x += this.velocityX;
        this.checkTileCollisions(level, 'x');

        this.y += this.velocityY;
        this.onGround = false; // Reset onGround status each frame
        this.checkTileCollisions(level, 'y');

        // 4. Check for other interactions
        this.checkTrampolineCollision(level);
        const enemyStatus = this.checkEnemyCollision(level);
        if (enemyStatus) return enemyStatus;

        if (this.checkCoinCollision(level)) return 'coin_collected';
        if (this.checkGoalCollision(level)) return 'goal_reached';

        if (this.onGround) {
            this.angle = 0;
        } else {
            const rotationSpeed = 5;
            if (this.velocityX > 0) {
                this.angle += rotationSpeed; // Spin right
            } else if (this.velocityX < 0) {
                this.angle -= rotationSpeed; // Spin left
            } else {
                this.angle += rotationSpeed; // Default spin for vertical jump
            }
        }

        return null;
    }

    /**
     * Draws the player on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    draw(ctx) {
        if (this.isInvincible) {
            // Flash every 4 frames for a blinking effect
            if (Math.floor(this.invincibilityTimer / 4) % 2 === 0) {
                return; 
            }
        }
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = 'orange';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    /**
     * Makes the player jump if they are on the ground.
     */
    jump() {
        if (this.onGround) {
            this.velocityY = JUMP_FORCE;
            if (window.jumpSound) {
                window.jumpSound.currentTime = 0;
                window.jumpSound.play();
            }
        }
    }

    /**
     * Checks for and handles collisions with enemies.
     * @param {Level} level - The current level object.
     * @returns {string|null} 'enemy_killed' or 'enemy_collision', or null if no collision.
     */
    checkEnemyCollision(level) {
        const enemies = level.enemies || [];
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (enemy.alive && this.isCollidingWith(enemy)) {
                const previousPlayerBottom = (this.y - this.velocityY) + this.height;
                // Stomp condition: falling, and was above the enemy in the previous frame.
                if (this.velocityY > 0 && previousPlayerBottom <= enemy.y + 1) {
                    enemy.kill();
                    this.velocityY = -JUMP_FORCE / 2; 
                    this.isInvincible = true;
                    this.invincibilityTimer = 15; 
                    return 'enemy_killed';
                } else if (!this.isInvincible) {
                    return 'enemy_collision';
                }
            }
        }
        return null;
    }

    /**
     * AABB collision detection.
     * @param {object} other - The other object to check collision with (must have x, y, width, height).
     * @returns {boolean} True if colliding, false otherwise.
     */
    isCollidingWith(other) {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    /**
     * Checks for and resolves collisions with solid tiles on a given axis.
     * @param {Level} level - The current level object.
     * @param {string} axis - The axis to check ('x' or 'y').
     */
    checkTileCollisions(level, axis) {
        const tileSize = level.tileSize;
        for (let r = 0; r < level.tiles.length; r++) {
            for (let c = 0; c < level.tiles[r].length; c++) {
                if (level.tiles[r][c] === 1) { // 1 is a solid tile
                    const tile = { x: c * tileSize, y: r * tileSize, width: tileSize, height: tileSize };
                    if (this.isCollidingWith(tile)) {
                        if (axis === 'x') {
                            if (this.velocityX > 0) {
                                this.x = tile.x - this.width;
                            } else if (this.velocityX < 0) {
                                this.x = tile.x + tile.width;
                            }
                            this.velocityX = 0;
                        } else if (axis === 'y') {
                            if (this.velocityY > 0) {
                                this.y = tile.y - this.height;
                                this.onGround = true;
                            } else if (this.velocityY < 0) {
                                this.y = tile.y + tile.height;
                            }
                            this.velocityY = 0;
                        }
                    }
                }
            }
        }
    }

    /**
     * Checks for collisions with coins.
     * @param {Level} level - The current level object.
     * @returns {boolean} True if a coin was collected, false otherwise.
     */
    checkCoinCollision(level) {
        const tileSize = level.tileSize;
        for (let r = 0; r < level.tiles.length; r++) {
            for (let c = 0; c < level.tiles[r].length; c++) {
                if (level.tiles[r][c] === 3) { // 3 is a coin
                    const coin = { x: c * tileSize, y: r * tileSize, width: tileSize, height: tileSize };
                    if (this.isCollidingWith(coin)) {
                        level.tiles[r][c] = 0; 
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Checks for collision with the goal tile.
     * @param {Level} level - The current level object.
     * @returns {boolean} True if the goal was reached, false otherwise.
     */
    checkGoalCollision(level) {
        const tileSize = level.tileSize;
        for (let r = 0; r < level.tiles.length; r++) {
            for (let c = 0; c < level.tiles[r].length; c++) {
                if (level.tiles[r][c] === 2) { // 2 is the goal
                    const goal = { x: c * tileSize, y: r * tileSize, width: tileSize, height: tileSize };
                    if (this.isCollidingWith(goal)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Checks for and handles collisions with trampolines.
     * @param {Level} level - The current level object.
     * @returns {boolean} True if a trampoline was used, false otherwise.
     */
    checkTrampolineCollision(level) {
        const tileSize = level.tileSize;
        for (let r = 0; r < level.tiles.length; r++) {
            for (let c = 0; c < level.tiles[r].length; c++) {
                if (level.tiles[r][c] === 5) { // 5 is a trampoline
                    const trampoline = { x: c * tileSize, y: r * tileSize, width: tileSize, height: tileSize };
                    if (this.isCollidingWith(trampoline)) {
                        const previousPlayerBottom = (this.y - this.velocityY) + this.height;
                        
                        if (this.velocityY > 0 && previousPlayerBottom <= trampoline.y + 1) {
                            this.y = trampoline.y - this.height; 
                            this.velocityY = JUMP_FORCE * 1.9; 
                            return true; 
                        }
                    }
                }
            }
        }
        return false;
    }
}