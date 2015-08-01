/**
 * Created by bcahya on 30/7/15.
 */
var Sequelize = require('sequelize'),
    Config = require('./config/config');

var app = {};
app.config = Config;

var sequelize = new Sequelize(
    app.config.server.database.db,
    app.config.server.database.username,
    app.config.server.database.password, {
        host: app.config.server.database.host,
        dialect: 'postgres',

        pool: {
            min: app.config.server.database.pool.min,
            max: app.config.server.database.pool.max,
            idle: app.config.server.database.pool.idle
        }
    }
);

sequelize.authenticate().then(function()
{
    exports.sequelize = sequelize;

    var Hapi = require('hapi'),
        Moment = require('moment'),
        Boom   = require('boom'),
        Routes = require('./routes');

    var privateKey = app.config.key.privateKey;
    var timeToLive = app.config.key.tokenExpiry;

    var validateToken = function(decodedToken, callback) {
        var age = Moment().diff(
            Moment(
                decodedToken.iat    // decodedToken.iat -- issue at -- returning value in seconds
                *                   // multiply with 1000 to set it to milliseconds
                1000                // since Moment() returning in milliseconds
            )
        );

        if (age > timeToLive) {
            return callback(Boom.create(401, "Token expired"), false);
        } else {
            return callback(null, true, decodedToken);
        }
    };

    var server = new Hapi.Server();
    server.connection({
        host: app.config.server.app.host,
        port: app.config.server.app.port
    });

    server.register(
        [{
            register: require('hapi-auth-jwt')
        }], function (err) {

            server.auth.strategy('token', 'jwt', 'required', {
                    key: privateKey,
                    validateFunc: validateToken
                }
            );

            server.route(Routes.endpoints);
        }
    );

    server.start(function() {
        console.log('Hapi Server started @ ', server.info.uri);
    });
});
