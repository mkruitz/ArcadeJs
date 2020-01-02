import 'phaser';
import { Levels } from './levels';
import { LevelLayout, LevelElements } from './level';
import { ElementCode, ElementCodeSolid, ElementTile } from './level-definition';

export default class Level extends Phaser.Scene
{   
    ball;
    gameStarted = false;

    levelLayout : LevelLayout;

    constructor ()
    {
        super('Traz - work from there');
        this.levelLayout = new LevelLayout(Levels.levelDimension);
    }

    preload ()
    {
        this.load.atlas('assets', 'assets/tile-sprites.png', 'assets/tile-sprites.json');
    }

    create ()
    {
        this.createTiles(Levels.LevelDemoAssets);
        
        this.ball = this.physics.add.image(50, 50, 'assets', 'ball').setCollideWorldBounds(true).setBounce(1);  

        this.input.keyboard.on('keydown', this.handleGameToggle, this);
        this.input.on('pointerup', this.handleGameToggle, this);
    }

    createTiles(level) {
        for(let h = 0; h < this.levelLayout.rows; h++) {
          for(let w = 0; w < this.levelLayout.colums; w++) {
            var brick = level[w + (h * this.levelLayout.colums)];
            if (brick != 0)
            {
              let element = new LevelElements(brick.toString());

              if (element.type === ElementCode.Ball) {
                //LevelUx.createBall(w+1,h+1);
              } else if (element.type === ElementCode.Bonus) {
                //Crafty.e('Bonus').setType(strCode).at(w+1,h+1);
              } else if (element.type === ElementCode.Pad) {
                //Crafty.e('Pad, HorizontalCollision').setSize(parseInt(strCode[3],10)).at(w+1,h+1);
              }
              else
              {
                console.log(w,h, this.levelLayout.coordX(w), this.levelLayout.coordY(h));
                this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', element.spriteCode()).setCollideWorldBounds(true)
              }
              
            }
          }
        }
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
    width: Levels.levelDimension.width * 10,
    height:  (Levels.levelDimension.height * 10)-4,
    scene: Level,
    physics: {
        default: 'arcade'
    }
};

const game = new Phaser.Game(config);
