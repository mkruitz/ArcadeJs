Crafty.c('Pad', {
    init: function() {
      this.requires('Grid, Canvas, Multiway, Solid, Collision')
          .multiway(10 * Game.overallSpeed, {RIGHT_ARROW: 0, LEFT_ARROW: 180})
          .stopOnSolids();
    },

    setSize: function (pad_size) {
        if(this.current_pad_size === 1) this.addComponent('pad_n');  
        
        return this;
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