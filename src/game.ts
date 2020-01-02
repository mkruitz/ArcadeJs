import 'phaser';

export default class Level extends Phaser.Scene
{   
    ball;
    gameStarted = false;

    constructor ()
    {
        super('Traz - work from there');
    }

    preload ()
    {
        this.load.atlas('assets', 'assets/tile-sprites.png', 'assets/tile-sprites.json');
    }

    create ()
    {
        this.ball = this.physics.add.image(400, 500, 'assets', 'ball').setCollideWorldBounds(true).setBounce(1);  
   

        this.input.keyboard.on('keydown', this.handleGameToggle, this);

        this.input.on('pointerup', this.handleGameToggle, this);
    }

    handleGameToggle() {
        if(!this.gameStarted){
            this.gameStarted = true;
            this.ball.setVelocity(-75, -300);
        }
    }
}

const config = {
    type: Phaser.WEBGL,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Level,
    physics: {
        default: 'arcade'
    }
};

const game = new Phaser.Game(config);
