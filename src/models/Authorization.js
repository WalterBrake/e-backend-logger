const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Authorization = new Schema({
    application_id: { type: Schema.Types.ObjectId, required: true, ref: 'Aplication' },
    token: { type: String, required: true },
},
    { timestamps: true });

module.exports = mongoose.model('Authorization', Authorization)

