function Map(game) {
    game.Blocks.push(Block.Create(256,128));
    game.Blocks.push(Block.Create(256,256));
    game.Blocks.push(Block.Create(128,256));
    game.Blocks.push(Block.Create(128,128));
}

Map.Create = function(game) {
  return new Map(game);
};