class StartLevel extends Level {
    onKeyDown(key) {
        switch (key) {
            case ' ':
                Game.loadLevel(MainLevel);
                break;
        }
    }

    onDrawUI(ctx) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        
        let startText = 'Press space to start';
        let startTextSize = ctx.measureText(startText);

        ctx.fillText(startText, Game.width / 2 - startTextSize.width / 2, Game.height / 2 - 12);
    }
}