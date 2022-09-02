const router = require('express').Router();
let Board = require('../models/board.model');
let Record = require('../models/record.model')
let CategoriesList = require('../models/categoriesList');

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
    const categories = req.body.categories ? req.body.categories : "6311184850f1b9d9c5aa8607" // TODO generate dynamically default value

    const newBoard = new Board({
        name,
        description,
        users,
        records,
        categories
    });

    newBoard.save()
        .then((result) => res.json({'msg':'Board created!', '_id':result._id}))
        .catch(err => res.status(400).json('Error: ' + err));
});
  

router.route('/:id').get(async (req, res) => {
    const board = await Board.findById(req.params.id)
    let record_list = [];
    let categories = [];
    CategoriesList.findById(board.categories, "categories")
        .then(catList => {categories = catList.categories;})
        .then(async () => {
            for (let recordId of board.records) {
                let record = await Record.findById(recordId);
                record_list.push(record);
            }
        })
        .then(() => {
            res.json({
                name: board.name,
                description: board.description,
                users: board.users,
                categories: categories,
                records: record_list,
                _id: board._id,
            })
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
            // console.log("this is the board" + board);

            const amount = req.body.amount;
            const description = req.body.description;
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

router.route('/:board_id/:record_id/update').post((req, res) => {
    Record.findById(req.params.record_id)
        .then(record => {
            if(req.body.amount) record.amount = req.body.amount;
            if(req.body.description) record.description = req.body.description;
            if(req.body.category) record.category = req.body.category;
            if(req.body.user) record.user = req.body.user;

            record.save()
                .then(() => {
                    res.json(`Record ${req.params.record_id} updated`);
                })
                .catch(err => res.status(400).json("Error" + err))
        })
        .catch(err => res.status(400).json('Error' + err))
})


router.route('/:board_id/:record_id').delete((req, res) => {
    Board.findById(req.params.board_id)
        .then(board => {
            const records_map = new Map(board.records.map(obj => [obj._id.toString(), obj]));
            
            records_map.delete(req.params.record_id);
            board.records = Array.from(records_map.values());

            board.save()
                .then(() => {
                    Record.findByIdAndDelete(req.params.record_id)
                        .then(() => res.json(`Record ${req.params.record_id} deleted from board ${board.name}`))
                })
        })
        .catch(err => res.status(400).json('Error' + err))
})

module.exports = router;