const Utils = require('./utils');
const Validator = require('./validator');

const UsersService = require('./users-service');
const SubscriptionsRepository = require('./subscriptions-repository');
const SubscriptionsService = require('./subscriptions-service');

const CONFIG = require('./config');

module.exports = async (req, res) => {
    Utils.setCorsOrigin(req, res);

    if (req.method === 'OPTIONS') {
        return res.status(204).send('');
    }
    if (req.method === 'GET') {
        return res.status(200).send('Pump IT Up Subscriptions updater function');
    }
    if (req.method !== 'POST') {
        // Method Not Allowed
        return res.status(405).send(JSON.stringify({}));
    }

    let validator = new Validator();
    let validationResult = validator.validateBody(req, res);
    if (validationResult) {
        return validationResult;
    }
    let force = Utils.getBool(req.body.force);

    let usersService = new UsersService(CONFIG);
    let subscriptionsRepository = new SubscriptionsRepository();
    let subscriptionsService = new SubscriptionsService(usersService, subscriptionsRepository);

    return await subscriptionsService.updateSubscriptions(req, res, force);
};
