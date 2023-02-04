class WinLevel extends Level {
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
        // Load the main menu if the player presses the space bar
        switch (key) {
            case ' ':
                Game.loadLevel(StartLevel);
                break;
        }
    }

    onDrawUI(ctx) {
        // Draw the menu text
        
        ctx.fillStyle = '#ffffff';
        
        ctx.font = '24px Arial';
        drawCenteredText(ctx, 'You Win!', Game.height / 2);
        
        ctx.font = '17px Arial';
        drawCenteredText(ctx, '[ Press space to continue ]', Game.height / 2 + 30);
    
        ctx.font = '12px Arial';
        drawCenteredText(ctx, `Score: ${Game.state.score}`, Game.height / 2 + 80);
        drawCenteredText(ctx, `Highscore: ${Game.loadVar('highscore')}`, Game.height / 2 + 100);
    }

    onTap(pos) {
        // Load the main menu if the player taps the screen
        Game.loadLevel(StartLevel);
    }
}