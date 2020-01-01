Crafty.defineScene('Level', function(level) {
  LevelUx.createWalls();
  LevelUx.createTiles(level);
});

LevelUx = {
  drawLevel: function(level) {
    Crafty.scene('Level', level); 
  },

  createWalls: function() {
      for(let w = 0; w < Game.map_grid.width; w++) {
        for(let h = 0; h < Game.map_grid.height; h++) {
          const verticalWall = w === 0 || w === Game.map_grid.width -1;
          const horizontalWall = h === 0 || h === Game.map_grid.height -1;
          if(!horizontalWall && !verticalWall) {
            continue;
          }
  
          const wallType = 'Wall'
            + (horizontalWall ? ', HorizontalCollision': '')
            + (verticalWall ? ', VerticalCollision': '');
  
          // is Edge
          Crafty
            .e(wallType)
            .at(w, h);
        }
      }
  },
  
  createTiles: function(level) {
      for(let h = 0; h < Game.map_grid.height-2; h++) {
        for(let w = 0; w < Game.map_grid.width-2; w++) {
          var brick = level[w + (h * (Game.map_grid.width-2))];
          if (brick != 0)
          {
            let strCode = brick.toString();
            let type = strCode[2];
            if (type === ElementCode.Ball) {
              LevelUx.createBall(w+1,h+1);
            } else if (type === ElementCode.Bonus) {
              Crafty.e('Bonus').setType(strCode).at(w+1,h+1);
            } else if (type === ElementCode.Pad) {
              Crafty.e('Pad, HorizontalCollision').setSize(parseInt(strCode[3],10)).at(w+1,h+1);
            }
            else
            {
              Crafty.e('GenericTile').fromCode(strCode).at(w+1,h+1)
            }
            
          }
        }
      }
  },

  createBall: function(x, y) {
    Crafty.e(GameElement.Ball).at(x,y);
  },

  showMessage: function(message, action) {
    Level.Message = Crafty.e("2D, DOM, Text, Tween, Delay")
      .attr({ x: 0, y: Game.height() / 2, w: Game.width() })
      .text(message)
      .textColor("#FF0000")
      .textAlign( 'center')
      .textFont({
        size: "15px",
        weight: "bold"
      })
      .delay(
        function() {
          this.tween({ alpha: 0.5 }, 1000);
          this.one("TweenEnd", function() {
            this.tween({ alpha: 1 }, 1000);
          });
        },
        2000,
        -1
      );

    Crafty.bind("TriggerInputDown", function(data) {
        if (Level.Message && data.name === "GameToggle")
          {
            Level.Message.destroy();
            Level.Message = undefined;
            Crafty.unbind("TriggerInputDown"); 
            action();
          }
      });
  },
  
  balls: function(action) {
    for(let i = 0; i < Crafty("Ball").length; i++) {
      action(Crafty(Crafty("Ball")[i]));
    }
  },
  
  startBall: function() {
      let v =  Crafty(Crafty("Ball")[0]).velocity();
      v.x = 10 * Game.overallSpeed;
      v.y = 10 * Game.overallSpeed;

      Level.active = true;
  },

  stopBall: function() {
      Level.active = false;
      
      let v = Crafty(Crafty("Ball")[0]).velocity();
      v.x = 0;
      v.y = 0;
     },
  
  hasScoreObjects: function() {  
    let scoreObjects = Crafty("ScoreObject") 
    return scoreObjects.length > 0;
  }
}

Level = {
    demo: false,
    init: function(level) {    
        LevelUx.drawLevel(level);
        this.startLevel();
    },
    
    startLevel: function() {
      Level.setupBallRespawn();
      Level.detectLevelComplete();
      if (Level.demo){
        Level.stopLevel(true);
      } else {
        LevelUx.showMessage("Get ready!", function() {
          LevelUx.balls(LevelUx.startBall);
        });
      }
      Level.activateGameToggle();
    },

    stopLevel: function(success) {
      LevelUx.balls(LevelUx.stopBall);
      Crafty.unbind(GameEvent.LifeEvent);

      if (success)
        LevelUx.showMessage("Level complete!", Level.complete);
      else
        LevelUx.showMessage("Game over!", Level.fail);
    },

    complete: function() {
      Crafty.trigger(GameEvent.LevelComplete);
    },
  
    fail: function () { 
      Crafty.trigger(GameEvent.LevelFail);
    },

    activateGameToggle: function() {
      Crafty.s("Controls").defineTriggerGroup("GameToggle", {
        mouseButtons: [Crafty.mouseButtons.LEFT],
        keys: [Crafty.keys.SPACE, Crafty.keys.LEFT]
      });
    },

    detectLevelComplete: function() {
        Crafty.bind(GameEvent.Score, function() {   
            if(!LevelUx.hasScoreObjects()) {
              Crafty.unbind(GameEvent.Score);
              Level.stopLevel(true);
            }
        });
    },

    setupBallRespawn: function() {
      // Currently ony one start ball support
      let ball = Crafty(Crafty("Ball")[0]);
      Level.RespawnX = ball.gridX
      Level.RespawnY = ball.gridY;

      Crafty.bind(GameEvent.LifeEvent, function(evenType) {
        if(evenType === LifeEvent.NewLife) {
          console.log("Level: Respawn ball");
          LevelUx.createBall(Level.RespawnX, Level.RespawnY);
          LevelUx.balls(LevelUx.startBall);
        }

        if(evenType === LifeEvent.Dead) {
          Level.stopLevel(false);
        }
      });
    }
}