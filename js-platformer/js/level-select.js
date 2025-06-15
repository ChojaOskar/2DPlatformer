const levelSelectScreen = {
    enter: function() {
        console.log("Successfully entered level select screen.");
        this.selectedLevel = 0;
        progressManager.loadProgress(); // Make sure progress is up to date
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    exit: function() {
        console.log("Exiting level select screen.");
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    update: function() {
        // Nothing to update in a static menu
    },
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '50px Arial';
        ctx.fillText("Select a Level", GAME_WIDTH / 2, 150);

        ctx.font = '30px Arial';
        for (let i = 0; i < LEVELS.length; i++) {
            const isUnlocked = progressManager.isLevelUnlocked(i);
            if (i === this.selectedLevel) {
                ctx.fillStyle = 'yellow';
            } else {
                ctx.fillStyle = isUnlocked ? 'white' : 'grey';
            }
            ctx.fillText(`Level ${i + 1}${isUnlocked ? '' : ' (Locked)'}`, GAME_WIDTH / 2, 300 + i * 50);
        }
    },
    handleKeyDown: function(e) {
        if (e.key === "ArrowDown") {
            this.selectedLevel = (this.selectedLevel + 1) % LEVELS.length;
        } else if (e.key === "ArrowUp") {
            this.selectedLevel = (this.selectedLevel - 1 + LEVELS.length) % LEVELS.length;
        } else if (e.key === "Enter") {
            if (progressManager.isLevelUnlocked(this.selectedLevel)) {
                this.selectLevel();
            }
        } else if (e.key === "Escape") {
            this.exit();
            switchScreen(menuScreen);
        }
    },
    selectLevel: function() {
        this.exit();
        gameScreen.setLevel(LEVELS[this.selectedLevel], this.selectedLevel);
        switchScreen(gameScreen);
    }
};
