/**
 * @file Defines the level selection screen for the game.
 */

/**
 * The level selection screen object. Handles displaying both predefined and custom levels.
 * @namespace levelSelectScreen
 */
const levelSelectScreen = {
    /**
     * Initializes the level select screen. It loads both predefined and custom levels.
     */
    enter: function() {
        menuMusic.play();
        console.log("Entered level select screen.");
        const customLevels = JSON.parse(localStorage.getItem('customLevels')) || {};
        this.levels = [...LEVELS, ...Object.values(customLevels)];
        this.levelNames = [...LEVELS.map((_, i) => `Level ${i + 1}`), ...Object.keys(customLevels).map(name => `${name} (Custom)`)];
        this.selectedLevel = 0;
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },

    /**
     * Cleans up the level select screen. Called when switching away from this screen.
     * @param {object} nextScreen - The screen being switched to.
     */
    exit: function(nextScreen) {
        console.log("Exiting level select screen.");
        if (nextScreen !== menuScreen) {
            menuMusic.pause();
        }
        window.removeEventListener("keydown", this.keyDownHandler);
    },

    /**
     * Updates the level select screen state. Called on every frame. (Currently empty)
     */
    update: function() {
        
    },

    /**
     * Draws the level select screen on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '50px Arial';
        ctx.fillText("Select a Level", GAME_WIDTH / 2, 150);

        ctx.font = '30px Arial';
        for (let i = 0; i < this.levelNames.length; i++) {
            if (i === this.selectedLevel) {
                ctx.fillStyle = 'yellow';
            } else {
                ctx.fillStyle = 'white';
            }
            const levelName = this.levelNames[i];
            const isUnlocked = i < LEVELS.length ? progressManager.isLevelUnlocked(i + 1) : true;
            const fullText = isUnlocked ? levelName : `${levelName} (Locked)`;

            if (!isUnlocked) {
                ctx.fillStyle = 'grey';
            }

            ctx.fillText(fullText, GAME_WIDTH / 2, 200 + i * 50);
        }
    },

    /**
     * Handles keydown events for level selection navigation.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyDown: function(e) {
        if (e.key === "ArrowDown") {
            this.selectedLevel = (this.selectedLevel + 1) % this.levelNames.length;
        } else if (e.key === "ArrowUp") {
            this.selectedLevel = (this.selectedLevel - 1 + this.levelNames.length) % this.levelNames.length;
        } else if (e.key === "Enter") {
            const isUnlocked = this.selectedLevel < LEVELS.length ? progressManager.isLevelUnlocked(this.selectedLevel + 1) : true;
            if (isUnlocked) {
                this.selectLevel();
            }
        } else if (e.key === "Escape") {
            this.exit(menuScreen);
            switchScreen(menuScreen);
        }
    },

    /**
     * Starts the selected level.
     */
    selectLevel: function() {
        this.exit(gameScreen);
        gameScreen.setLevel(this.levels[this.selectedLevel], this.selectedLevel);
        switchScreen(gameScreen);
    }
};
