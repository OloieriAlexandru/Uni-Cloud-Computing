const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const solve = require('./request-solver');

app.all('/', async (req, res) => {
    await solve(req, res);
});

app.listen(PORT, () => {
    console.log(`Google Cloud Function listening at http://localhost:${PORT}`)
});
