/**
 * Created by bcahya on 30/7/15.
 */
var Joi = require('joi'),
    Jwt = require('jsonwebtoken'),
    Boom = require('boom'),
    Config = require('../config/config');


var privateKey = Config.key.privateKey;

exports.login = {

    auth : false,

    validate : {
        payload : {
            username: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },

    handler : function(request, reply) {
        var userName = request.payload.username;
        if (userName === 'test@co.id') {

            var credential = {
                username: request.payload.username,
                level: 'intermediate'
            };

            var encodeToken = Jwt.sign(credential, privateKey);

            var res = {
                username: request.payload.username,
                token: encodeToken
            };

            reply(res);

        } else {
            reply(Boom.forbidden("Access forbidden!"));
        }
    }
};