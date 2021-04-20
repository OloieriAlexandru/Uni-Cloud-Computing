const {
    Datastore
} = require('@google-cloud/datastore');

GPC_DATASTORE_PROBLEM_KIND = "Problem";

const projectId = 'cloud-homework3-308714';
const keyFilename = './EvaluationRequestHandler/gcloud-key.json';

class ProblemRepository {
    constructor() {
        this.datastore = new Datastore({
            projectId,
            keyFilename
        });
    }

    async get(problemId) {
        const key = this.datastore.key([GPC_DATASTORE_PROBLEM_KIND, problemId]);
        return await this.datastore.get(key);
    }
}

module.exports = ProblemRepository;
