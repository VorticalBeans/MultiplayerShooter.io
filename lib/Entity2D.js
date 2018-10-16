/**
 * @fileoverview This is a wrapper class for 3D entities.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../shared/Util');

const DIMENSIONS = 2;

/**
 * Constructor for an Entity2D.
 * @constructor
 * @param {Array<number>} position The position of the Entity2D
 * @param {Array<number>} velocity The velocity of the Entity2D
 * @param {Array<number>} acceleration The acceleration of the Entity2D
 * @param {number} orientation The orientation of the Entity2D (radians)
 * @param {number} mass The mass of the Entity2D
 * @param {number} hitbox The radius of the Entity2D's circular hitbox
 */
function Entity2D(position, velocity, acceleration, orientation, mass, hitbox) {
  this.position = position || [0, 0];
  this.velocity = velocity || [0, 0];
  this.acceleration = acceleration || [0, 0];
  this.orientation = orientation || 0;
  this.mass = mass || 1;
  this.hitbox = hitbox || 0;
  this.HitboxDimensions = [20, 20];
  //this.Width = 20;
  //this.Height = 20;

  this.lastUpdateTime = 0;
  this.deltaTime = 0;

  Util.splitProperties(this, ['x', 'y'], 'position');
  Util.splitProperties(this, ['vx', 'vy'], 'velocity');
  Util.splitProperties(this, ['ax', 'ay'], 'acceleration');
  Util.splitProperties(this, ['w', 'h'], 'HitboxDimensions');
}

/**
 * Returns true if this Entity2D is contact with or intersecting another
 * Entity2D.
 * @param {Entity2D} other The other Entity2D to check against
 * @return {boolean}
 */
Entity2D.prototype.isCollidedWith = function(other) {
  /*var minDistance = (this.hitbox + other.hitbox);
  return Util.getEuclideanDistance2(this._position, other.position) <=
      (minDistance * minDistance);*/
      if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
         // collision detected!
     }
};

/**
 * Steps this Entity2D forward in time and updates the position, velocity,
 * and acceleration.
 * @param {?number=} deltaTime An optional deltaTime to update with
 */
Entity2D.prototype.update = function(game) {
    var currentTime = (new Date()).getTime();
    /*if (deltaTime) {
        this.deltaTime = deltaTime;
    } else if (this.lastUpdateTime === 0) {
        this.deltaTime = 0;
    } else {*/
        this.deltaTime = (currentTime - this.lastUpdateTime) / 1000;
    //}
    for (var i = 0; i < DIMENSIONS; ++i) {
        this.position[i] += this.velocity[i] * this.deltaTime;
        for(var block of game.Blocks) {
            if (this.x < block.x + block.w &&
                this.x + this.w > block.x &&
                this.y < block.y + block.h &&
                this.y + this.h > block.y) {
                    var dir = Math.sign(this.velocity[i]);
                    this.position[i] = block.position[i] - ((block.HitboxDimensions[i] / 2) * dir) - ((this.HitboxDimensions[i] / 2) * dir);
                    this.velocity[i] = 0;
             }
        }
        /*this.velocity[i] += this.acceleration[i] * this.deltaTime;
        this.acceleration[i] = 0;*/
    }
    this.lastUpdateTime = currentTime;
};

module.exports = Entity2D;
