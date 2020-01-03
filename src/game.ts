import 'phaser';
import { Levels } from './levels';
import { LevelLayout, LevelElement } from './level';
import { ElementCode } from './level-definition';

export default class Level extends Phaser.Scene
{   
    ball;
    paddle;
    bounceObjects;

    respawnX;
    respawnY;

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
        this.bounceObjects = this.physics.add.staticGroup();

        this.createTiles(Levels.LevelDemoAssets);
        
        this.physics.add.collider(this.ball, this.bounceObjects, this.hitBounceObject, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

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


    hitBounceObject(ball, bounceObject) {
        if (bounceObject.getData('isDeadly'))
           this.resetBall();
        if (bounceObject.getData('isRemovable'))
           bounceObject.disableBody(true, true);
    }

    hitDeadlyElement(ball, deadlyObject) {
       
    }
    
   
    hitPaddle (ball, paddle)
    {
        var diff = 0;

        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
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
                this.respawnX = this.ball.x;
                this.respawnY = this.ball.y;
                   
            
            } else if (element.type === ElementCode.Bonus) {
                this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', 'bonus');  
              } else if (element.type === ElementCode.Pad) {
                  this.paddle = this.physics.add.image(this.levelLayout.coordX(w), this.levelLayout.coordY(h), 'assets', 'pad_' + element.subType).setImmovable();
              }
              else
              {
                var object = this.addElement(w,h,element);
                object.setData('isDeadly', element.isDeadly());
                object.setData('isRemovable', element.isRemovable());
                object.setData('isSolid', element.isSolid());
              }
              
            }
          }
        }
    }  
    
    addElement(x,y,element: LevelElement)
    {
      return this.bounceObjects.create(this.levelLayout.coordX(x)+(this.width(element)/2), 
                                this.levelLayout.coordY(y)+(this.height(element)/2), 
                                'assets', element.spriteCode());
    }

    width(element) { return element.colums * this.levelLayout.tile.width;  }
    height(element) { return element.rows * this.levelLayout.tile.height;  }


    handleGameToggle() {
        if(!this.gameStarted){
            this.gameStarted = true;
            this.resetBall();
        }
    }

    resetBall()
    {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.respawnX ,this.respawnY);
        this.ball.setVelocity(-75, -300);
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
