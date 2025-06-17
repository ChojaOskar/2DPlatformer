/**
 * @file Defines the camera object, which controls the viewport's vertical position.
 */

/**
 * The camera object. Manages the vertical scrolling of the game view.
 * @namespace camera
 */
const camera = {
    /**
     * The current vertical position (y-coordinate) of the camera.
     * @type {number}
     */
    y: 0,
    /**
     * The total height of the current level in pixels.
     * @type {number}
     */
    levelHeight: 0,

    /**
     * Initializes the camera with the level's height.
     * @param {Level} level - The current level object.
     */
    init: function(level) {
        this.levelHeight = level.tiles.length * level.tileSize;
    },

    /**
     * Updates the camera's position to follow the player.
     * @param {Player} player - The player object.
     */
    update: function(player) {
        // Center camera on player, with clamping to level boundaries
        const targetY = player.y - (GAME_HEIGHT / 2);
        this.y = Math.max(0, Math.min(targetY, this.levelHeight - GAME_HEIGHT));
    }
};
