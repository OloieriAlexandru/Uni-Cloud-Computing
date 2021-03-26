const {
    Datastore
} = require('@google-cloud/datastore');

GPC_DATASTORE_PROBLEM_KIND = "Problem";

class ProblemRepository {
    constructor() {
        this.datastore = new Datastore();
    }

    async get(problemId) {
        const key = this.datastore.key([GPC_DATASTORE_PROBLEM_KIND, problemId]);
        return await this.datastore.get(key);
    }
}

module.exports = ProblemRepository;
