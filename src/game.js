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

    Level.demo = levels.GameDemoMode;
    Game.currentLevel = 0;

    Level.init(Game.currentLevelConfig());
  },

  currentLevelConfig: function() {
    return levels[levels[levels.GameLevels][Game.currentLevel]];
  },

  createLayout: function(config) {
    Game.map_grid.width = config.width + 2;
    Game.map_grid.height = config.height + 2;
  },

  handleLevelCompleted: function() {
    Crafty.bind(GameEvent.LevelComplete, function() {
      console.log("Start new level");
      Game.currentLevel += 1;

      if (Game.currentLevel >= levels[levels.GameLevels].length) Game.currentLevel =0;

      Level.init(Game.currentLevelConfig());
    }); 
  },

  handleLevelFailed: function() {
    Crafty.bind(GameEvent.LevelFail, function() {
      console.log("Restart Game");
      Game.currentLevel = 0;
      Level.life.destroy();
      Level.life = Crafty.e('Life');

      Level.init(Game.currentLevelConfig());
    }); 
  }
};