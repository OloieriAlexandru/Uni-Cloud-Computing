const {
    Datastore
} = require('@google-cloud/datastore');

GPC_DATASTORE_EVAL_KIND = "Evaluation";

class EvaluationRepository {
    constructor() {
        this.datastore = new Datastore();
    }

    async create(evaluation) {
        const evaluationKey = this.datastore.key(GPC_DATASTORE_EVAL_KIND);
        const evaluationToInsert = {
            key: evaluationKey,
            data: {
                lang: evaluation.programmingLanguage,
                problemId: evaluation.problemId
            }
        };
        await this.datastore.save(evaluationToInsert);
        return evaluationToInsert.key.id;
    }
}

module.exports = EvaluationRepository;
