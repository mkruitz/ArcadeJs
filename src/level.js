Crafty.defineScene('Level', function(level) {
    Level.createWalls();
    Level.createTiles(level);
    Level.setupBallRespawn();
});

Level = {
    init: function(level) {
        Crafty.scene('Level', level); 
        Level.DetectLevelComplete();
        Level.ShowMessage("Get ready!", Level.Start);
        Level.activateGameToggle();
    },

    activateGameToggle: function() {
      Crafty.s("Controls").defineTriggerGroup("GameToggle", {
        mouseButtons: [Crafty.mouseButtons.LEFT],
        keys: [Crafty.keys.SPACE, Crafty.keys.LEFT]
      });
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
              if (strCode[5] === '8') {
                Crafty.e('Ball').at(w+1,h+1);
              } else if (strCode[5] === '7') {
                Crafty.e('Bonus').setType(strCode).at(w+1,h+1);
              } else if (strCode[5] === '9') {
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

    ShowMessage: function(message, action) {

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

        Level.MessageHandle = Crafty.bind("TriggerInputDown", function(data) {
            if (Level.Message && data.name === "GameToggle")
              {
                Level.Message.destroy();
                Level.Message = undefined;
                Crafty.unbind("TriggerInputDown"); 
                action();
              }
          });
    },
    
    Start: function() {
        let v =  Crafty(Crafty("Ball")[0]).velocity();
        v.x = 10 * Game.overallSpeed;
        v.y = 10 * Game.overallSpeed;

        Level.active = true;
    },

    Stop: function() {
        Level.active = false;
        
        let v = Crafty(Crafty("Ball")[0]).velocity();
        v.x = 0;
        v.y = 0;
       },

    DetectLevelComplete: function() {
        Level.ClearBrickHandler =  Crafty.bind("ClearBrick", function() {
            let scoreObjects = Crafty("ScoreObject")
            
            if(scoreObjects.length === 0) {
              console.log("Game ended");
              Crafty.unbind("ClearBrick");
              Level.Stop();
              Level.ShowMessage("Level complete!", Level.LevelStopped);
            }
        });
    },

    LevelStopped: function() {
        Crafty.trigger("LevelStopped");
        Crafty.unbind("LifeEvent");
    },

    setupBallRespawn: function() {
      let ball = Crafty(Crafty("Ball")[0]);
      Level.RespawnX = ball.gridX
      Level.RespawnY = ball.gridY;

      Level.respawnHandler =  Crafty.bind("LifeEvent", function(evenType) {
        if(evenType === "respawn") {
          console.log("create ball");
          let b = Crafty.e('Ball').at(Level.RespawnX, Level.RespawnY);

          let v =  b.velocity();
          v.x = 10 * Game.overallSpeed;
          v.y = 10 * Game.overallSpeed;
        }
      });
    }
}