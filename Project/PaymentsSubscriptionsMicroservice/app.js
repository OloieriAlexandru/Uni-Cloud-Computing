const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.end("Pump IT Up Payments and Subscriptions microservive");
});

const PORT = process.env.PORT || 3334;

app.listen(PORT, () => {
    console.log(`Payments and Subscriptions Microservice listening at http://0.0.0.0:${PORT}`);
});
