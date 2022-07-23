const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: false},
  category: { type: String, required: true},
  user: {type: String, required: true}, // TODO: change type
  date: {type: Date, required: true}
}, {
  timestamps: true,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = record;