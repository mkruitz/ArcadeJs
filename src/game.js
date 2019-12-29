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
    
    Game.createLayout(levels.levelDimension)
    Game.createWalls();
    Game.createTiles(levels.Level2);

    Crafty.e('Pad, HorizontalCollision');
    let ball = Crafty.e('Ball');

    let v = ball.velocity();
    v.x = 10 * Game.overallSpeed;
    v.y = 10 * Game.overallSpeed;
  },

  createLayout: function(config) {
    Game.map_grid.width = config.width + 2;
    Game.map_grid.height = config.height + 2;
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

  createTiles: function(level) {
    for(let h = 0; h < Game.map_grid.height-2; h++) {
      for(let w = 0; w < Game.map_grid.width-2; w++) {
        var brick = level[w + (h * (Game.map_grid.width-2))];
        if (brick != 0)
        {
          Crafty.e('GenericTile').fromCode(brick.toString()).at(w+1,h+1)
        }
      }
    }

    /* Tile variants
    Crafty.e('GenericTile').fromCode('210100').at(1+1,1+1);
    Crafty.e('GenericTile').fromCode('210211').at(1+1,3+1);
    Crafty.e('GenericTile').fromCode('120311').at(1+1,4+1); 
    Crafty.e('GenericTile').fromCode('910020').at(1+1,4+1);
    */
  }

};