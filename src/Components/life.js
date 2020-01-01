Crafty.c('Life', {
    init: function () {
      this.live = 3;
      this.bind("BallEvent", this.handleBallEvent);
    },


    handleBallEvent: function(eventType) {
      console.log("Ball event:" + eventType);
      if (Level.active && eventType == "remove"){
        let balls = Crafty("Ball");
        let nofBalls = balls.length;
        if (nofBalls === 0)
        {
          this.live -= 1;
        }

        if (this.live == 0){
          Crafty.trigger("LifeEvent", "dead");
          console.log("Game over");
        }
        else
        {
          Crafty.trigger("LifeEvent", "respawn");
        }
      }
    }
  });