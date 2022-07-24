const router = require('express').Router();
let Record = require('../models/record.model');

router.route('/').get((req, res) => {
  Record.find()
    .then(record => res.json(record))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/')