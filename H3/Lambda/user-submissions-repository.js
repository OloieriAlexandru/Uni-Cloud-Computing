const {
    Datastore
} = require('@google-cloud/datastore');

GPC_DATASTORE_USER_SUBMISSION_KIND = "UserSubmissions";

class UserSubmissionsRepository {
    constructor() {
        this.datastore = new Datastore();
    }

    async get(email) {
        const query = this.datastore
            .createQuery(GPC_DATASTORE_USER_SUBMISSION_KIND)
            .filter('email', '=', email);
        const [userSubmissions] = await this.datastore.runQuery(query);
        if (userSubmissions.length == 0) {
            return null;
        }
        return userSubmissions[0];
    }

    async create(email) {
        const key = this.datastore.key(GPC_DATASTORE_USER_SUBMISSION_KIND);
        const userSubmissionsToInsert = {
            key: key,
            data: {
                email: email,
                submissions: []
            }
        };
        await this.datastore.save(userSubmissionsToInsert);
        return userSubmissionsToInsert;
    }

    async save(userSubmissionsObj) {
        await this.datastore.save(userSubmissionsObj);
    }
}

module.exports = UserSubmissionsRepository;
