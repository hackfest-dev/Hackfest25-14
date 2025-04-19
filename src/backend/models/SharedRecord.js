const mongoose = require('mongoose');

const SharedRecordSchema = new mongoose.Schema({
    patientId: String,
    doctorId: String,
    records: [String],
    sharedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SharedRecord', SharedRecordSchema);