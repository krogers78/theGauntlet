// Brett Rogers (Kloe)
const express = require('express');

const router = express.Router();

module.exports = app => app.use('/', router);

router.get('/', (req, res) => res.render('index'));

router.get('/battle', (req, res) => res.render('battle'));
