Crafty.c('GenericTile', {
    init: function () {
      this.requires('Grid, Canvas, Solid, HorizontalCollision, HorizontalCollision');
    },

    fromCode: function (code) {
        this.setType(code[4],code[5]);

        let sprite = this.spriteCode(code[2],code[3]);
        this.requires(sprite);
        
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
        {
          this.requires('Clear, ScoreObject'); 
        }
        if(code1 === '2')
          this.requires('Pid');    
    }
  });

Crafty.c('ScoreObject', {
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
      Crafty.trigger("ClearBrick");
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
      console.log('kill');
      // on destroy doesnot remove entity from registration
      hits.forEach(hit => { 
        hit.obj.isActive = false;
        hit.obj.destroy(); 
      });
    }
  });