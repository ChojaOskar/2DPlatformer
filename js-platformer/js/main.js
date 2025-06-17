/**
 * @file This is the main entry point for the game. It sets up the canvas, handles screen transitions, and contains the main game loop.
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

/**
 * The width of the game canvas.
 * @type {number}
 */
const GAME_WIDTH = 800;

/**
 * The height of the game canvas.
 * @type {number}
 */
const GAME_HEIGHT = 600;

/**
 * The currently active screen object (e.g., menuScreen, gameScreen).
 * @type {object}
 */
let currentScreen;

/**
 * Switches the current screen of the game.
 * It calls the exit method of the old screen and the enter method of the new screen.
 * @param {object} screen - The screen object to switch to.
 */
function switchScreen(screen) {
    if (currentScreen && currentScreen.exit) {
        currentScreen.exit();
    }
    currentScreen = screen;
    if (currentScreen && currentScreen.enter) {
        currentScreen.enter();
    }
}

/**
 * The main game loop. It calls the update and draw methods of the current screen
 * on each animation frame.
 */
function gameLoop() {
    if (currentScreen) {
        currentScreen.update();
        currentScreen.draw(ctx);
    }
    requestAnimationFrame(gameLoop);
}

/**
 * Initializes the game when the window has finished loading.
 * It loads all resources, loads player progress, sets the initial screen to the menu,
 * and starts the game loop.
 */
window.onload = async function() {
    await resourceManager.loadAll();
    progressManager.loadProgress();
    switchScreen(menuScreen);
    requestAnimationFrame(gameLoop);
};
