Crafty.c('Pad', {
    init: function() {
      this.requires('Grid, Canvas, Multiway, Solid, Collision')
          .multiway(10 * Game.overallSpeed, {RIGHT_ARROW: 0, LEFT_ARROW: 180})
          .stopOnSolids();
      this.bind("BonusPad", function(size) {
           
           let newSize = this.current_pad_size + size;
           if (newSize < 0 ) newSize = 0;
           if (newSize > 3 ) newSize = 3;
           
           this.setSize(newSize);
        });
    },

    setSize: function (pad_size) {
        this.removeComponent(this.currentType()); 
        this.current_pad_size = pad_size;
        let newPadType = this.currentType()
        this.addComponent(newPadType); 
        
        console.log("Pad set to type:" + newPadType);
        return this;
    },

    currentType: function() {
      return this.sizeToType(this.current_pad_size)
    },

    sizeToType: function(size) {
      switch(size)
      {
        case 0: return 'pad_s';
        case 1: return 'pad_n'
        case 2: return 'pad_l'
        case 3: return 'pad_xl'
      }
    },
  
    stopOnSolids: function() {
      this.onHit('Solid', this.stopMovement);
  
      return this;
    },
  
    stopMovement: function() {
      if (this._motionDelta) {
        this.x -= this._motionDelta.x;
        this.y -= this._motionDelta.y;
      }
    }
  });