const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  users: { type: [Schema.Types.ObjectId], required: true }, 
  records: { type: [Schema.Types.ObjectId], required: true}, 
}, {
  timestamps: true,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;