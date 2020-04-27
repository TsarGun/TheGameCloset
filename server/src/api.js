/** mongoDB helper functions */
const { ObjectID } = require("mongodb");
const MakeObjID = id => ({ _id: ObjectID(id) });
const GetGames = client => client.db("closet").collection("games");

class APIResponse {
  constructor(response) {
    Object.assign(this, { error: void 0, ok: void 0 }, response);
  }
  static Builder(error, success) {
    return new APIResponse(error ? { error } : { ok: success });
  }
}
const API = {
  viewGames: (collection, request, response) => {
    collection.find().toArray((err, res) => {
      response.send(APIResponse.Builder(err, res));
    });
  },
  saveGame: (collection, request, response) => {
    const game = request.body;
    if (game._id) {
      // Update existing game
      console.log("Update existing game");
      const id = MakeObjID(game._id);
      const update = { view: true };
      update.title = game.title;
      update.publisher = game.publisher;
      update.genre = game.genre;
      update.players = game.players;
      collection.updateOne(id, { $set: update }, (err, res) => {
        response.send(APIResponse.Builder(err, res));
      });
    } else {
      // Add new game
      console.log("Add new game");
      collection.insertOne(game, (err, res) => {
        response.send(APIResponse.Builder(err, res));
      });
    }
  },
  removeGame: (collection, request, response) => {
    const game = MakeObjID(request.body.id);
    collection.updateOne(
      game,
      { $set: { remove: true, view: false } },
      (err, res) => {
        response.send(
          APIResponse.Builder(
            err,
            `${res.modifiedCount} game marked for removal`
          )
        );
      }
    );
  }
  /*
  // NOTE: HTTP POST
  // TODO: Implement update games
  app.post("/updateGame", (request, response) => {
    const gameToUpdate = {};
    const newData = {};
  });
    */
};

module.exports = { API, GetGames };
