Crafty.c('GenericTile', {
    init: function () {
      this.requires('Grid, Solid, HorizontalCollision, HorizontalCollision');
    },

    fromCode: function (code) {
        let width = code[0];
        let height = code[1];
        let color = this.colorCode(code[2],code[3])

        this.setType(code[4],code[5])
  
        this.attr({w: Game.map_grid.tile.width * width, h: Game.map_grid.tile.height * height })
        this.color(color);
        
        return this;
      },

    colorCode: function (code1, code2) {
      if(code2 == 0) return "darkred";
      if(code2 == 1) return "black";
      if(code2 == 2) return "blue"; 
      if(code2 == 3) return "purple";  
        
      return "red";    
    },

    setType: function (code1, code2) {
        if(code1 === '1') 
          this.requires('Clear'); 
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
