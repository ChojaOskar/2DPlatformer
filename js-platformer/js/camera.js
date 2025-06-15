const camera = {
    y: 0,
    levelHeight: 0,

    init: function(level) {
        this.levelHeight = level.tiles.length * level.tileSize;
    },

    update: function(player) {
        // Center camera on player, with clamping to level boundaries
        const targetY = player.y - (GAME_HEIGHT / 2);
        this.y = Math.max(0, Math.min(targetY, this.levelHeight - GAME_HEIGHT));
    }
};
