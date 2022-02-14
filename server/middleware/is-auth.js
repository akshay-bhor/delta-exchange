const jwt = require('jsonwebtoken');
const fs =  require('fs');

module.exports = async (req, res, next) => {
    // Public Key(
    const PUB_KEY = fs.readFileSync(__dirname + '/../common/id_rsa_pub.pem', 'utf-8');

    const authHeader = req.get('Authorization') || null;

    if(!authHeader) return next();

    const token = authHeader.split(' ')[1];

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, PUB_KEY, { algorithms: ['RS256'] });
    } catch (err) {
        err.statusCode = 401;
        return next(err);
    }

    if(!decodedToken) {
        const err = new Error('You have been logged Out!');
        err.statusCode = 401;
        return next(err);
    }

    req.userInfo = decodedToken;

    next();
}