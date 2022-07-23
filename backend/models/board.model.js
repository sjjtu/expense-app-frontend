const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  users: { type: String, required: true }, // TODO: change type
  records: { type: String, required: true}, // TODO: change type
}, {
  timestamps: true,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;