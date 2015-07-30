/**
 * Created by bcahya on 30/7/15.
 */
var User = require('./controller/user');

var exampleHandler = function(request, response) {
    response('ok')
};

exports.endpoints = [
    { method: 'GET', path: '/login', config : { auth: false }, handler : exampleHandler },
    { method: 'POST', path: '/login', config : User.login },
    { method: 'GET', path: '/test', handler : exampleHandler },
    { method: 'GET', path: '/user', handler : exampleHandler }
];

