import 'phaser';
import { Levels } from './levels';
import { LevelLayout, LevelElement } from './level';
import { ElementCode } from './level-definition';

export default class Level extends Phaser.Scene
{   
    ball;
    paddle;
    gameStarted = false;

    levelLayout : LevelLayout;
    cursors;

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
        

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            if (this.ball.getData('onPaddle'))
            {
                this.ball.x = this.paddle.x;
            }

        }, this);

        this.input.keyboard.on('keydown', this.handleGameToggle, this);
        this.input.on('pointerup', this.handleGameToggle, this);
    }

    createTiles(level) {
        for(let h = 0; h < this.levelLayout.rows; h++) {
          for(let w = 0; w < this.levelLayout.colums; w++) {
            var brick = level[w + (h * this.levelLayout.colums)];
            if (brick != 0)
            {
              let element = new LevelElement(brick.toString());

              if (element.type === ElementCode.Ball) {
                this.ball = this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', 'ball').setCollideWorldBounds(true).setBounce(1);  
              } else if (element.type === ElementCode.Bonus) {
                this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', 'bonus');  
              } else if (element.type === ElementCode.Pad) {
                  this.paddle = this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', 'pad_' + element.subType).setImmovable();
              }
              else
              {
                this.addElement(w,h,element);
               
              }
              
            }
          }
        }
    }  
    
    addElement(x,y,element: LevelElement)
    {
     this.bounceObjects.create(this.levelLayout.coordX(x)+(this.width(element)/2), 
                                this.levelLayout.coordY(y)+(this.height(element)/2), 
                                'assets', element.spriteCode());
    }

    width(element) { return element.colums * this.levelLayout.tile.width;  }
    height(element) { return element.rows * this.levelLayout.tile.height;  }


    handleGameToggle() {
        if(!this.gameStarted){
            this.gameStarted = true;
            this.ball.setVelocity(-75, -300);
        }
    }

    handleCursor(cursors) {
        if (cursors.left.isDown)
        {
            this.paddle.setVelocityX(-160);
        
            //this.paddle.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this.paddle.setVelocityX(160);
        
            //this.paddle.anims.play('right', true);
        }
        else
        {
            this.paddle.setVelocityX(0);
        
            //this.paddle.anims.play('turn');
        }
    }

    update ()
    {
        this.handleCursor(this.cursors);
    }
}

const config = {
    type: Phaser.WEBGL,
    backgroundColor: '#125555',
    width: Levels.levelDimension.width * 10,
    height:  (Levels.levelDimension.height * 10),
    scene: Level,
    physics: {
        default: 'arcade'
    }
};

const game = new Phaser.Game(config);
