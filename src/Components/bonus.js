Crafty.c('Bonus', {
  init: function () {
    this.requires('Grid, Collision, Canvas, bonus_pid')
        .ballHit();
  },

  setType: function(type) {
    return this;
  },

  ballHit: function() {
    this.hitbinding = this.onHit('Solid', this.triggerBonus);
    return this;
  },

  triggerBonus: function(hits) {
    console.log("Bonus!!!");
    Crafty.trigger("BonusPad", +1);
    this.destroy();
  }
});