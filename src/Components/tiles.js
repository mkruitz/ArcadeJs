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
          this.addComponent('Clear');
          this.addComponent(GameElement.ScoreObject); 
        }
        if(code1 === '2')
          this.requires(GameElement.DeadlyObject);    
    }
  });

Crafty.c(GameElement.ScoreObject, {
});

Crafty.c('Clear', {
    init: function () {
      this.requires('Collision')
        .clearTile();
    },
  
    clearTile: function() {
      this.onHit('Solid', this.handleClearTile);
  
      return this;
    },
  
    handleClearTile: function(hits) {
      this.destroy();
      Crafty.trigger(GameEvent.Score, GameEvent.ScoreObject);
    }
  });

Crafty.c(GameElement.DeadlyObject, {
    init: function () {
      this.requires('Collision')
        .deadlyHit();
    },
  
    deadlyHit: function() {
      this.onHit('Solid', this.handleDeadlyHit);
      return this;
    },
  
    handleDeadlyHit: function(hits) {
      console.log('kill');
      let type = hits[0].obj.GameComponentType;
      hits[0].obj.destroy(); 
      Crafty.trigger(GameEvent.DeadlyHit, type);
    }
  });