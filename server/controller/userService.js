/**
 * Created by bcahya on 31/7/15.
 */
'use strict';
var Boom = require('boom');

module.exports = function(sequelize) {
    var User  = require('../db/model/user') (sequelize);

    return {
        createUser: function(req, res) {
            User.create({
                email: 'bayucahyap@gmail.com',
                firstName: 'Bayu',
                lastName : 'Cahya P'
            }).then(function(user) {
                res(user);
            }).catch(function(err) {
                console.log(err);
                if (err.name === 'SequelizeUniqueConstraintError') {

                    var error = Boom.create(499, err);

                    res(error);
                } else
                res(err);
            })
        },

        doSomethingElse: function(req, res) {

        }
    }

};