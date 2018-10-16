function Block(x, y) {
    this.x = x;
    this.y = y;
}

Block.Create = function(x, y) {
    return new Block(x, y);
};