class UserInterface extends GameObject {
    onDraw(ctx, frame) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Score: ${Game.state.score}`, 10, 25);
        ctx.fillText(`Lives: ${Game.state.lives}`, 330, 25);
    }
}