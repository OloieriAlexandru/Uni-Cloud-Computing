const solve = require('./request-solver');

module.exports = async function (context, req) {
    await solve(context, req);
}
