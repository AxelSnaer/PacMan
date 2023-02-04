//#include utilities/math.js
//#include utilities/graphics.js
//#include utilities/stopwatch.js

//#include gameObject.js
//#include level.js
//#include game.js

//#include gameObjects/rigidbody.js
//#include gameObjects/obstacle.js
//#include gameObjects/ghost.js
//#include gameObjects/dot.js
//#include gameObjects/cherry.js
//#include gameObjects/powerPellet.js
//#include gameObjects/pacman.js

//#include levels/startLevel.js
//#include levels/mainLevel.js
//#include levels/gameOverLevel.js
//#include levels/winLevel.js

// Initializes the game and load a level
function start() {
    Game.init();
    Game.loadLevel(StartLevel);
}

// Call the start function once everything has loaded in
document.addEventListener('DOMContentLoaded', start);