Crafty.c('Life', {
    init: function () {
      this.lives = 3;
      this.bind(GameEvent.DeadlyHit, this.handleBallEvent);
    },

    handleBallEvent: function(componentType) {
      if(componentType == GameElement.Ball){
       this.updateLives();
      }
    },

    updateLives: function(eventType) {
      let nofBalls = Crafty(GameElement.Ball).length;

      if (nofBalls === 0)
      {
        this.lives -= 1;
        this.notify();
      }
    }, 

    notify: function(eventType) {
      if (this.lives === 0){
        console.log("No more lives");
        Crafty.trigger(GameEvent.LifeEvent, LifeEvent.Dead  );
      }
      else
      {
        Crafty.trigger(GameEvent.LifeEvent, LifeEvent.NewLife);
      }
    }

  });