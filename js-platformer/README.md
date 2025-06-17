# JavaScript Platformer with Level Editor

This project is a classic 2D platformer game built with pure JavaScript, HTML5 Canvas, and CSS. It features a fully functional, in-browser level editor that allows you to create, save, and play your own custom levels.

## Features

- **Classic Platformer Gameplay**: Run, jump, collect coins, and avoid enemies.
- **Multiple Levels**: Includes several predefined levels of increasing difficulty.
- **In-Browser Level Editor**: Create your own levels directly in the browser.
    - Place walls, coins, enemies, trampolines, and the player start position.
    - Save your creations to your browser's `localStorage`.
    - Name, load, and delete your custom levels.
- **Keyboard Controls**: Fully playable using only the keyboard.
- **Sound and Music**: Background music and sound effects for an immersive experience.

## Getting Started

### Prerequisites

- A modern web browser that supports HTML5 Canvas and JavaScript (e.g., Chrome, Firefox, Edge).
- A local web server to serve the project files. The game will not run correctly if you open `index.html` directly from the file system due to browser security restrictions (CORS policy).

### Installation & Running

1.  **Clone the repository or download the source code.**

2.  **Navigate to the project directory** in your terminal.

3.  **Start a local web server.** A simple way to do this is with Python's built-in HTTP server. If you have Python installed, run one of the following commands:

    ```bash
    # For Python 3
    python -m http.server

    # For Python 2
    python -m SimpleHTTPServer
    ```

4.  **Open your web browser** and navigate to the address provided by the server (usually `http://localhost:8000`).

## How to Play

- **Arrow Keys**: Move left and right.
- **Spacebar**: Jump.

## How to Use the Level Editor

1.  **From the Main Menu**, select "Level Editor" and press **Enter**.
2.  **In the Editor Menu**, you can:
    - **Create New Level**: Start with a blank canvas.
    - **Edit Existing Level**: Select one of your previously saved levels to modify.
    - **Delete Level**: Select a level and press **D** to delete it (a confirmation screen will appear).
3.  **Editing a Level**:
    - **Arrow Keys**: Move the cursor around the grid.
    - **Z / X**: Cycle through the available tiles in the palette (shown at the bottom).
    - **Spacebar**: Place the selected tile at the cursor's position.
    - **S**: Save your level. You will be prompted to enter a name.
    - **Escape**: Return to the editor menu.

### Tile Types

- **0**: Empty Space
- **1**: Wall / Platform
- **2**: Goal (reach to complete the level)
- **3**: Coin
- **4**: Enemy
- **5**: Trampoline
- **6**: Spike
- **7**: Player Start Position (cyan block)
