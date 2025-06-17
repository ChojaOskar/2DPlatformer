/**
 * @file Manages player progress, including completed levels and unlocking new levels.
 */

/**
 * The progress manager object. Handles loading, saving, and querying player progress.
 * @namespace progressManager
 */
const progressManager = {
    /**
     * The player's progress data.
     * @property {object} progress
     * @property {number[]} progress.completedLevels - An array of indices for completed levels.
     */
    progress: { completedLevels: [] }, 

    /**
     * Loads the player's progress from localStorage.
     */
    loadProgress: function() {
        const progressData = localStorage.getItem('playerProgress');
        if (progressData) {
            this.progress = JSON.parse(progressData);
            
            if (!Array.isArray(this.progress.completedLevels)) {
                this.progress.completedLevels = [];
            }
        } else {
            this.saveProgress();
        }
        console.log("Progress loaded:", this.progress);
    },

    /**
     * Saves the current player progress to localStorage.
     */
    saveProgress: function() {
        localStorage.setItem('playerProgress', JSON.stringify(this.progress));
    },

    /**
     * Checks if a specific level is unlocked.
     * @param {number} levelNumber - The 1-based number of the level to check.
     * @returns {boolean} True if the level is unlocked, false otherwise.
     */
    isLevelUnlocked: function(levelNumber) {
        if (levelNumber === 1) {
            return true; // Level 1 is always unlocked
        }
        // A level is unlocked if the previous level is complete.
        return this.progress.completedLevels.includes(levelNumber - 2);
    },

    /**
     * Checks if a specific level has been completed.
     * @param {number} levelIndex - The 0-based index of the level to check.
     * @returns {boolean} True if the level is complete, false otherwise.
     */
    isLevelComplete: function(levelIndex) {
        return this.progress.completedLevels.includes(levelIndex);
    },

    /**
     * Marks a level as complete and saves the progress.
     * @param {number} levelIndex - The 0-based index of the level to mark as complete.
     */
    markLevelAsComplete: function(levelIndex) {
        if (!this.isLevelComplete(levelIndex)) {
            this.progress.completedLevels.push(levelIndex);
            this.saveProgress();
            console.log(`Level ${levelIndex + 1} marked as complete.`);
        }
    },

    /**
     * Checks if all predefined levels have been completed.
     * @returns {boolean} True if all levels are complete, false otherwise.
     */
    areAllLevelsComplete: function() {
        return this.progress.completedLevels.length === LEVELS.length;
    },

    
    /**
     * Resets all player progress.
     */
    resetProgress: function() {
        this.progress.completedLevels = [];
        this.saveProgress();
        console.log("Progress has been reset.");
    }
};
