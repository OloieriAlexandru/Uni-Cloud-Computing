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

function getCurrentDate() {
    const toDoubleDigits = (value) => {
        return ("0" + value).slice(-2);
    }
    // https://usefulangle.com/post/187/nodejs-get-date-time
    let date_ob = new Date();
    let date = toDoubleDigits(date_ob.getDate());
    let month = toDoubleDigits(date_ob.getMonth() + 1);
    let year = date_ob.getFullYear();
    let hours = toDoubleDigits(date_ob.getHours());
    let minutes = toDoubleDigits(date_ob.getMinutes());
    let seconds = toDoubleDigits(date_ob.getSeconds());

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

function setCorsOrigin(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Max-Age', 3600);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
}

module.exports = async (req, res) => {
    setCorsOrigin(req, res);
    if (req.method === 'OPTIONS') {
        return res.status(204).send('');
    }

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
    let evaluationObj = {
        'problemId': req.body.problemId,
        'problemName': problems[0].title,
        'lang': req.body.programmingLanguage,
        'submissionDateTime': getCurrentDate(),
        'status': 'In Queue'
    }
    let evaluationId = await evaluationRepository.create(evaluationObj);

    let evaluationSourceRepository = new EvaluationSourceRepository();
    await evaluationSourceRepository.create(evaluationId, requestModel.sourceCode);

    try {
        await new TaskCreator().createTask(evaluationId);
    } catch (e) {
        console.log(e);
    }

    return res.end(JSON.stringify({
        'evaluationId': evaluationId
    }))
};
