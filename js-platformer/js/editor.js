const editorScreen = {
    enter: function() {
        if (window.menuMusic) window.menuMusic.pause(); // Stop menu music
        if (window.editorMusic) {
            window.editorMusic.currentTime = 0;
            window.editorMusic.loop = true;
            window.editorMusic.play();
        }
        this.mode = 'menu'; // 'menu', 'editing', 'naming', or 'confirmingDelete'
        this.customLevels = JSON.parse(localStorage.getItem('customLevels')) || {};
        this.levelNames = Object.keys(this.customLevels);
        this.selectedLevelIndex = 0;
        this.selectedTile = 1; // Default to wall tile
        this.cursor = { x: 0, y: 0 };
        this.newLevelName = '';

        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },
    exit: function() {
        if (window.editorMusic) window.editorMusic.pause();
        console.log("Exiting editor screen.");
        window.removeEventListener("keydown", this.keyDownHandler);
    },
    update: function() {

    },
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        if (this.mode === 'menu') {
            this.drawMenu(ctx);
        } else if (this.mode === 'editing') {
            this.level.draw(ctx, true);
            this.drawGrid(ctx);
            this.drawTilePalette(ctx);
            this.drawPlayerStart(ctx);
            this.drawCursor(ctx);
        } else if (this.mode === 'naming') {
            this.drawNamingScreen(ctx);
        } else if (this.mode === 'confirmingDelete') {
            this.drawDeleteConfirmationScreen(ctx);
        }
    },
    drawMenu: function(ctx) {
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '40px Arial';
        ctx.fillText('Level Editor', GAME_WIDTH / 2, 100);

        ctx.font = '20px Arial';
        ctx.fillStyle = this.selectedLevelIndex === 0 ? 'yellow' : 'white';
        ctx.fillText('Create New Level', GAME_WIDTH / 2, 200);

        for (let i = 0; i < this.levelNames.length; i++) {
            ctx.fillStyle = (i + 1) === this.selectedLevelIndex ? 'yellow' : 'white';
            ctx.fillText(this.levelNames[i], GAME_WIDTH / 2, 250 + i * 40);
        }

        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Press Enter to select, D to delete, Esc to go back', GAME_WIDTH / 2, GAME_HEIGHT - 50);
    },
    drawGrid: function(ctx) {
        ctx.strokeStyle = '#555';
        for (let x = 0; x < GAME_WIDTH; x += this.level.tileSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, GAME_HEIGHT);
            ctx.stroke();
        }
        for (let y = 0; y < GAME_HEIGHT; y += this.level.tileSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(GAME_WIDTH, y);
            ctx.stroke();
        }
    },
    drawTilePalette: function(ctx) {
        const TILE_TYPES = [1, 2, 3, 4, 5, 7, 0]; // Wall, Goal, Coin, Enemy, Trampoline, Player, Erase
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, GAME_HEIGHT - 60, GAME_WIDTH, 60);
        for (let i = 0; i < TILE_TYPES.length; i++) {
            const tile = TILE_TYPES[i];
            const x = 20 + i * 60;
            const y = GAME_HEIGHT - 40;
            if (tile === this.selectedTile) {
                ctx.strokeStyle = 'yellow';
                ctx.lineWidth = 2;
                ctx.strokeRect(x - 5, y - 25, 50, 50);
            }
            this.drawTile(ctx, tile, x, y, 40);
        }
    },
    drawTile: function(ctx, tile, x, y, size) {
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        switch (tile) {
            case 1: ctx.fillStyle = 'blue'; ctx.fillRect(x, y-20, size, size); ctx.fillText('Wall', x, y + 30); break;
            case 2: ctx.fillStyle = 'green'; ctx.fillRect(x, y-20, size, size); ctx.fillText('Goal', x, y + 30); break;
            case 3: ctx.fillStyle = 'yellow'; ctx.beginPath(); ctx.arc(x + size/2, y, size/2, 0, Math.PI * 2); ctx.fill(); ctx.fillText('Coin', x, y + 30); break;
            case 4: ctx.fillStyle = 'red'; ctx.fillRect(x, y-20, size, size); ctx.fillText('Enemy', x, y + 30); break;
            case 5: ctx.fillStyle = 'purple'; ctx.fillRect(x, y-20, size, size); ctx.fillText('Trampoline', x, y + 30); break;
            case 7: ctx.fillStyle = 'cyan'; ctx.fillRect(x, y-20, size, size); ctx.fillText('Player', x, y + 30); break;
            case 0: ctx.fillStyle = 'black'; ctx.fillRect(x, y-20, size, size); ctx.fillText('Erase', x, y + 30); break;
        }
    },
    handleKeyDown: function(e) {
        if (this.mode === 'menu') {
            switch (e.key) {
                case 'ArrowUp':
                    this.selectedLevelIndex = (this.selectedLevelIndex - 1 + this.levelNames.length + 1) % (this.levelNames.length + 1);
                    break;
                case 'ArrowDown':
                    this.selectedLevelIndex = (this.selectedLevelIndex + 1) % (this.levelNames.length + 1);
                    break;
                case 'Enter':
                    this.selectLevel();
                    break;
                case 'd':
                case 'D':
                    if (this.selectedLevelIndex > 0) {
                        this.mode = 'confirmingDelete';
                    }
                    break;
                case 'Escape':
                    this.exit();
                    switchScreen(menuScreen);
                    break;
            }
        } else if (this.mode === 'editing') {
            this.handleEditorKeyDown(e);
        } else if (this.mode === 'naming') {
            this.handleNamingKeyDown(e);
        } else if (this.mode === 'confirmingDelete') {
            this.handleDeleteConfirmationKeyDown(e);
        }
    },
    handleEditorKeyDown: function(e) {
        switch (e.key) {
            case 'ArrowUp':
                if (this.cursor.y > 0) this.cursor.y--;
                break;
            case 'ArrowDown':
                if (this.cursor.y < this.level.tiles.length - 1) this.cursor.y++;
                break;
            case 'ArrowLeft':
                if (this.cursor.x > 0) this.cursor.x--;
                break;
            case 'ArrowRight':
                if (this.cursor.x < this.level.tiles[0].length - 1) this.cursor.x++;
                break;
            case 'p':
            case 'P':
                if (this.selectedTile === 7) { // Player Start
                    this.level.playerStart = { x: this.cursor.x, y: this.cursor.y };
                } else {
                    this.level.tiles[this.cursor.y][this.cursor.x] = this.selectedTile;
                }
                break;
            case 'Escape':
                // When in editing mode, find the current level's name and save its tiles.
                if (this.selectedLevelIndex > 0) {
                    const levelName = this.levelNames[this.selectedLevelIndex - 1];
                    if (levelName && this.level) {
                        this.customLevels[levelName] = {
                            tiles: this.level.tiles,
                            playerStart: this.level.playerStart
                        };
                        this.saveCustomLevels();
                    }
                }
                this.mode = 'menu';
                break;
            default:
                const keyMap = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 7, '7': 0 };
                if (keyMap[e.key] !== undefined) {
                    this.selectedTile = keyMap[e.key];
                }
                break;
        }
    },
    drawCursor: function(ctx) {
        const tileSize = this.level.tileSize;
        const x = this.cursor.x * tileSize;
        const y = this.cursor.y * tileSize;

        ctx.globalAlpha = 0.5;
        this.drawTile(ctx, this.selectedTile, x, y, tileSize);
        ctx.globalAlpha = 1.0;

        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, tileSize, tileSize);
    },
    selectLevel: function() {
        if (this.selectedLevelIndex === 0) { // Corresponds to 'Create New Level'
            this.mode = 'naming';
            this.newLevelName = '';
        } else { // Corresponds to selecting an existing level
            const levelName = this.levelNames[this.selectedLevelIndex - 1];
            if (levelName) {
                this.level = new Level(this.customLevels[levelName]);
                this.mode = 'editing';
            }
        }
    },

    drawNamingScreen: function(ctx) {
        // Draw a semi-transparent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Draw the input box
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '30px Arial';
        ctx.fillText('Enter New Level Name:', GAME_WIDTH / 2, 200);

        ctx.font = '40px Arial';
        ctx.fillStyle = 'yellow';
        ctx.fillText(this.newLevelName + '_', GAME_WIDTH / 2, 280); // Underscore for cursor

        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Press Enter to confirm, Escape to cancel.', GAME_WIDTH / 2, 350);
    },

    handleNamingKeyDown: function(e) {
        if (e.key === 'Enter') {
            if (this.newLevelName && !this.customLevels[this.newLevelName]) {
                const newLevelData = this.createEmptyLevel();
                this.customLevels[this.newLevelName] = newLevelData;
                this.levelNames.push(this.newLevelName);
                this.saveCustomLevels();

                this.level = new Level(newLevelData);
                this.selectedLevelIndex = this.levelNames.length;
                this.mode = 'editing';
            } else {
                if (!this.newLevelName) alert("Level name cannot be empty.");
                else alert("A level with this name already exists.");
            }
        } else if (e.key === 'Escape') {
            this.mode = 'menu';
        } else if (e.key === 'Backspace') {
            this.newLevelName = this.newLevelName.slice(0, -1);
        } else if (e.key.length === 1 && this.newLevelName.length < 20) {
            // Allow letters, numbers, and spaces
            if (e.key.match(/^[a-z0-9 ]$/i)) {
                this.newLevelName += e.key;
            }
        }
    },
    drawDeleteConfirmationScreen: function(ctx) {
        // Draw semi-transparent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        const levelName = this.levelNames[this.selectedLevelIndex - 1];

        // Draw confirmation text
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '30px Arial';
        ctx.fillText(`Delete '${levelName}'?`, GAME_WIDTH / 2, 240);

        ctx.font = '20px Arial';
        ctx.fillText('Yes (Enter) / No (Escape)', GAME_WIDTH / 2, 320);
    },

    handleDeleteConfirmationKeyDown: function(e) {
        if (e.key === 'Enter') {
            if (this.selectedLevelIndex > 0) {
                const levelName = this.levelNames[this.selectedLevelIndex - 1];
                if (levelName) {
                    delete this.customLevels[levelName];
                    this.levelNames.splice(this.selectedLevelIndex - 1, 1);
                    this.selectedLevelIndex = Math.max(0, this.selectedLevelIndex - 1);
                    this.saveCustomLevels();
                }
            }
            this.mode = 'menu';
        } else if (e.key === 'Escape') {
            this.mode = 'menu';
        }
    },
    saveCustomLevels: function() {
        localStorage.setItem('customLevels', JSON.stringify(this.customLevels));
    },
    createEmptyLevel: function() {
        const rows = GAME_HEIGHT / 40;
        const cols = GAME_WIDTH / 40;
        const newLevel = {
            tiles: [],
            playerStart: { x: 2, y: 12 } // Default start position
        };
        for (let r = 0; r < rows; r++) {
            newLevel.tiles.push(new Array(cols).fill(0));
        }
        return newLevel;
    },





    drawPlayerStart: function(ctx) {
        if (this.level && this.level.playerStart) {
            const x = this.level.playerStart.x * this.level.tileSize;
            const y = this.level.playerStart.y * this.level.tileSize;
            ctx.fillStyle = 'cyan';
            ctx.globalAlpha = 0.8;
            ctx.fillRect(x, y, this.level.tileSize, this.level.tileSize);
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('P', x + this.level.tileSize / 2, y + this.level.tileSize / 2 + 8);
        }
    },
};
