Crafty.defineScene('Level', function(level) {
    Level.createWalls();
    Level.createTiles(level)
});

Level = {
    state: {
        bricks_to_clear: 0
    },

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
        Level.state.bricks_to_clear = 0;
        for(let h = 0; h < Game.map_grid.height-2; h++) {
          for(let w = 0; w < Game.map_grid.width-2; w++) {
            var brick = level[w + (h * (Game.map_grid.width-2))];
            if (brick != 0)
            {
              let strCode = brick.toString();
              if (strCode[5] === '8') {
                Game.ball = Crafty.e('Ball').at(w+1,h+1);
              } else if (strCode[5] === '7') {
                Crafty.e('Bonus').setType(strCode).at(w+1,h+1);
              } else if (strCode[5] === '9') {
                Crafty.e('Pad, HorizontalCollision').setSize(parseInt(strCode[3],10)).at(w+1,h+1);
              }
              else
              {
                if (strCode[5] != '0') {
                    Level.state.bricks_to_clear += 1;
                }
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
                Crafty.unbind(Level.MessageHandle); // can be done with Crafty.One it seems.
                action();
              }
          });
    },
    
    Start: function() {
        let v = Game.ball.velocity();
        v.x = 10 * Game.overallSpeed;
        v.y = 10 * Game.overallSpeed;
    },

    Stop: function() {
        let v = Game.ball.velocity();
        v.x = 0;
        v.y = 0;
     },

    DetectLevelComplete: function() {
        Level.ClearBrickHandler =  Crafty.bind("ClearBrick", function() {
            Level.state.bricks_to_clear -= 1;
            console.log("Brick cleared ", Level.state.bricks_to_clear);
            if(Level.state.bricks_to_clear === 0) {
              console.log("Game ended");
              Crafty.unbind(Level.ClearBrickHandler);
              Level.Stop();
            }
        });
    }
}