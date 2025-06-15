class Level {
    constructor(levelData) {
        this.tileSize = 40;
        this.totalCoins = 0;
        this.enemies = [];
        if (levelData) {
            this.tiles = levelData.map(row => [...row]); // Create a deep copy
        } else {
            // Default level if none is provided
            this.tiles = [
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

        for (let r = 0; r < this.tiles.length; r++) {
            for (let c = 0; c < this.tiles[r].length; c++) {
                if (this.tiles[r][c] === 3) {
                    this.totalCoins++;
                } else if (this.tiles[r][c] === 4) { // Enemy
                    this.enemies.push(new Enemy(c * this.tileSize, r * this.tileSize));
                    this.tiles[r][c] = 0; 
                }
            }
        }
    }

    draw(ctx) {
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
                    ctx.fillRect(c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 5) { // Trampoline tile
                    ctx.fillStyle = 'purple';
                    ctx.fillRect(c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }
}
