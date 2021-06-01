const jwtDecode = require('jwt-decode');

class Utils {

    static extractJwt(req, res) {
        let headerStr = req.header('Authorization');
        let token = headerStr.substring(7);
        return jwtDecode(token);
    }

    static getCurrentDate() {
        const toDoubleDigits = (value) => {
            return ("0" + value).slice(-2);
        }
        // https://usefulangle.com/post/187/nodejs-get-date-time
        let date_ob = new Date();
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
