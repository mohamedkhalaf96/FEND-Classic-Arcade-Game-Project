'use-strict';
/* Engine.js */
var Engine = (function (global) {
  // Define the variables I will need
  var doc = global.document;
  var win = global.window;
  var canvas = doc.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var gameState = "play";
  var lastTime;

  // canvas dimensions
  canvas.width = 505;
  canvas.height = 605;

  // append the canvas to the document
  doc.body.appendChild(canvas);

  // dodument selectors
  var restartBtn = document.querySelector('.restart');

  // event listeners
  
  restartBtn.addEventListener('click', function() {
    reset();
  });
  

  // Initializes the game engine
  function init() {
    reset();
    lastTime = Date.now();
    main();
  }

  var allEnemies = [];

  // Resets the game
  function reset() {
    gameState = 'play';
    allEnemies = [];
    var bugs = 4;
    var randBugSpeed = function randSpeed(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Puts new enemies into the allEnemies array
    for(var i = 0; i < bugs; i++) {
      if(i === 0) {
        allEnemies.push(new Enemy(-110, 61, randBugSpeed(100, 200)));
      } else if(i === 1) {
        allEnemies.push(new Enemy(-210, 144, randBugSpeed(100, 200)));
      } else if(i === 2) {
        allEnemies.push(new Enemy(-150, 227, randBugSpeed(100, 200)));
      } else {
        allEnemies.push(new Enemy(-170, 310, randBugSpeed(100, 200)));
      }
    }
    // Instantiates a new player
    player = new Player(202, 405, 100);
  }
  
  // The heart of the game engine
  function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    if(player.lives === 0) {
      gameState = 'game over';
    }
    update(dt);
    render();      
    lastTime = now;
    win.requestAnimationFrame(main);
  }

  // Update all enemies and the player
  function update(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
    player.update();
  }

  // Renders the game board
  function render() {
    var rowImages = [
      'images/water-block.png',
      'images/stone-block.png',
      'images/stone-block.png',
      'images/stone-block.png',
      'images/stone-block.png',
      'images/grass-block.png',
    ];
    var numRows = 6;
    var numCols = 5;
    var row;
    var col;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    // Renders the players score and lives
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.fillText('Lives: ' + player.lives, 50, 20);
    ctx.fillText("Score: " + player.score, 350, 20);

    // Test if the game is over, if it is run gameOver function if not keep going
    if(gameState == 'game over') {
      console.log('render game over: ' + gameState);
      gameOver();
    } else {
      renderEntities();
    }
  }

  // gameOver function, will run when the player runs out of lives
  function gameOver() {
    ctx.fillStyle = "brown";
    ctx.font = "28px Helvetica";
    ctx.fillText("Game Over", 170, 300);
    ctx.fillText('Click "Restart" to restart the game', 40, 350);
  }

  // Renders all the enemis and the player onto the game board
  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
  }

  // Loads all of the resources
  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png'
  ]);

  Resources.onReady(init);

  global.ctx = ctx;
})(this);