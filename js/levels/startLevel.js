class StartLevel extends Level {
    onLoad() {
        // Exit fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    onKeyDown(key) {
        // Load the main level if the player presses the space bar
        switch (key) {
            case ' ':
                Game.loadLevel(MainLevel);
                break;
        }
    }

    onDrawUI(ctx) {
        // Draw the menu text

        ctx.fillStyle = '#ffffff';

        ctx.font = '38px Arial';
        drawCenteredText(ctx, 'PACMAN', Game.height / 2);
        
        ctx.font = '17px Arial';
        drawCenteredText(ctx, 'Press space or tap the screen to start', Game.height / 2 + 30);

        ctx.font = '12px Arial';
        drawCenteredText(ctx, `Highscore: ${Game.loadVar('highscore')}`, Game.height / 2 + 100);
    }

    onTap(pos) {
        // Load the main level if the player taps the screen
        Game.loadLevel(MainLevel);
    }
}