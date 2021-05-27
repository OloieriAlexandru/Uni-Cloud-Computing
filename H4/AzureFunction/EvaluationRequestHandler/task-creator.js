const {
    CloudTasksClient
} = require('@google-cloud/tasks');

GPC_PROJECT_ID = "cloud-homework3-308714";
GPC_QUEUE_NAME = "evaluation-queue";
GPC_QUEUE_LOCATION = "europe-west1";

EVALUATOR_GCLOUD = 'http://34.65.167.208:3333/api/v1/evaluation';
EVALUATOR_AZURE = 'http://20.47.114.36/api/v1/evaluation';

const projectId = 'cloud-homework3-308714';
const keyFilename = './EvaluationRequestHandler/gcloud-key.json';

class TaskCreator {
    constructor() {
        this.client = new CloudTasksClient({
            projectId,
            keyFilename
        });
    }

    async createTask(evaluationId) {
        const queue = this.client.queuePath(GPC_PROJECT_ID, GPC_QUEUE_LOCATION, GPC_QUEUE_NAME);

        const task = {
            httpRequest: {
                url: EVALUATOR_AZURE,
                httpMethod: 'POST',
                body: Buffer.from(JSON.stringify({
                    evaluation_id: evaluationId
                })).toString('base64')
            }
        };

        const taskRequest = {
            parent: queue,
            task: task
        };

        await this.client.createTask(taskRequest);
    }
};

module.exports = TaskCreator;
