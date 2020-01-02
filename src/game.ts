import 'phaser';
import { Levels } from './levels';
import { LevelLayout, LevelElements } from './level';
import { ElementCode, ElementCodeSolid, ElementTile } from './level-definition';

export default class Level extends Phaser.Scene
{   
    ball;
    paddle;
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
                this.ball = this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', 'ball').setCollideWorldBounds(true).setBounce(1);  
              } else if (element.type === ElementCode.Bonus) {
                this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', 'bonus');  
              } else if (element.type === ElementCode.Pad) {
                  this.paddle = this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', 'pad_' + element.subType).setImmovable();
              }
              else
              {
                this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', element.spriteCode());
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
