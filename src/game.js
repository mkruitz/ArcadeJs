Game = {
  map_grid: {
    width:  64,
    height: 48,
    tile: {
      width:  10,
      height: 10
    }
  },

  width: function () {     return Game.map_grid.width * Game.map_grid.tile.width;  },
  height: function () {     return Game.map_grid.height * Game.map_grid.tile.height;  },

  start: function() {
    Crafty.init(Game.width(), Game.height());
    Crafty.background('#DDDDDD');
    Game.createWalls();

    Crafty.e('Pad');
  },

  createWalls: function() {
    for(let w = 0; w < Game.map_grid.width; w++) {
      for(let h = 0; h < Game.map_grid.height; h++) {
        if(
          w === 0 || w === Game.map_grid.width -1
          ||
          h === 0 || h === Game.map_grid.height -1
        ) {
          // is Edge
          Crafty.e('Wall').at(w, h);
        }
      }
    }
  }
};