const Run = async () => {
  /**********
   * Server *
   **********/
  const app = require("express")();
  // Morgan provides logging methods
  app.use(require("morgan")("dev"));
  // TODO: Research if I need this package
  app.use(require("body-parser").json());
  // TODO: Research if I need this package
  app.use(require("cors")());

  /***********************
   * Database Connection *
   ***********************/
  const reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const user = await new Promise(resolve => {
    reader.question("Username: ", answer => {
      resolve(answer);
    });
  });
  const pass = await new Promise(resolve => {
    reader.question("Password: ", answer => {
      resolve(answer);
    });
  });
  reader.close();
  console.log("\n\n\n\n\n\n\n\n\n\n\n\nAttempting to connect to database...");
  const mongoClient = await new Promise((resolve, reject) => {
    const URI = `mongodb+srv://${user}:${pass}@gamecloset-kgc2r.gcp.mongodb.net/closet?retryWrites=true&w=majority`;
    const { MongoClient } = require("mongodb");
    try {
      new MongoClient(URI, {
        autoReconnect: true,
        reconnectInterval: 1000,
        reconnectTries: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).connect((err, db) => {
        if (null !== err) {
          reject(err);
        } else {
          if (!db.s.options.auth) {
            console.error("Must log in as user");
            process.exit(0);
          } else {
            resolve(db);
          }
        }
      });
    } catch (err) {
      reject(err);
    }
  }).catch(reason => {
    console.error("\nCould not connect to mongoDB:\n");
    console.error(reason.message);
    process.exit(0);
  });
  if (!mongoClient.s.options.auth) {
    console.error("Must log in as user");
    process.exit(0);
  }

  console.log("Connected to mongoDB");

  /***********
   * Utility *
   ***********/
  const { GetGames, API } = require('./api');

  /*******
   * API *
   *******/
  // NOTE: HTTP GET
  // TODO: Maybe change to post based on having user logins?
  app.get("/view-games", (req, res) => {
    API.viewGames(GetGames(mongoClient), req, res);
  });
  // NOTE: HTTP POST
  app.post("/save-game", (req, res) => {
    API.saveGame(GetGames(mongoClient), req, res);
  });
  // NOTE: HTTP POST
  app.post("/remove-game", (req, res) => {
    API.removeGame(GetGames(mongoClient), req, res);
    // const gameToDelete = { _id: mongo.ObjectID(request.body.id) };
    // GetGames().deleteOne(gameToDelete, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     response.send(err);
    //     return;
    //   }
    //   response.send(`${results.deletedCount} items`);
    // });
  });
  // NOTE: HTTP POST
  // TODO: Implement update games
  app.post("/updateGame", (request, response) => {
    const gameToUpdate = {};
    const newData = {};
  });

  return app.listen(process.env.PORT || 8081);
};

Run();
