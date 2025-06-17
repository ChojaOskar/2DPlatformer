/**
 * @file Manages loading of all game assets, including images, audio, and level data.
 */

/**
 * A manager for handling game resources.
 * @namespace resourceManager
 */
const resourceManager = {
    /**
     * Loads an image from a given source.
     * @param {string} src - The path to the image file.
     * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image element.
     */
    loadImage: function(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    },

    /**
     * Loads an audio file from a given source.
     * @param {string} src - The path to the audio file.
     * @returns {Promise<HTMLAudioElement>} A promise that resolves with the loaded audio element.
     */
    loadAudio: function(src) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => resolve(audio);
            audio.onerror = reject;
            audio.src = src;
        });
    },

    /**
     * Loads level data from a JSON file.
     * @param {string} src - The path to the level data JSON file.
     * @returns {Promise<object>} A promise that resolves with the parsed JSON level data.
     */
    loadLevelData: function(src) {
        return fetch(src).then(response => response.json());
    },

    /**
     * Loads all necessary game resources in parallel.
     * This includes images and audio files. It also handles errors during loading.
     * @returns {Promise<void>}
     */
    loadAll: async function() {
        console.log("Loading all resources...");
        try {
            const [background, menuMusic, jumpSound, coinSound, levelCompleteMusic, gameOverMusic, lifeLostSound, levelMusic, editorMusic] = await Promise.all([
                this.loadImage('assets/background.png'),
                this.loadAudio('assets/08. Main Menu (Medley).mp3'),
                this.loadAudio('assets/maro-jump-sound-effect_1.mp3'),
                this.loadAudio('assets/super-mario-coin-sound.mp3'),
                this.loadAudio('assets/06. Level Complete.mp3'),
                this.loadAudio('assets/GameOver.mp3'),
                this.loadAudio('assets/LostALife.mp3'),
                this.loadAudio('assets/01. Birabuto Kingdom.mp3'),
                this.loadAudio('assets/editor.mp3')
            ]);

            window.backgroundImage = background;
            window.menuMusic = menuMusic;
            window.jumpSound = jumpSound;
            window.coinSound = coinSound;
            window.levelCompleteMusic = levelCompleteMusic;
            window.gameOverMusic = gameOverMusic;
            window.lifeLostSound = lifeLostSound;
            window.levelMusic = levelMusic;
            window.editorMusic = editorMusic;

            console.log("All resources loaded.");
        } catch (error) {
            console.error("Failed to load resources:", error);
            // Here you could display a user-friendly error message on the screen
            alert("Error: Could not load game resources. Please check the console for details and refresh the page.");
        }
    }
};
