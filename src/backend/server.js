const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/medisync', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// Import models
const SharedRecord = require('./models/SharedRecord');

// API to share a record
app.post('/api/share', async(req, res) => {
    const { patientId, doctorId, records } = req.body;

    try {
        const shared = new SharedRecord({ patientId, doctorId, records });
        await shared.save();
        res.status(200).json({ message: 'Record shared successfully' });
    } catch (err) {
        console.error("Error saving shared record:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

// API to get records shared with a doctor
app.get('/api/doctor-records/:doctorId', async(req, res) => {
    const { doctorId } = req.params;

    try {
        const records = await SharedRecord.find({ doctorId });
        res.status(200).json(records);
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ message: 'Failed to fetch shared records' });
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));