const {
    Storage
} = require('@google-cloud/storage');
const {
    Readable
} = require("stream")

GPC_STORAGE_EVALUATIONS_BUCKET = "evaluation-submissions";

const projectId = 'cloud-homework3-308714';
const keyFilename = './EvaluationRequestHandler/gcloud-key.json';

class EvaluationSourceRepository {
    constructor() {
        this.storage = new Storage({
            projectId,
            keyFilename
        });
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
