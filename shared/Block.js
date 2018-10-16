const Util = require('../shared/Util');

function Block(x, y) {
    this.position = [x, y];
    //this.x = x;
    //this.y = y;
    //this.w = 20;
    //this.h = 20;
    this.HitboxDimensions = [20, 20];

    Util.splitProperties(this, ['x', 'y'], 'position');
    Util.splitProperties(this, ['w', 'h'], 'HitboxDimensions');
}

Block.Create = function(x, y) {
    return new Block(x, y);
}

if (typeof module === 'object') {
    module.exports = Block;
} else {
    window.Block = Block;
}
    