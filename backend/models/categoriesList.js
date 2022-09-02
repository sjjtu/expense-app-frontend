const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategoriesListSchema = new Schema({
  name: { type: String, required: true},
  description: { type: String, required: false},
  categories: { type: [String], required: true }, 
}, {
  timestamps: true,
});

const CategoriesList = mongoose.model('CategoriesList', CategoriesListSchema);

module.exports = CategoriesList;