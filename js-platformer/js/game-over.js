/**
 * @file Defines the game over screen, which is displayed when the player loses all lives.
 */

/**
 * The game over screen object. Handles displaying the game over message and returning to the menu.
 * @namespace gameOverScreen
 */
const gameOverScreen = {
    /**
     * Initializes the game over screen. Plays music, resets progress, and sets up input handling.
     */
    enter: function() {
        window.gameOverMusic.play();
        progressManager.resetProgress();
        console.log("Entered game over screen and reset progress.");
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    /**
     * Cleans up the game over screen. Stops music and removes the input listener.
     */
    exit: function() {
        window.gameOverMusic.pause();
        window.gameOverMusic.currentTime = 0;
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    /**
     * Updates the game over screen state. This screen has no dynamic updates.
     */
    update: function() {
      
    },
    /**
     * Draws the game over screen on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.font = '50px Arial';
        ctx.fillText("Game Over", GAME_WIDTH / 2, 200);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText("Press Enter to return to the menu", GAME_WIDTH / 2, 300);
    },
    /**
     * Handles keydown events to return to the menu.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyDown: function(e) {
        if (e.key === "Enter") {
            this.exit();
            switchScreen(menuScreen);
        }
    }
};
