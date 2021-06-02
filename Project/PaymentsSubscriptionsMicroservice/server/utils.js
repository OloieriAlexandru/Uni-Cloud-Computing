const jwtDecode = require('jwt-decode');

class Utils {

    static extractJwt(req, res) {
        let headerStr = req.header('Authorization');
        let token = headerStr.substring(7);
        return jwtDecode(token);
    }

    static setCorsOrigin(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        res.setHeader('Access-Control-Max-Age', 3600);
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    }
}

module.exports = Utils;
