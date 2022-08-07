const router = require('express').Router();
let Board = require('../models/board.model');
let Record = require('../models/record.model')

router.route('/').get((req, res) => {
  Board.find()
    .then(boards => res.json(boards))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/create').post((req, res) => {
    const name = req.body.name;
    const users = req.body.users;
    const records = [];
    const description = req.body.description;

    const newBoard = new Board({
        name,
        description,
        users,
        records,
    });

    newBoard.save()
        .then((result) => res.json({'msg':'Board created!', '_id':result._id}))
        .catch(err => res.status(400).json('Error: ' + err));
});
  

router.route('/:id').get((req, res) => {
    Board.findById(req.params.id)
        .then((board) => {    
            let record_list = [];
            for (let recordId of board.records) {

                Record.findById(recordId) // TODO: use async await
                    .then(record => { 
                        record_list.push(record);
                        if (record_list.length == board.records.length) {
                            const m_board = {
                                name: board.name,
                                description: board.description,
                                users: board.users,
                                records: record_list,
                                _id: board._id,
                            }
                            console.log(m_board)
                            return res.json(m_board);
                        }
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            }
            
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
  

router.route('/:id').delete((req, res) => {
    Board.findByIdAndDelete(req.params.id)
        .then(board => {
            counter = 0;
            for (let recordId of board.records) {
                Record.findByIdAndDelete(recordId)
                    .then(record => {
                        counter += 1;
                        if (board.records.length == counter) res.json(`Board ${board.name} deleted.`);
                    })
            }
        })
        
        .catch(err => res.status(400).json('Error: ' + err));
});
  

router.route('/:id/update').post((req, res) => {
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


router.route('/:id/addUser').post((req, res) => {
    Board.findById(req.params.id)
        .then(board => {
            board.users.push(req.body.user);

            board.save()
                .then(() => res.json(`User ${req.body.user} added to Board ${board.name}.`))
                .catch(err => res.status(400).json("Error: " + error));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});


router.route('/:id/createRecord').post((req, res) => {  // TODO: check if board exists !!
    Board.findById(req.params.id)
        .then(board => {    
            console.log("this is the board" + board);

            const amount = req.body.amount;
            const description = req.body.descripttion;
            const category = req.body.category;
            const user = req.body.user;
            const date = Date(req.body.date);

            const newRecord = new Record({
                amount,
                description,
                category,
                user,
                date,
            })

            board.records.push(newRecord.id);    
            board.save()
                .then( () => {
                    
                    newRecord.save()
                    .then( () => res.json(`Record ${newRecord.id} created in Board ${board.name}.`))
                    
            })
        })
                    

        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;