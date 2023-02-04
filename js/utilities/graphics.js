// Function to draw text at the center of the screen
function drawCenteredText(ctx, text, yLevel) {
    let size = ctx.measureText(text);
    ctx.fillText(text, Game.width / 2 - size.width / 2, yLevel);
}