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

Crafty.c('Ball', {
  init: function() {
    this.requires('Grid, Canvas, Collision, Motion, Solid, ball_standard')
      .attr({w: Game.map_grid.tile.width, h: Game.map_grid.tile.height })
      .at(Game.map_grid.width /2, Game.map_grid.height /2)
      .bounceOnSolids();
  },

  bounceOnSolids: function() {
    this.onHit('Solid', this.changeDirection);

    return this;
  },

  changeDirection: function(hits) {
    let bounceVertical = false;
    let bounceHorizontal = false;

    for(let i = 0, l = hits.length; i < l; i++) {
      const hitObj = hits[i].obj;
      bounceVertical   |= hitObj.has('VerticalCollision');
      bounceHorizontal |= hitObj.has('HorizontalCollision');
    }

    const v = this.velocity();
    if(bounceVertical) {
      v.x = -v.x;
    }

    if(bounceHorizontal) {
      v.y = -v.y;
    }
  }
});
