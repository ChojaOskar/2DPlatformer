const levelSelectScreen = {
    enter: function() {
        menuMusic.play();
        console.log("Successfully entered level select screen.");
        this.selectedLevel = 0;
        progressManager.loadProgress(); 
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    exit: function(nextScreen) {
        console.log("Exiting level select screen.");
        if (nextScreen !== menuScreen) {
            menuMusic.pause();
        }
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    update: function() {
        
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
            let nextLevel = this.selectedLevel;
            do {
                nextLevel = (nextLevel + 1) % LEVELS.length;
            } while (!progressManager.isLevelUnlocked(nextLevel) && nextLevel !== this.selectedLevel);
            this.selectedLevel = nextLevel;
        } else if (e.key === "ArrowUp") {
            let prevLevel = this.selectedLevel;
            do {
                prevLevel = (prevLevel - 1 + LEVELS.length) % LEVELS.length;
            } while (!progressManager.isLevelUnlocked(prevLevel) && prevLevel !== this.selectedLevel);
            this.selectedLevel = prevLevel;
        } else if (e.key === "Enter") {
            if (progressManager.isLevelUnlocked(this.selectedLevel)) {
                this.selectLevel();
            }
        } else if (e.key === "Escape") {
            this.exit(menuScreen);
            switchScreen(menuScreen);
        }
    },
    selectLevel: function() {
        this.exit(gameScreen);
        gameScreen.setLevel(LEVELS[this.selectedLevel], this.selectedLevel);
        switchScreen(gameScreen);
    }
};
