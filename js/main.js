//#include math.js
//#include gameObject.js
//#include obstacle.js
//#include ghost.js
//#include dot.js
//#include powerPellet.js
//#include pacman.js
//#include game.js
//#include level.js

function start() {
    Game.init();
    Game.loadLevel(MainLevel);
}

document.addEventListener('DOMContentLoaded', start);