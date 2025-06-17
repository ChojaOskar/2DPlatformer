const levelCompleteScreen = {
    enter: function() {
        window.levelMusic.pause();
        window.levelCompleteMusic.currentTime = 0;
        window.levelCompleteMusic.play();
        console.log("Entered level complete screen.");
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    exit: function() {
        window.levelCompleteMusic.pause();
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    update: function() {
        
    },
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '50px Arial';
        ctx.fillText("Level Complete!", GAME_WIDTH / 2, 200);
        ctx.font = '30px Arial';
        ctx.fillText("Press Enter to continue", GAME_WIDTH / 2, 300);
    },
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
