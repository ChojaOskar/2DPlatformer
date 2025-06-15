const gameOverScreen = {
    enter: function() {
        progressManager.resetProgress();
        console.log("Entered game over screen and reset progress.");
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    exit: function() {
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    update: function() {
      
    },
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
    handleKeyDown: function(e) {
        if (e.key === "Enter") {
            this.exit();
            switchScreen(menuScreen);
        }
    }
};
