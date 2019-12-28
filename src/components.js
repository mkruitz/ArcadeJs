Crafty.c('Grid', {
  init: function() {
    this
      .requires('2D, Canvas')
      .attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    });
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('2D, Canvas, Actor, Fourway, Color, Collision')
      .attr({w: Game.map_grid.tile.width * 3, h: Game.map_grid.tile.height / 2 })
      .fourway(5)
      .color('rgb(20, 75, 40)')
      .attr({x: 20, y: 20})
      .stopOnSolids();
  },

  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);

    return this;
  },

  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  }
});

Crafty.c('Wall', {
  init: function () {
    this.requires('Actor, Color, Grid, Solid')
      .color('#111111');
  }
});