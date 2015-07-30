/**
 * Created by bcahya on 30/7/15.
 */
module.exports = {
    server: {
        app: {
            host: '127.0.0.1',
            port: 8000
        },

        database: {
            host: '127.0.0.1',
            port: 5432,
            db: '',
            username: '',
            password: ''
        }
    },

    key: {
        privateKey: '78XyQBSksijreX989',
        tokenExpiry: 1 * 2 * 60 * 1000 //2 minutes
    },

    email: {
        username: "test@test.com",
        password: "password"
    }
};