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
    
    Game.createLayout(levels.levelDimension)
    
    Crafty.init(Game.width(), Game.height());
    Crafty.load(game_assets);
    Crafty.background('#DDDDDD');
    Game.handleLevelCompleted();
    Game.handleLevelFailed();

    Level.life = Crafty.e('Life');
    Level.init(levels.LevelSingleHitComplete);
  },

  createLayout: function(config) {
    Game.map_grid.width = config.width + 2;
    Game.map_grid.height = config.height + 2;
  },

  handleLevelCompleted: function() {
    Crafty.bind("LevelComplete", function() {
      console.log("Start new level");
      Level.init(levels.Level1);
    }); 
  },

  handleLevelFailed: function() {
    Crafty.bind("LevelFailed", function() {
      console.log("Restart Game");
      Level.init(levels.Level1);
    }); 
  }
};