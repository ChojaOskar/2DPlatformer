/**
 * @file Defines the level complete screen, shown after successfully finishing a level.
 */

/**
 * The level complete screen object. Handles displaying a success message and transitioning to the next screen.
 * @namespace levelCompleteScreen
 */
const levelCompleteScreen = {
    /**
     * Initializes the level complete screen. Plays music and sets up input handling.
     */
    enter: function() {
        window.levelMusic.pause();
        window.levelCompleteMusic.currentTime = 0;
        window.levelCompleteMusic.play();
        console.log("Entered level complete screen.");
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    /**
     * Cleans up the level complete screen. Stops music and removes the input listener.
     */
    exit: function() {
        window.levelCompleteMusic.pause();
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    /**
     * Updates the level complete screen state. This screen has no dynamic updates.
     */
    update: function() {
        
    },
    /**
     * Draws the level complete screen on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '50px Arial';
        ctx.fillText("Level Complete!", GAME_WIDTH / 2, 200);
        ctx.font = '30px Arial';
        ctx.fillText("Press Enter to continue", GAME_WIDTH / 2, 300);
    },
    /**
     * Handles keydown events to proceed to the next level or the win screen.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyDown: function(e) {
        if (e.key === "Enter") {
            this.exit();
            if (progressManager.areAllLevelsComplete()) {
                switchScreen(winScreen);
            } else {
                console.log("Attempting to switch to level select screen...");
                window.menuMusic.play();
                switchScreen(levelSelectScreen);
            }
        }
    }
};
