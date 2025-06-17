class Level {
    constructor(levelData) {
        this.tileSize = 40;
        this.totalCoins = 0;
        this.enemies = [];
        this.playerStart = { x: 2, y: 12 }; // Default player start

        let tileData;
        if (levelData) {
            if (Array.isArray(levelData)) { // For backward compatibility with old level format
                // Create a deep copy immediately to avoid modifying the original LEVEL array
                tileData = levelData.map(row => [...row]);
                // Scan for player start in the copy
                for (let r = 0; r < tileData.length; r++) {
                    for (let c = 0; c < tileData[r].length; c++) {
                        if (tileData[r][c] === 7) {
                            this.playerStart = { x: c, y: r };
                            tileData[r][c] = 0; // Remove the tile from the copy, not the original
                        }
                    }
                }
            } else { // New format: { tiles: [...], playerStart: {x, y} }
                tileData = levelData.tiles;
                if (levelData.playerStart) {
                    this.playerStart = levelData.playerStart;
                }
            }
        } else {
            // Default level if none is provided
            tileData = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        }
        this.tiles = tileData.map(row => [...row]); // Create a deep copy

        for (let r = 0; r < this.tiles.length; r++) {
            for (let c = 0; c < this.tiles[r].length; c++) {
                if (this.tiles[r][c] === 3) {
                    this.totalCoins++;
                } else if (this.tiles[r][c] === 4) { // Enemy
                    this.enemies.push(new Enemy(c * this.tileSize, r * this.tileSize));
                }
            }
        }
    }

    draw(ctx, isEditor = false) {
        for (let r = 0; r < this.tiles.length; r++) {
            for (let c = 0; c < this.tiles[r].length; c++) {
                const tile = this.tiles[r][c];
                if (tile === 1) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 2) { // Goal tile
                    ctx.fillStyle = 'green';
                    ctx.fillRect(c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 3) { // Coin tile
                    ctx.fillStyle = 'yellow';
                    ctx.beginPath();
                    ctx.ellipse(c * this.tileSize + this.tileSize / 2, r * this.tileSize + this.tileSize / 2, this.tileSize / 4, this.tileSize / 2, 0, 0, 2 * Math.PI);
                    ctx.fill();
                } else if (tile === 4 && isEditor) { // Enemy placeholder for editor
                    ctx.fillStyle = 'red';
                    ctx.globalAlpha = 0.5;
                    ctx.fillRect(c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize);
                    ctx.globalAlpha = 1.0;
                } else if (tile === 5) { // Trampoline tile
                    ctx.fillStyle = 'purple';
                    ctx.fillRect(c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }
}
