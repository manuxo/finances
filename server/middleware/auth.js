//Dependencies
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,'UPC2018-Finanzas$$$$');
        req.userData = decoded;
        next();
    } catch(err) {
        localStorage.clear();
        return res.status(401).send({message: 'Auth failed'});
    }
}