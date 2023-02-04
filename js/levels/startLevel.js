class StartLevel extends Level {
    onLoad() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    onKeyDown(key) {
        switch (key) {
            case ' ':
                Game.loadLevel(MainLevel);
                break;
        }
    }

    onDrawUI(ctx) {
        ctx.fillStyle = '#ffffff';

        ctx.font = '38px Arial';
        drawCenteredText(ctx, 'PACMAN', Game.height / 2);
        
        ctx.font = '17px Arial';
        drawCenteredText(ctx, '[ Press space to start ]', Game.height / 2 + 30);

        ctx.font = '12px Arial';
        drawCenteredText(ctx, `Highscore: ${Game.loadVar('highscore')}`, Game.height / 2 + 100);
    }

    onTap(pos) {
        Game.loadLevel(MainLevel);
    }
}