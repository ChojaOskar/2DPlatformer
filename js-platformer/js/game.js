let currentLevelData = null;
let currentLevelIndex = 0;

const gameScreen = {
    enter: function() {
        window.menuMusic.pause();
        window.levelMusic.play();
        console.log("Entered game screen.");
        if (currentLevelData) {
            this.level = new Level(currentLevelData);
        } else {
            // Default to level 0 if no level is passed
            currentLevelIndex = 0;
            this.level = new Level(LEVELS[currentLevelIndex]);
        }
        // Start player at the position defined in the level data
        const startX = this.level.playerStart.x * this.level.tileSize;
        const startY = this.level.playerStart.y * this.level.tileSize;
        this.player = new Player(startX, startY, this.level);
        this.player.lives = 3; 
        camera.init(this.level); // Initialize camera
        this.coinsCollected = 0;
        this.message = '';
        this.messageTimer = 0;

        this.keys = {};
        this.keyDownHandler = this.handleKeyDown.bind(this);
        this.keyUpHandler = this.handleKeyUp.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    },
    exit: function() {
        window.levelMusic.pause();
        window.levelMusic.currentTime = 0;
        console.log("Exiting game screen.");
        window.removeEventListener("keydown", this.keyDownHandler);
        window.removeEventListener("keyup", this.keyUpHandler);
        currentLevelData = null;
    },
    update: function() {
        this.handleInput();
        const playerStatus = this.player.update(this.level);
        camera.update(this.player);

        // Update enemies
        if (this.level.enemies) {
            this.level.enemies.forEach(enemy => enemy.update(this.level));
        }

        

        if (playerStatus === 'coin_collected') {
            window.coinSound.currentTime = 0;
            window.coinSound.play();
            this.coinsCollected++;
        } else if (playerStatus === 'goal_reached') {
            if (this.coinsCollected === this.level.totalCoins) {
                progressManager.markLevelAsComplete(currentLevelIndex);
                this.levelComplete();
            } else {
                this.message = "Collect all coins to finish!";
                this.messageTimer = 120; 
            }
        } else if (playerStatus === 'enemy_killed') {
            
        } else if (playerStatus === 'enemy_collision') {
            window.lifeLostSound.play();
            this.player.lives--;
            this.player.isInvincible = true;
            this.player.invincibilityTimer = 90; 

            if (this.player.lives <= 0) {
                this.exit();
                switchScreen(gameOverScreen);
            } else {
                this.message = `You lost a life! ${this.player.lives} lives left.`;
                this.messageTimer = 120;
                // Respawn player
                this.player.x = this.player.respawnPoint.x;
                this.player.y = this.player.respawnPoint.y;
                this.player.velocityX = 0;
                this.player.velocityY = 0;
            }
        }

        if (this.messageTimer > 0) {
            this.messageTimer--;
            if (this.messageTimer === 0) {
                this.message = '';
            }
        }
    },
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.save();
        ctx.translate(0, -camera.y);

        this.level.draw(ctx);
        if (this.level.enemies) {
            this.level.enemies.forEach(enemy => enemy.draw(ctx));
        }

        
        this.player.draw(ctx);

        ctx.restore();

        // Draw UI
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Coins: ${this.coinsCollected} / ${this.level.totalCoins}`, 20, 40);
        ctx.fillText(`Lives: ${this.player.lives}`, 20, 80);

        if (this.messageTimer > 0) {
            ctx.textAlign = 'center';
            ctx.fillText(this.message, GAME_WIDTH / 2, 80);
        }
    },
    handleKeyDown: function(e) {
        this.keys[e.key] = true;
        if (e.key === "Escape") {
            this.exit();
            switchScreen(menuScreen);
        }
    },
    handleKeyUp: function(e) {
        this.keys[e.key] = false;
    },
    setLevel: function(levelData, levelIndex) {
        currentLevelData = levelData;
        currentLevelIndex = levelIndex;
    },
    handleInput: function() {
        this.player.velocityX = 0;
        if (this.keys['ArrowLeft']) {
            this.player.velocityX = -MOVE_SPEED;
        }
        if (this.keys['ArrowRight']) {
            this.player.velocityX = MOVE_SPEED;
        }
        if (this.keys[' ']) { // Space bar for jump
            this.player.jump();
        }
    },
    levelComplete: function() {
        console.log(`Level ${currentLevelIndex + 1} complete!`);
        this.exit();
        switchScreen(levelCompleteScreen);
    }
};
