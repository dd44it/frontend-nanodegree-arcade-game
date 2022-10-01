const config = {
    player_width: 101,
    player_heigth: 171,
    player_move_width: 101,
    player_move_heigth: 83,
    map_width: 505,
    map_heigth: 606,
    extreme_point_left: -4,
    extreme_point_top: -15,
}

// Enemies our player must avoid
const Enemy = function(x, y, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


const Player = function(x, y, ){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function () {


}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

const player = new Player(400, 400);

const enemy1 = new Enemy(30, 120, 60, 'images/enemy-bug.png', player);
const enemy2 = new Enemy(15, 220, 30, 'images/enemy-bug.png', player);
const enemy3 = new Enemy(0, 50, 20, 'images/enemy-bug.png', player);
const allEnemies = [enemy1, enemy2, enemy3];

function checkCollisions(player){
    if(player.x + config.player_width >= config.map_width){
        player.x -= config.player_move_width;
    }
    else if(player.x < config.extreme_point_left){
        player.x += config.player_move_width;
    }
    else if(player.y + config.player_heigth >= config.map_heigth){
        player.y -= config.player_move_heigth;
    }
    else if(player.y < config.extreme_point_top){
        player.y += config.player_move_heigth;
    }
}

Player.prototype.handleInput = function(key) {
    this.update()
    switch(key){
        case 'left':
            this.x -= config.player_move_width;
            checkCollisions(this)
            break;
        case 'right':
            this.x += config.player_move_width;
            checkCollisions(this)
            break;
        case 'up':
            this.y -= config.player_move_heigth;
            checkCollisions(this)
            break;
        case 'down':
            this.y += config.player_move_heigth;
            checkCollisions(this)
            break;
    };
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
