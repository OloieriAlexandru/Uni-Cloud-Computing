const jwtDecode = require('jwt-decode');

class Utils {

    static setCorsOrigin(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        res.setHeader('Access-Control-Max-Age', 3600);
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    }

    static extractJwt(req, res) {
        let headerStr = req.header('Authorization');
        let token = headerStr.substring(7);
        return jwtDecode(token);
    }

    static getUTCDate(utc_diff) {
        let date_ob = new Date();
        let offset = date_ob.getTimezoneOffset();
        let add = utc_diff * 60 + offset;
        return new Date(date_ob.getTime() + add * 60000);
    }

    static getCurrentDate() {
        const toDoubleDigits = (value) => {
            return ("0" + value).slice(-2);
        }
        // https://usefulangle.com/post/187/nodejs-get-date-time
        let date_ob = Utils.getUTCDate(3);

        let date = toDoubleDigits(date_ob.getDate());
        let month = toDoubleDigits(date_ob.getMonth() + 1);
        let year = date_ob.getFullYear();
        let hours = toDoubleDigits(date_ob.getHours());
        let minutes = toDoubleDigits(date_ob.getMinutes());
        let seconds = toDoubleDigits(date_ob.getSeconds());

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    }
}

module.exports = Utils;
