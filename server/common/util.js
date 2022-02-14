const fs = require('fs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/db');

exports.issueToken = (payload) => {
    const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf-8');

    // Token expiration 90 days
    const exp = Math.floor(60 * 60 * 24 * 90);

    const token = jwt.sign(payload, PRIV_KEY, { algorithm: 'RS256' }, {
        expiresIn: exp
    });

    return token;
}

exports.dbSync = () => {
    sequelize.authenticate().then(() => {
        sequelize.sync();
        console.log('DB synced successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        // Retry 
        setTimeout(() => this.dbSync(), 5000);
    });
}