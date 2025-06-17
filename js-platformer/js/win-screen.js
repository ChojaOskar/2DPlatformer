/**
 * @file Defines the win screen, displayed after the player completes all levels.
 */

/**
 * The win screen object. Handles displaying the final victory message.
 * @namespace winScreen
 */
const winScreen = {
    /**
     * Initializes the win screen. Plays music and sets up input handling.
     */
    enter: function() {
        window.levelMusic.pause();
        window.levelCompleteMusic.currentTime = 0;
        window.levelCompleteMusic.play();
        console.log("Entered win screen.");
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    /**
     * Cleans up the win screen. Stops music and removes the input listener.
     */
    exit: function() {
        window.levelCompleteMusic.pause();
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    /**
     * Updates the win screen state. This screen has no dynamic updates.
     */
    update: function() {
        
    },
    /**
     * Draws the win screen on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '50px Arial';
        ctx.fillText("You Win!", GAME_WIDTH / 2, 200);
        ctx.font = '30px Arial';
        ctx.fillText("Press Enter to return to the menu", GAME_WIDTH / 2, 300);
    },
    /**
     * Handles keydown events to return to the main menu.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyDown: function(e) {
        if (e.key === "Enter") {
            this.exit();
            window.menuMusic.play();
            switchScreen(menuScreen);
        }
    }
};
