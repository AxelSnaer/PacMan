//#include math.js
//#include gameObject.js
//#include dot.js
//#include powerPellet.js
//#include pacman.js
//#include game.js

function start() {
    Game.init();
    Game.newGameObject(Pacman, 40, 40);

    for (let x = 0; x < 10; x++)
        for (let y = 0; y < 10; y++)
            Game.newGameObject(Dot, 100 + x * 25, 100 + y * 25);

    Game.newGameObject(PowerPellet, 75, 75);
    Game.newGameObject(PowerPellet, 350, 75);
    Game.newGameObject(PowerPellet, 350, 350);
    Game.newGameObject(PowerPellet, 75, 350);
}

document.addEventListener('DOMContentLoaded', start);