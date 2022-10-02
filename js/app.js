const config = {
    player_width: 101,
    player_heigth: 171,
    player_move_width: 101,
    player_move_heigth: 83,
    map_width: 505,
    map_heigth: 606,
    extreme_point_left: -4,
    extreme_point_top: -15,
    start_position_x: 202,
    start_position_y: 400,
    min_speed: 100,
    max_speed: 500,
    rule_text: 'Your player should reach the water by avoiding bugs.',
    start_score: 0,
    win_scrore: 5,
};

const body = document.querySelector('body');

const Enemy = function(x, y, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.player = player;
    this.speed = Math.floor(Math.random() * (config.max_speed - config.min_speed) + config.min_speed);
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > config.map_width) {
        this.x = 0;
    }
    if(this.checkCollision()){
        if(this.player.score){
            this.player.score--;
            this.player.updateScore(this.player.score);
        }
        this.player.resetInitialPosition()
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function(){
    return (    this.player.x < this.x + config.player_width / 2  && 
                this.player.x + config.player_width / 2 > this.x && 
                this.player.y < this.y + config.player_move_heigth && 
                this.player.y > this.y
            )
}

const Player = function(x, y, ){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.score = config.start_score;
};

Player.prototype.update = function () {

};

Player.prototype.resetInitialPosition = function(){
    this.x = config.start_position_x;
    this.y = config.start_position_y;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.showInfoGame = function () {
    const section = document.createElement('section');
    section.classList.add('info');
    section.innerHTML = `   <span>${config.rule_text}</span>
                            <div class="score_wrapper"> Score: <span> ${ player.score } </span> / 5 </div>
                        `;
    body.append(section);
};

Player.prototype.updateScore = function (currentScore) {
    const scoreElem = document.querySelector('.score_wrapper span');
    scoreElem.textContent = currentScore;
}

const player = new Player(config.start_position_x, config.start_position_y);
player.showInfoGame();

const enemy1 = new Enemy(202, 145, player, );
const enemy2 = new Enemy(0, 220, player, );
const enemy3 = new Enemy(0, 50, player, );
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
        return;
    }
    if(player.y === config.extreme_point_top){
        setTimeout(() => {
            player.resetInitialPosition();
            if(player.score === config.win_scrore){
                alert('Congratulations, you won. Your score will be reset. You can play again, if you want)')
                player.score = config.start_score;
                player.updateScore(player.score);
            }
            else {
                player.score++;
                player.updateScore(player.score);
            }
         }, 100);
         return
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

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
