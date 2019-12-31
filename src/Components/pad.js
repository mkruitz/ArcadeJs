Crafty.c('Pad', {
    init: function() {
      this.requires('Grid, Canvas, Multiway, Solid, Collision')
          .multiway(10 * Game.overallSpeed, {RIGHT_ARROW: 0, LEFT_ARROW: 180})
          .stopOnSolids();
      this.bind("BonusPad", function(size) {
           
           let newSize = this.current_pad_size + size;
           if (newSize < 0 ) newSize = 0;
           if (newSize > 3 ) newSize = 3;
           
           console.log("BonusPad:" + size + " "+ newSize + " " + this.current_pad_size);
           this.setSize(newSize);
        });
    },

    setSize: function (pad_size) {
        if(this.current_pad_size === 0) this.removeComponent('pad_s'); 
        if(this.current_pad_size === 1) this.removeComponent('pad_n');  
        if(this.current_pad_size === 2) this.removeComponent('pad_l');  
        if(this.current_pad_size === 3) this.removeComponent('pad_xl'); 
        this.current_pad_size = pad_size;
        if(this.current_pad_size === 0) this.addComponent('pad_s'); 
        if(this.current_pad_size === 1) this.addComponent('pad_n');  
        if(this.current_pad_size === 2) this.addComponent('pad_l');  
        if(this.current_pad_size === 3) this.addComponent('pad_xl');   
        
        console.log("BonusPad new type:" + this.current_pad_size);

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