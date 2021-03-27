const EvaluationSourceRepository = require('./evaluation-source-repository');
const EvaluationRepository = require('./evaluation-repository');
const ProblemRepository = require('./problem-repository');

const TaskCreator = require('./task-creator');

const requestSchema = require('./request-model');

function validateBody(req, res) {
    if (req.body === undefined) {
        return res.status(400).end('Bad Request!');
    }
    const {
        error,
        value
    } = requestSchema.validate(req.body);

    if (error) {
        return res.status(400).end(JSON.stringify(error.details));
    }

    return null;
}

module.exports = async (req, res) => {
    let validation = validateBody(req, res)
    if (validation) {
        return validation;
    }

    let requestModel = req.body;
    let problemId = parseInt(requestModel.problemId);

    let problemRepository = new ProblemRepository();
    let problems = await problemRepository.get(problemId);
    if (!problems || problems.length == 0 || !problems[0]) {
        return res.status(400).end('Bad Request! Invalid problem id!');
    }

    let evaluationRepository = new EvaluationRepository();
    let evaluationId = await evaluationRepository.create(req.body);

    let evaluationSourceRepository = new EvaluationSourceRepository();
    await evaluationSourceRepository.create(problemId, evaluationId, requestModel.sourceCode);

    try {
        await new TaskCreator().createTask(evaluationId);
    } catch (e) {
        console.log(e);
    }

    return res.end('Test')
};
