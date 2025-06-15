const progressManager = {
    progress: { completedLevels: [] }, // Default progress

    loadProgress: function() {
        const progressData = localStorage.getItem('playerProgress');
        if (progressData) {
            this.progress = JSON.parse(progressData);
            // Ensure completedLevels is an array, for safety with old data
            if (!Array.isArray(this.progress.completedLevels)) {
                this.progress.completedLevels = [];
            }
        } else {
            // If no progress is saved, use the default and save it.
            this.saveProgress();
        }
        console.log("Progress loaded:", this.progress);
    },

    saveProgress: function() {
        localStorage.setItem('playerProgress', JSON.stringify(this.progress));
    },

    isLevelUnlocked: function(levelIndex) {
        if (levelIndex === 0) {
            return true; // Level 1 is always unlocked
        }
        // A level is unlocked if the previous level is complete.
        return this.progress.completedLevels.includes(levelIndex - 1);
    },

    isLevelComplete: function(levelIndex) {
        return this.progress.completedLevels.includes(levelIndex);
    },

    markLevelAsComplete: function(levelIndex) {
        if (!this.isLevelComplete(levelIndex)) {
            this.progress.completedLevels.push(levelIndex);
            this.saveProgress();
            console.log(`Level ${levelIndex + 1} marked as complete.`);
        }
    },

    areAllLevelsComplete: function() {
        return this.progress.completedLevels.length === LEVELS.length;
    },

    // A function to reset progress for testing
    resetProgress: function() {
        this.progress.completedLevels = [];
        this.saveProgress();
        console.log("Progress has been reset.");
    }
};
