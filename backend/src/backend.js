const port = 8080;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const approot = require('app-root-path');



app.use(bodyParser.json());

const customerController = require(`${approot}/backend/src/customerController`);
app.use('/', express.static('frontend/build', {index: 'index.html'}));
app.use('/', customerController);
app.use('/', express.static('public', {index: 'index.html'}));

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
});
