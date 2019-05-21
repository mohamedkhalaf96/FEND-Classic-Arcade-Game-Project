
'use-strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {  
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Updates the enemies
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if(this.x >= 605) {
    this.x = -100;
  }
  // Calls the checkCollisions function
  this.checkCollisions();
};

// Renders the enemies
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
var Player = function(x, y, speed) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.score = 0;
  this.lives = 3;
};

// checkCollisions function
Enemy.prototype.checkCollisions = function() {
  // Needed variables
  let bugLeftX = this.x;
  let bugRightX = this.x + 101;
  let bugTopY = this.y + 75;
  let bugBottomY = this.y + 145;
  //if the bug collides with the player
  if(bugRightX >= player.x + 15 && bugRightX <= player.x + 85 || bugLeftX >= player.x + 15 && bugLeftX <= player.x + 85) {
    if(bugTopY >= player.y + 60 && bugTopY <= player.y + 140 || bugBottomY >= player.y + 60 && bugBottomY <= player.y + 140) {
      // Put the player back at the beggingin and take a live away
      player.x = 202;
      player.y = 405;
      player.lives -= 1;
    }
  }
};

// Updates the player
Player.prototype.update = function() {
  // If the player tries to go off the game board leave them where they are
  if(this.y < 0) {
    this.y = -10;
  }
  if(this.y >= 405)  {
    this.y = 405;
  }
  if(this.x < 0) {
    this.x = 0;
  }
  if(this.x > 404) {
    this.x = 404;
  }
  if(this.y <= -10) {
    this.score += 50;
    this.x = 202;
    this.y = 405;
  }
};

// Renders the player onto the game board
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles the input for the player movement
Player.prototype.handleInput = function(keyPress) {
  if(keyPress === 'left') {
    this.x -= 101;
  } else if(keyPress === 'up') {
    this.y -= 83;
  } else if(keyPress === 'right') {
    this.x += 101;
  } else {
    this.y += 83;
  }
};


//Event listener
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
