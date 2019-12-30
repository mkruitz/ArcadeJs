var game_assets = {
    "sprites": {
      "assets/tile-sprites.png": {
        tile: 10,
        tileh: 10,
        map: {
          tile_solid: [0, 0, 2, 1],
          tile_single: [0, 1, 2, 1  ],
          tile_pid: [0, 2, 2, 1],
          tile_v_single: [3, 6, 1, 2],
          tile_mirror: [3, 0, 2, 2],
          tile_box: [3, 3, 2, 3]
        }
      }
    }
  };

Crafty.c('GenericTile', {
    init: function () {
      this.requires('Grid, Canvas, Solid, HorizontalCollision, HorizontalCollision, tile_single');//.crop(0, 0, Game.map_grid.tile.width * 2,  Game.map_grid.tile.height * 1);
    },

    fromCode: function (code) {
        let width = code[0] *  Game.map_grid.tile.width;
        let height = code[1] * Game.map_grid.tile.height;
        let sprite = this.spriteCode(code[2],code[3])

        this.setType(code[4],code[5])
  
        this.requires(sprite);
        //this.attr({w: width-1, h: height-1 })
        
        return this;
      },

    spriteCode: function (code1, code2) {
      if(code2 == 0) return "tile_pid";
      if(code2 == 1) return "tile_solid";
      if(code2 == 2) return "tile_single"; 
      if(code2 == 3) return "tile_v_single";  
      if(code2 == 4) return "tile_mirror";  
      if(code2 == 5) return "tile_box";  
        
      return "tile_pid";    
    },

    setType: function (code1, code2) {
        if(code1 === '1') 
          this.requires('Clear'); 
        if(code1 === '2')
          this.requires('Pid');      
    }
  });

Crafty.c('Clear', {
    init: function () {
      this.requires('Collision')
        .clearTile();
    },
  
    clearTile: function() {
      this.onHit('Solid', this.updateState);
  
      return this;
    },
  
    updateState: function(hits) {
      this.destroy();
    }
  });

Crafty.c('Pid', {
    init: function () {
      this.requires('Collision')
        .ballHit();
    },
  
    ballHit: function() {
      this.onHit('Solid', this.killBall);
  
      return this;
    },
  
    killBall: function(hits) {
      hits[0].obj.destroy()
    }
  });