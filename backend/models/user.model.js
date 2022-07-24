const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  surname: { type: String, required: true },
  lastname: { type: String, required: true},
  email: { type: String, required: true}, // TODO: validate format
  boards: { type: [Schema.Types.ObjectId] },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;