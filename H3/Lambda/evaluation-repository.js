const {
    Datastore
} = require('@google-cloud/datastore');

GPC_DATASTORE_EVAL_KIND = "Evaluation";

class EvaluationRepository {
    constructor() {
        this.datastore = new Datastore();
    }

    async create(evaluationObj) {
        const evaluationKey = this.datastore.key(GPC_DATASTORE_EVAL_KIND);
        const evaluationToInsert = {
            key: evaluationKey,
            data: evaluationObj
        };
        await this.datastore.save(evaluationToInsert);
        return evaluationToInsert;
    }

    async save(evaluationObj) {
        await this.datastore.save(evaluationObj);
    }
}

module.exports = EvaluationRepository;
