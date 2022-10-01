const config = {
    player_width: 101,
    player_heigth: 171,
    player_move_width: 101,
    player_move_heigth: 83,
    map_width: 505,
    map_heigth: 606,
    extreme_point_left: -4,
    extreme_point_top: -15,
    // find_center_pos_x: function() { return (this.map_width - this.player_width) / 2 },
    start_position_x: 202,
    start_position_y: 400,
    min_speed: 100,
    max_speed: 500,
};



// Enemies our player must avoid
const Enemy = function(x, y, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.player = player;
    this.speed = Math.floor(Math.random() * (config.max_speed - config.min_speed) + config.min_speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > config.map_width) {
        this.x = 0;
    }
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
};

Player.prototype.update = function () {


};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player(config.start_position_x, config.start_position_y);

const enemy1 = new Enemy(30, 120, 60, 'images/enemy-bug.png', player);
const enemy2 = new Enemy(15, 220, 30, 'images/enemy-bug.png', player);
const enemy3 = new Enemy(0, 50, 20, 'images/enemy-bug.png', player);
const allEnemies = [enemy1, enemy2, enemy3];

function checkCollisionsWalls(player){
    if(player.x + config.player_width > config.map_width){
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
};

Player.prototype.handleInput = function(key) {
    this.update()
    switch(key){
        case 'left':
            this.x -= config.player_move_width;
            checkCollisionsWalls(this)
            break;
        case 'right':
            this.x += config.player_move_width;
            checkCollisionsWalls(this)
            break;
        case 'up':
            this.y -= config.player_move_heigth;
            checkCollisionsWalls(this)
            break;
        case 'down':
            this.y += config.player_move_heigth;
            checkCollisionsWalls(this)
            break;
    }
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
