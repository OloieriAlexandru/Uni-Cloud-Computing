const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan(':method :url :status'));
app.use(cors());

const server = require('./server');

const CONFIG = require('./config');

var subscriptionsRepository = new server.SubscriptionsRepository();

var usersService = new server.UsersService(CONFIG);

var paymentsService = new server.PaymentsService(subscriptionsRepository, usersService, CONFIG);
var paymentsController = new server.PaymentsController(paymentsService)

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.end("Pump IT Up Payments and Subscriptions microservice");
});

app.post('/charge', paymentsController.charge);

const PORT = process.env.PORT || 3334;

app.listen(PORT, () => {
    console.log(`Payments and Subscriptions Microservice listening at http://0.0.0.0:${PORT}`);
});
