const jwt = require('jsonwebtoken');
const config = require('./config/auth.config');

module.exports.verifyToken = function(req,res, next){
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({message:'Missing token'});
    }

    jwt.verify(token, config.secret, (err, decode) => {
        if(err) {
            return res.status(401).send({message:'Unauthorized user'});
        }
        req.userId = decode.id;
        next();
    })
}

// const authJwt = {
//     verifyToken
// }
//
// // module.exports = verifyToken;
// module.exports = authJwt;