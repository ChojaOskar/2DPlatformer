const editorScreen = {
    enter: function() {
        console.log("Entered editor screen.");
        const savedLevel = localStorage.getItem('customLevel');
        this.level = new Level(savedLevel ? JSON.parse(savedLevel) : this.createEmptyLevel());
        this.isMouseDown = false;

        this.keyDownHandler = this.handleKeyDown.bind(this);
        this.mouseDownHandler = this.handleMouseDown.bind(this);
        this.mouseUpHandler = this.handleMouseUp.bind(this);
        this.mouseMoveHandler = this.handleMouseMove.bind(this);

        window.addEventListener("keydown", this.keyDownHandler);
        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
    },
    exit: function() {
        console.log("Exiting editor screen.");
        window.removeEventListener("keydown", this.keyDownHandler);
        canvas.removeEventListener("mousedown", this.mouseDownHandler);
        canvas.removeEventListener("mouseup", this.mouseUpHandler);
        canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    },
    update: function() {
        // Editor logic is handled by mouse events
    },
    draw: function(ctx) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.level.draw(ctx);
        this.drawGrid(ctx);
        this.drawSaveButton(ctx);
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
    drawSaveButton: function(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(GAME_WIDTH - 120, 10, 100, 40);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("Save", GAME_WIDTH - 70, 35);
    },
    handleKeyDown: function(e) {
        if (e.key === "Escape") {
            this.exit();
            switchScreen(menuScreen);
        }
    },
    handleMouseDown: function(e) {
        if (e.offsetX > GAME_WIDTH - 120 && e.offsetX < GAME_WIDTH - 20 && e.offsetY > 10 && e.offsetY < 50) {
            this.saveLevel();
            return;
        }
        this.isMouseDown = true;
        this.setTileFromMouse(e);
    },
    handleMouseUp: function() {
        this.isMouseDown = false;
    },
    handleMouseMove: function(e) {
        if (this.isMouseDown) {
            this.setTileFromMouse(e);
        }
    },
    setTileFromMouse: function(e) {
        const col = Math.floor(e.offsetX / this.level.tileSize);
        const row = Math.floor(e.offsetY / this.level.tileSize);
        if (row >= 0 && row < this.level.tiles.length && col >= 0 && col < this.level.tiles[0].length) {
            this.level.tiles[row][col] = e.buttons === 1 ? 1 : 0; // Left-click to add, Right-click to erase (or any other button)
        }
    },
    saveLevel: function() {
        localStorage.setItem('customLevel', JSON.stringify(this.level.tiles));
        alert('Level saved!');
    },
    createEmptyLevel: function() {
        const rows = GAME_HEIGHT / this.level.tileSize;
        const cols = GAME_WIDTH / this.level.tileSize;
        const newLevel = [];
        for (let r = 0; r < rows; r++) {
            newLevel.push(new Array(cols).fill(0));
        }
        return newLevel;
    }
};
