class Utils {

    static setCorsOrigin(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        res.setHeader('Access-Control-Max-Age', 3600);
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    }

    static buildBody(message, otherObj = {}) {
        let obj = {
            'message': message
        };
        const returnedObj = {
            ...obj,
            ...otherObj
        };
        return JSON.stringify(returnedObj);
    }

    static getUTCDate(utc_diff) {
        let date_ob = new Date();
        let offset = date_ob.getTimezoneOffset();
        let add = utc_diff * 60 + offset;
        return new Date(date_ob.getTime() + add * 60000);
    }

    static getBool(value) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        return value;
    }
}

module.exports = Utils;
