const {
    Storage
} = require('@google-cloud/storage');
const {
    Readable
} = require("stream")

GPC_STORAGE_EVALUATIONS_BUCKET = "evaluation-submissions";

class EvaluationSourceRepository {
    constructor() {
        this.storage = new Storage();
        this.bucket = this.storage.bucket(GPC_STORAGE_EVALUATIONS_BUCKET);
    }

    async create(evaluationId, source) {
        const newFile = this.bucket.file(evaluationId + '.cpp');

        let fileStream = new Readable();
        fileStream.push(source);
        fileStream.push(null);

        await fileStream.pipe(newFile.createWriteStream());
    }
}

module.exports = EvaluationSourceRepository;
