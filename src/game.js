Game = {
  map_grid: {
    width:  64,
    height: 48,
    tile: {
      width:  10,
      height: 10
    }
  },

  overallSpeed: 10,

  width: function () {     return Game.map_grid.width * Game.map_grid.tile.width;  },
  height: function () {     return Game.map_grid.height * Game.map_grid.tile.height;  },

  start: function() {
    Crafty.init(Game.width(), Game.height());
    Crafty.background('#DDDDDD');
    Game.createWalls();
    Game.createTiles();

    Crafty.e('Pad, HorizontalCollision');
    let ball = Crafty.e('Ball');

    let v = ball.velocity();
    v.x = 5 * Game.overallSpeed;
    v.y = 5 * Game.overallSpeed;
  },

  createWalls: function() {
    for(let w = 0; w < Game.map_grid.width; w++) {
      for(let h = 0; h < Game.map_grid.height; h++) {
        const verticalWall = w === 0 || w === Game.map_grid.width -1;
        const horizontalWall = h === 0 || h === Game.map_grid.height -1;
        if(!horizontalWall && !verticalWall) {
          continue;
        }

        const wallType = 'Wall'
          + (horizontalWall ? ', HorizontalCollision': '')
          + (verticalWall ? ', VerticalCollision': '');

        // is Edge
        Crafty
          .e(wallType)
          .at(w, h);
      }
    }
  },

  createTiles: function() {
    Crafty.e('Tile').at(46,40);
    Crafty.e('Tile').at(50,35);
    Crafty.e('Tile, Clear').at(44,41).color('blue');
  }

};