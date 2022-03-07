const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Aplication = new Schema({
  name: { type: String, required: true },
},
  { timestamps: true });

module.exports = mongoose.model('Aplication', Aplication)

