const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Log = new Schema({
  application_id: { type: Schema.Types.ObjectId, required: true, ref: 'Aplication' },
  type: { type: String, required: true },
  priority: { type: String, required: true },
  path: { type: String, required: true },
  message: { type: String, required: true },
  request: { type: Schema.Types.Mixed, required: true },
  response: { type: Schema.Types.Mixed, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },

},
  { timestamps: true });

module.exports = mongoose.model('Log', Log)

