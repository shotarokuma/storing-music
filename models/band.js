const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BandSchema = new Schema({
  name: { type: String, maxlength: 30, required: true },
  albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }]
});

exports.Band = mongoose.model('Band', BandSchema);

