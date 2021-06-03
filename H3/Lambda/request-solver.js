const EvaluationSourceRepository = require('./evaluation-source-repository');
const EvaluationRepository = require('./evaluation-repository');
const ProblemRepository = require('./problem-repository');
const UserSubmissionsRepository = require('./user-submissions-repository');

const TaskCreator = require('./task-creator');

const Utils = require('./utils');
const Validator = require('./validator');

function setCorsOrigin(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Max-Age', 3600);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
}

LANGUAGE_TO_EXTENSION = {
    'C++': '.cpp',
    'Python': '.py',
    'C': '.c'
};

async function solveRequest(req, res, validator, problemRepository, evaluationRepository, evaluationSourceRepository, userSubmissionsRepository) {
    // Validations
    let validation = validator.validateBody(req, res)
    if (validation) {
        return validation;
    }

    let headerValidation = validator.validateHeader(req, res);
    if (headerValidation) {
        return headerValidation;
    }

    // Jwt
    let jwt = Utils.extractJwt(req, res);
    if (!jwt) {
        return res.status(500).send(JSON.stringify({
            'message': 'Internal Server Error while extracting information about the user'
        }));
    }

    // Problem validation
    let requestModel = req.body;
    let problemId = parseInt(requestModel.problemId);

    let problems = await problemRepository.get(problemId);
    if (!problems || problems.length == 0 || !problems[0]) {
        return res.status(400).end('Bad Request! Invalid problem id!');
    }

    // Evaluation obj creation
    let evaluationObj = {
        'problemId': req.body.problemId,
        'problemName': problems[0].title,
        'lang': req.body.programmingLanguage,
        'submissionDateTime': Utils.getCurrentDate(),
        'status': 'In Queue',
        'user': jwt.username,
        'userEmail': jwt.email
    }
    let createdEvaluation = await evaluationRepository.create(evaluationObj);
    let evaluationId = createdEvaluation.key.id;

    let sourceName = evaluationId.toString() + LANGUAGE_TO_EXTENSION[req.body.programmingLanguage];
    createdEvaluation.data.sourceName = sourceName;
    await evaluationRepository.save(createdEvaluation);

    // Evaluation source creation
    await evaluationSourceRepository.create(requestModel.sourceCode, sourceName);

    // User submission creation
    let userSubmissionsObj = await userSubmissionsRepository.get(jwt.email);
    if (!userSubmissionsObj) {
        userSubmissionsObj = await userSubmissionsRepository.create(jwt.email);
    }
    if (!userSubmissionsObj.submissions) {
        userSubmissionsObj.submissions = [];
    }
    userSubmissionsObj.submissions.push(evaluationId);
    await userSubmissionsRepository.save(userSubmissionsObj);

    // Task creation
    await new TaskCreator().createTask(evaluationId);

    return res.end(JSON.stringify({
        'evaluationId': evaluationId
    }))
}

module.exports = async (req, res) => {
    setCorsOrigin(req, res);

    if (req.method === 'OPTIONS') {
        return res.status(204).send('');
    }

    if (req.method === 'GET') {
        return res.status(200).send('Pump IT Up Evaluation submitter function');
    }

    let validator = new Validator();
    let problemRepository = new ProblemRepository();
    let evaluationRepository = new EvaluationRepository();
    let evaluationSourceRepository = new EvaluationSourceRepository();
    let userSubmissionsRepository = new UserSubmissionsRepository();

    return await solveRequest(req, res, validator, problemRepository, evaluationRepository, evaluationSourceRepository,
        userSubmissionsRepository);
};
