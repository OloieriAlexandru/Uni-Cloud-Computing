const {
    Datastore
} = require('@google-cloud/datastore');

GPC_DATASTORE_EVAL_KIND = "Evaluation";

const projectId = 'cloud-homework3-308714';
const keyFilename = './EvaluationRequestHandler/gcloud-key.json';

class EvaluationRepository {
    constructor() {
        this.datastore = new Datastore({
            projectId,
            keyFilename
        });
    }

    async create(evaluationObj) {
        const evaluationKey = this.datastore.key(GPC_DATASTORE_EVAL_KIND);
        const evaluationToInsert = {
            key: evaluationKey,
            data: evaluationObj
        };
        await this.datastore.save(evaluationToInsert);
        return evaluationToInsert.key.id;
    }
}

module.exports = EvaluationRepository;
