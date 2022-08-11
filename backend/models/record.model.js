const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: false},
  category: { type: String, required: false},
  user: {type: String, required: false}, // TODO: change type
  date: {type: Date, required: false}
}, {
  timestamps: true,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;