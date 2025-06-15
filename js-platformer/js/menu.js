const menuScreen = {
    enter: function() {
        console.log("Entered menu screen.");
        this.menuText = "JS Platformer";
        this.options = ["Start Game", "Select Level", "Level Editor", "Reset Progress"];
        this.selectedOption = 0;
        this.message = '';
        this.messageTimer = 0;
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    exit: function() {
        console.log("Exiting menu screen.");
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    update: function() {
        if (this.messageTimer > 0) {
            this.messageTimer--;
            if (this.messageTimer === 0) {
                this.message = '';
            }
        }
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
        
        if (this.messageTimer > 0) {
            ctx.fillStyle = 'green';
            ctx.font = '24px Arial';
            ctx.fillText(this.message, GAME_WIDTH / 2, GAME_HEIGHT - 50);
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
        const option = this.options[this.selectedOption];
        if (option !== "Reset Progress") {
            this.exit();
        }

        switch (option) {
            case "Start Game":
                gameScreen.setLevel(LEVELS[0], 0);
                switchScreen(gameScreen);
                break;
            case "Select Level":
                switchScreen(levelSelectScreen);
                break;
            case "Level Editor":
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
