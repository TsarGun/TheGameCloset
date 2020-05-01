const Run = async () => {
    /**********
     * Server *
     **********/
    const app = require('express')();
    // Morgan provides logging methods
    app.use(require('morgan')('dev'));
    // body-parser assists with translating data to/from JSON objects
    app.use(require('body-parser').json());
    // CORS allows Cross Origin Requests, so the website can communicate with this server
    app.use(require('cors')());

    /***********************
     * Database Connection *
     ***********************/
    const mongoClient = await new Promise((resolve, reject) => {
        const reader = require('readline-sync');
        const user = reader.question('Username: ');
        const pass = reader.question('Password: ', {
            hideEchoBack: true,
            mask: '-'
        });
        const URI = `mongodb+srv://${user}:${pass}@gamecloset-kgc2r.gcp.mongodb.net/closet?retryWrites=true&w=majority`;
        const { MongoClient } = require('mongodb');
        try {
            console.log(`Attempting to connect to mongoDB...`);
            new MongoClient(URI, {
                autoReconnect: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).connect((err, db) => {
                if (null !== err || !db.s.options.auth) {
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        } catch (err) {
            reject(err);
        }
    }).catch(reason => {
        console.error('\nCould not connect to mongoDB:\n');
        console.error(reason.message);
        process.exit(0);
    });
    console.log('Connected to mongoDB');

    /*******
     * API *
     *******/
    const {
        GetGames,
        GetUsers,
        get: { viewGames },
        post: { saveGame, removeGame, login }
    } = require('./api')(mongoClient);
    app.get('/view-games', (req, res) => {
        viewGames(GetGames(), req, res);
    });
    app.post('/save-game', (req, res) => {
        saveGame(GetGames(), req, res);
    });
    app.post('/remove-game', (req, res) => {
        removeGame(GetGames(), req, res);
    });
    app.post('/login', (req, res) => {
        login(GetUsers(), req, res);
    });

    return app.listen(process.env.PORT || 8081);
};

Run();
