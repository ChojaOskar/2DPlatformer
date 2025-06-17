const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let currentScreen;

function switchScreen(screen) {
    if (currentScreen && currentScreen.exit) {
        currentScreen.exit();
    }
    currentScreen = screen;
    if (currentScreen && currentScreen.enter) {
        currentScreen.enter();
    }
}

function gameLoop() {
    if (currentScreen) {
        currentScreen.update();
        currentScreen.draw(ctx);
    }
    requestAnimationFrame(gameLoop);
}

window.onload = async function() {
    await resourceManager.loadAll();
    progressManager.loadProgress();
    switchScreen(menuScreen);
    requestAnimationFrame(gameLoop);
};
