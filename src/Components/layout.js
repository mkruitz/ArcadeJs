Crafty.c('Grid', {
  init: function() {
    this
      .requires('2D, Canvas, Color')
      .attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    });
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    this.gridX = x;
    this.gridY = y;
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  },
});

Crafty.c('Wall', {
  init: function () {
    this.requires('Grid, Solid')
      .color('#111111');
  }
});