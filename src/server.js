const express = require('express');
const glob = require('glob');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const controllerFileNames = glob.sync(`${__dirname}/controllers/*.js`);
controllerFileNames.forEach(controllerFileName => require(`${controllerFileName}`)(app));

app.listen(port, () => console.log(`Server running on port: ${port}`));

module.exports = app;
