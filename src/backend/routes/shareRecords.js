const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema definition
const sharedRecordSchema = new mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId, // Added patientId field
    patientName: String,
    doctorId: mongoose.Schema.Types.ObjectId,
    recordData: Object,
    sharedAt: { type: Date, default: Date.now },
});

const SharedRecord = mongoose.model('SharedRecord', sharedRecordSchema);

// POST route to share a record
router.post('/', async(req, res) => {
    const { patientId, patientName, doctorId, recordData } = req.body;

    // Check for missing required fields
    if (!patientId || !patientName || !doctorId || !recordData) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Create a new shared record
        const newRecord = new SharedRecord({
            patientId,
            patientName,
            doctorId,
            recordData,
        });

        // Save the record to the database
        await newRecord.save();
        res.status(201).json({ message: 'Record shared successfully' });
    } catch (error) {
        console.error('Error saving record:', error);
        res.status(500).json({ message: 'Error sharing record', error });
    }
});

module.exports = router;