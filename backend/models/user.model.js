const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  surname: { type: String, required: true },
  lastname: { type: String, required: true},
  email: { type: String, required: true},
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;