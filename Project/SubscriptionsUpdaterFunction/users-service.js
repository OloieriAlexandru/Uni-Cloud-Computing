const axios = require('axios').default;
const fs = require('fs');

class UsersService {
    constructor(config) {
        this.config = config;
        this.accessKey = fs.readFileSync(config.accessTokenPath).toString().replace(/(\r\n|\n|\r)/gm, "");
        this.URL = config.usersMicroserviceUrl;
    }

    changeUserType = async (newUserType, email) => {
        if (newUserType != 'premium' && newUserType != 'basic') {
            return null;
        }
        let config = {
            headers: {
                'Authorization': `Bearer ${this.accessKey}`
            }
        };
        let body = {
            email: email
        };
        let fullURL = this.URL + '/' + newUserType;

        let result = await axios.patch(fullURL, body, config);
        if (!(result.status >= 200 & result.status < 300)) {
            return null;
        }
        return true;
    }
};

module.exports = UsersService;
