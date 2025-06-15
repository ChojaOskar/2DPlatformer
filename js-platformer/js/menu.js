const menuScreen = {
    enter: function() {
        console.log("Entered menu screen.");
        this.menuText = "JS Platformer";
        this.options = ["Start Game", "Select Level", "Level Editor"];
        this.selectedOption = 0;
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    exit: function() {
        console.log("Exiting menu screen.");
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
    },
    handleKeyDown: function(e) {
        if (e.key === "ArrowDown") {
            this.selectedOption = (this.selectedOption + 1) % this.options.length;
        } else if (e.key === "ArrowUp") {
            this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
        } else if (e.key === "Enter") {
            this.selectOption();
        }
    },
    selectOption: function() {
        this.exit();
        switch (this.selectedOption) {
            case 0:
                switchScreen(gameScreen);
                break;
            case 1:
                switchScreen(levelSelectScreen);
                break;
            case 2:
                switchScreen(editorScreen);
                break;
        }
    }
};
