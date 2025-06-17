/**
 * @file Defines the main menu screen for the game.
 */

/**
 * The main menu screen object. Handles displaying menu options and user input.
 * @namespace menuScreen
 */
const menuScreen = {
    /**
     * Initializes the menu screen. Called when switching to this screen.
     */
    enter: function() {
        window.menuMusic.play();
        console.log("Entered menu screen.");
        this.menuText = "Block Adventure";
        this.options = ["Start Game", "Select Level", "Level Editor", "Reset Progress"];
        this.selectedOption = 0;
        this.message = '';
        this.messageTimer = 0;
        this.backgroundImage = window.backgroundImage;
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },

    /**
     * Cleans up the menu screen. Called when switching away from this screen.
     * @param {object} nextScreen - The screen being switched to.
     */
    exit: function(nextScreen) {
        console.log("Exiting menu screen.");
        if (nextScreen !== levelSelectScreen) {
            window.menuMusic.pause();
        }
        window.removeEventListener("keydown", this.keyDownHandler);
    },

    /**
     * Updates the menu screen state. Called on every frame.
     */
    update: function() {
        if (this.messageTimer > 0) {
            this.messageTimer--;
            if (this.messageTimer === 0) {
                this.message = '';
            }
        }
    },

    /**
     * Draws the menu screen on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    draw: function(ctx) {
        if (this.backgroundImage.complete) {
            ctx.drawImage(this.backgroundImage, 0, 0, GAME_WIDTH, GAME_HEIGHT);
        } else {
            ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        }

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '50px Arial';
        ctx.fillText(this.menuText, GAME_WIDTH / 2, 150);

        ctx.font = '30px Arial';
        for (let i = 0; i < this.options.length; i++) {
            if (i === this.selectedOption) {
                ctx.fillStyle = 'yellow';
            } else {
                ctx.fillStyle = 'white';
            }
            ctx.fillText(this.options[i], GAME_WIDTH / 2, 300 + i * 50);
        }
        
        if (this.messageTimer > 0) {
            ctx.fillStyle = 'green';
            ctx.font = '24px Arial';
            ctx.fillText(this.message, GAME_WIDTH / 2, GAME_HEIGHT - 50);
        }
    },

    /**
     * Handles keydown events for menu navigation.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyDown: function(e) {
        if (e.key === "ArrowDown") {
            this.selectedOption = (this.selectedOption + 1) % this.options.length;
        } else if (e.key === "ArrowUp") {
            this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
        } else if (e.key === "Enter") {
            this.selectOption();
        }
    },

    /**
     * Executes the action for the currently selected menu option.
     */
    selectOption: function() {
        const option = this.options[this.selectedOption];
        

        switch (option) {
            case "Start Game":
                this.exit(gameScreen);
                gameScreen.setLevel(LEVELS[0], 0);
                switchScreen(gameScreen);
                break;
            case "Select Level":
                this.exit(levelSelectScreen);
                switchScreen(levelSelectScreen);
                break;
            case "Level Editor":
                this.exit(editorScreen);
                switchScreen(editorScreen);
                break;
            case "Reset Progress":
                progressManager.resetProgress();
                this.message = "Progress has been reset!";
                this.messageTimer = 120; 
                break;
        }
    }
};
