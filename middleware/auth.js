var i = 'Mysoft corp'; // Issuer 
var s = 'some@user.com'; // Subject 
var a = 'http://mysoftcorp.in'; // Audience
var verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithm: ["RS256"]
};