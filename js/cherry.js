class Cherry extends GameObject {
    onInit() {
        this.size = 6;
        this.addCollider(this.size * 2, this.size * 2);
    }

    onDraw(ctx, frame) {
        let paths = [
            'M206 466.1h77.8v81.2H206zM740.7 466.1h77.8v81.2h-77.8zM283.9 400.2h91.4v65.9h-91.4zM649.3 400.2h91.4v65.9h-91.4zM375.2 334.2h91.4v65.9h-91.4zM558 334.2h91.4v65.9H558zM466.6 46.1H558v288.2h-91.4z',
            'M128.2 579.5h155.7v358.7H128.2z',
            'M128.2 547.3h155.7v390.9H128.2z',
            'M10.6 665h390.9v155.7H10.6zM740.7 579.5h155.7v358.7H740.7z',
            'M740.7 547.3h155.7v390.9H740.7z',
            'M623.1 665H1014v155.7H623.1z',
        ];

        let colors = [
            '#35D335',
            '#E02D2D',
            '#E02D2D',
            '#E02D2D',
            '#E02D2D',
            '#E02D2D',
        ];
        
        ctx.scale(0.02, 0.02);
        for (let i = 0; i < paths.length; i++) {
            let path = new Path2D(paths[i]);
            ctx.fillStyle = colors[i];
            ctx.fill(path);
        }
    }

    onCollision(other) {
        if (!other.isOfType(Pacman))
            return;

        Game.state.score += 10;
        Game.level.destroyGameObject(this);
    }
}