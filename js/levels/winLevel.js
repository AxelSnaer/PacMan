class WinLevel extends Level {
    onLoad() {
        let highscore = Game.loadVar('highscore') ?? 0;
        if (Game.state.score > highscore) {
            Game.saveVar('highscore', Game.state.score);
        }
    }

    onKeyDown(key) {
        switch (key) {
            case ' ':
                Game.loadLevel(StartLevel);
                break;
        }
    }

    onDrawUI(ctx) {
        ctx.fillStyle = '#ffffff';
        
        ctx.font = '24px Arial';
        drawCenteredText(ctx, 'You Win!', Game.height / 2);
        
        ctx.font = '17px Arial';
        drawCenteredText(ctx, '[ Press space to continue ]', Game.height / 2 + 30);
    
        ctx.font = '12px Arial';
        drawCenteredText(ctx, `Score: ${Game.state.score}`, Game.height / 2 + 80);
        drawCenteredText(ctx, `Highscore: ${Game.loadVar('highscore')}`, Game.height / 2 + 100);
    }

    
}