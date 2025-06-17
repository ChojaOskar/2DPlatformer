const resourceManager = {
    loadImage: function(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    },
    loadAudio: function(src) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => resolve(audio);
            audio.onerror = reject;
            audio.src = src;
        });
    },
    loadLevelData: function(src) {
        return fetch(src).then(response => response.json());
    },
    loadAll: async function() {
        console.log("Loading all resources...");
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
    }
};
