/**
 * @fileoverview This class encapsulates an active game on the server and
 *   handles game updates.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const HashMap = require('hashmap');
const Player = require('./Player');
const Util = require('../shared/Util');
const Map = require('../shared/Map');
const Block = require('../shared/Block');

/**
 * Constructor for a Game object.
 * @constructor
 */
function Game() {
    this.clients = new HashMap();
    this.Players = new HashMap();
    this.Blocks = [];
    this.Map = Map.Create(this);
    for (var block of this.Map.Layout) {
        var newBlock = new Block(block[0],block[1]);
        this.Blocks.push(newBlock);
    }
}

/**
 * Factory method for a Game object.
 * @return {Game}
 */
Game.create = function() {
  return new Game();
};

/**
 * Returns a list containing the connected Player objects.
 * @return {Array<Player>}
 */
Game.prototype.getPlayers = function() {
  return this.Players.values();
};

/**
 * Returns callbacks that can be passed into an update()
 * method for an object so that it can access other elements and
 * entities in the game.
 * @return {Object<string, Function>}
 */
Game.prototype._callbacks = function() {
  return {
    Players: Util.bind(this, this.Players)
  };
};

Game.prototype.addNewPlayer = function(socket, data) {
  this.clients.set(socket.id, socket);
  this.Players.set(socket.id, Player.create(socket.id));
};

Game.prototype.removePlayer = function(id) {
  this.clients.remove(id);
  this.Players.remove(id);
}

/**
 * Updates a player based on input received from their client.
 * @param {string} id The socket ID of the client
 * @param {Object} data The input received from the client
 */
Game.prototype.updatePlayerOnInput = function(id, data) {
  var player = this.Players.get(id);
  if (player) {
    var compressedState = data;
    var state = {
        keyboardState: {
          left: false,
          right: false,
          up: false,
          down: false
        }
    };
    if(compressedState >= 8){
      compressedState -= 8;
      state.keyboardState.down = true;
    }
    if(compressedState >= 4){
      compressedState -= 4;
      state.keyboardState.left = true;
    }
    if(compressedState >= 2){
      compressedState -= 2;
      state.keyboardState.up = true;
    }
    if(compressedState >= 1){
      compressedState -= 1;
      state.keyboardState.right = true;
    }
    player.updateOnInput(state.keyboardState);
  }
}

/**
 * Steps the server forward in time. Updates every entity in the game.
 */
Game.prototype.update = function() {
  var Players = this.getPlayers();
  for (var i = 0; i < Players.length; ++i) {
    Players[i].update(this);
  }
};

/**
 * Sends the state of the game to every client.
 */
Game.prototype.sendState = function() {
  var ids = this.clients.keys();
  var compressedState = [];
  for (var i = 0; i < ids.length; ++i) {
    var player = new Array;
    player[0] = Math.floor(this.Players.get(ids[i]).x);
    player[1] = Math.floor(this.Players.get(ids[i]).y);
    compressedState.push(player)
  }
  for (i = 0; i < ids.length; ++i) {
    this.clients.get(ids[i]).emit(2,
      compressedState
      /*{
        self: this.Players.get(ids[i]),
        Players: this.Players.values().filter((player) => player.id != ids[i])
      }*/
    );
  }
};

module.exports = Game;
