const winScreen = {
    enter: function() {
        levelMusic.pause();
        levelCompleteSound.currentTime = 0;
        levelCompleteSound.play();
        console.log("Entered win screen.");
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    exit: function() {
        levelCompleteSound.pause();
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    update: function() {
        
    },
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '50px Arial';
        ctx.fillText("You Win!", GAME_WIDTH / 2, 200);
        ctx.font = '30px Arial';
        ctx.fillText("Press Enter to return to the menu", GAME_WIDTH / 2, 300);
    },
    handleKeyDown: function(e) {
        if (e.key === "Enter") {
            this.exit();
            switchScreen(menuScreen);
        }
    }
};
