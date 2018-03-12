const express = require('express');
const app = express();
const glob = require('glob');
const bodyParser = require('body-parser');
const port = 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let controllerFileNames = glob.sync(`${__dirname}/controllers/*.js`);
controllerFileNames.forEach(controllerFileName => require(controllerFileName)(app));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;