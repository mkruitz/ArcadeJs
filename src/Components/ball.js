Crafty.c('Ball', {
  init: function() {
    this.requires('Grid, Canvas, Collision, Motion, Solid, ball_standard')
      .attr({w: Game.map_grid.tile.width, h: Game.map_grid.tile.height })
      .at(Game.map_grid.width /2, Game.map_grid.height /2)
      .bounceOnSolids();
    Crafty.trigger("BallEvent", "add");
  },

  remove: function() {
    console.log("ball removed");
  },

  bounceOnSolids: function() {
    this.onHit('Solid', this.changeDirection);

    return this;
  },

  changeDirection: function(hits) {
    const collisionHorVert = this.getCollisionHorVert(hits);
    const v = this.velocity();
    if(collisionHorVert.vertical) {
      v.x = -v.x;
    }

    if(collisionHorVert.horizontal) {
      v.y = -v.y;
    }
  },

  getCollisionHorVert: function(hits) {
    let intersect = { horizontal: false, vertical: false };
    for(let i = 0, l = hits.length; i < l; i++) {
      const hitObj = hits[i].obj;
      const hitIntersect = this.isIntersect(this, hitObj);
      intersect.horizontal = intersect.horizontal || hitIntersect.horizontal;
      intersect.vertical = intersect.vertical || hitIntersect.vertical;
    }

    return intersect;
  },

  isIntersect: function(a, b) {
    const aV = a.velocity();
    const bPos = b.pos();
    const steps = this.getMinimalStepSize(aV);
    const aPos = this.backtraceSteps(a.pos(), bPos, steps);

    const vertical = this.isIntersectStepped(aPos, bPos, steps, 'x');
    const horizontal = this.isIntersectStepped(aPos, bPos, steps, 'y');

    if(vertical && horizontal) {
      return { vertical: true, horizontal: true };
    }

    return {
      vertical: this.isIntersectStepped(aPos, bPos, steps, 'x'),
      horizontal: this.isIntersectStepped(aPos, bPos, steps, 'y')
    };
  },

  backtraceSteps: function(aPos, bPos, steps) {
    for(let i = 0, l = steps.steps; i < l; i++) {
      aPos._x -= steps.size.x;
      aPos._y -= steps.size.y;

      if(!this.intersectAB(aPos, bPos)) {
        return aPos;
      }
    }

    return aPos;
  },

  isIntersectStepped: function(aPos, bPos, steps, prop) {
    const aBefore = Object.assign({}, aPos);
    aBefore['_' + prop] += steps.size[prop];

    return this.intersectAB(aBefore, bPos);
  },

  getMinimalStepSize: function(v) {
    if(v.x > v.y) {
      const steps = Math.abs(v.x);
      return {
        size: {
          x: v.x / steps,
          y: v.y / steps
        },
        steps: steps
      };
    }

    const steps = Math.abs(v.y);
    return {
      size: {
        x: v.x / steps,
        y: v.y / steps
      },
      steps: steps
    }
  },

  intersectAB: function (rect, mbr) {
    return mbr._x < rect._x + rect._w && mbr._x + mbr._w > rect._x &&
      mbr._y < rect._y + rect._h && mbr._y + mbr._h > rect._y;
  }
});