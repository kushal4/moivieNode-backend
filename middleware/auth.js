// var i = 'Mysoft corp'; // Issuer 
// var s = 'some@user.com'; // Subject 
// var a = 'http://mysoftcorp.in'; // Audience
// var verifyOptions = {
//     issuer: i,
//     subject: s,
//     audience: a,
//     expiresIn: "12h",
//     algorithm: ["RS256"]
// };
const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = function(req, res, next) {

    let token = req.header("Authorization").split(' ')[1];
    console.log("token::" + token);
    if (!token) return res.status(401).send({
        code: 401,
        message: "Access Denied Unauthenticated"
    });
    let privateKEY = fs.readFileSync('./private.key', 'utf8');
    try {
        let payload = jwt.verify(token, privateKEY);
        req.user = payload;
        next();
    } catch (ex) {
        res.status(401).send({
            code: 401,
            message: "Invalid token"
        });
    }

}