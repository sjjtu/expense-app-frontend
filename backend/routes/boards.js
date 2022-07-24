const router = require('express').Router();
let Board = require('../models/board.model');

router.route('/').get((req, res) => {
  Board.find()
    .then(boards => res.json(boards))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const name = req.body.name;
    const users = [];
    const records = [];
    const description = req.body.description;
  
    const newBoard = new Board({
      name,
      description,
      users,
      records,
    });
  
    newBoard.save()
    .then(() => res.json('Board added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/:id').get((req, res) => {
Board.findById(req.params.id)
    .then(board => res.json(board))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/:id').delete((req, res) => {
Board.findByIdAndDelete(req.params.id)
    .then(board => res.json(`Board ${board.name} deleted.`))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/update/:id').post((req, res) => {
Board.findById(req.params.id)
    .then(board => {

    if (req.body.description) board.description = req.body.description;
    if (req.body.name) board.name = req.body.name;

    board.save()
        .then(() => res.json('Board updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/adduser/:id').post((req, res) => {
Board.findById(req.params.id)
    .then(board => {
    board.users.push(req.body.user);

    board.save()
        .then(() => res.json(`User ${req.body.user} added to Board ${board.name}.`))
        .catch(err => res.status(400).json("Error: " + error));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/addrecord/:id').post((req, res) => {
Board.findById(req.params.id)
    .then(board => {
    board.records.push(req.body.recordId);

    board.save()
        .then(() => res.json(`Record ${req.body.recordId} added to Board ${board.name}.`))
        .catch(err => res.status(400).json("Error: " + error));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;