const router = require('express').Router();
let CategoriesList = require('../models/categoriesList');

router.route('/').get((req, res) => {
  CategoriesList.find()
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    CategoriesList.findById(req.params.id)
        .then()
})

router.route('/create').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const categories = req.body.categories;

    const newCategoriesList = new CategoriesList({
        name,
        description,
        categories
    });

    newCategoriesList.save()
        .then((result) => res.json({'msg':'CategoriesList created!', '_id':result._id}))
        .catch(err => res.status(400).json('Error: ' + err));
});
  
module.exports = router;