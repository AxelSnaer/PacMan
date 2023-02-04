class GameOverLevel extends Level {
    onLoad() {
        // Update the highscore
        let highscore = Game.loadVar('highscore') ?? 0;
        if (Game.state.score > highscore) {
            Game.saveVar('highscore', Game.state.score);
        }

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
        
        ctx.font = '24px Arial';
        drawCenteredText(ctx, 'Game Over', Game.height / 2);
        
        ctx.font = '17px Arial';
        drawCenteredText(ctx, 'Press space or tap the screen to restart', Game.height / 2 + 30);
    
        ctx.font = '12px Arial';
        drawCenteredText(ctx, `Score: ${Game.state.score}`, Game.height / 2 + 80);
        drawCenteredText(ctx, `Highscore: ${Game.loadVar('highscore')}`, Game.height / 2 + 100);
    }

    onTap(pos) {
        // Load the main level if the player taps the screen
        Game.loadLevel(MainLevel);
    }
}