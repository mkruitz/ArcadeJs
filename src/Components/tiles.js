Crafty.c('GenericTile', {
    init: function () {
      this.requires('Grid, Canvas, Solid, HorizontalCollision, HorizontalCollision');
    },

    fromCode: function (code) {
        this.setType(code[2],code[3]);

        let sprite = this.spriteCode(code[2],code[3],code[4]);
        this.requires(sprite);
        
        return this;
      },

    spriteCode: function (type, subType, colorCode) {
      if(type === ElementCode.Solid)
      {
        if(subType === ElementCodeSolid.Brick) return "tile_solid";
        if(subType === ElementCodeSolid.Pid) return "tile_pid";
        if(subType === ElementCodeSolid.Spacebox) return "tile_box";
      }

      if(type === ElementCode.Passthrough) return "tile_mirror";  
      
      if(type === ElementCode.Tile)
      {
        let direction = "x";
        if(subType === ElementTile.Horizontal) direction = "h"; 
        if(subType === ElementTile.Vertical) direction = "v"; 


        let code = "tile_" + direction + "_single_" + colorCode;
        console.log(code);
        return code;
      }
      console.log("UnkownType", type, subType )
    },

    setType: function (type, subType) {
        if(type === ElementCode.Tile) 
        {
          this.addComponent('Clear');
          this.addComponent(GameElement.ScoreObject); 
        }
        if(type === ElementCode.Solid && subType === ElementCodeSolid.Pid)
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