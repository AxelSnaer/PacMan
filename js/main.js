//#include math.js
//#include gameObject.js
//#include dot.js
//#include pacman.js
//#include game.js

function start() {
    Game.init();
    Game.newGameObject(new Pacman(40, 40));
}

document.addEventListener('DOMContentLoaded', start);