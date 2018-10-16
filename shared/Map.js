function Map(game) {
    this.Layout =
        [[256,128],
        [256,256],
        [128,256],
        [128,128]];
}

Map.Create = function(game) {
  return new Map(game);
};

if (typeof module === 'object') {
    module.exports = Map;
} else {
    window.Map = Map;
}
    