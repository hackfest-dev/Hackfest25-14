const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron'); // for reminder scheduling

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/medisync', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// ---------------------------
// MODELS
// ---------------------------
const SharedRecord = require('./models/SharedRecord');
const Reminder = require('./models/Reminder'); // new model for reminders

// ---------------------------
// ROUTES
// ---------------------------
const reminderRoutes = require('./routes/reminderRoutes');
app.use('/api/reminders', reminderRoutes);

// Share a record
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

// Get records shared with a doctor
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

// Emergency API
app.post('/emergency', (req, res) => {
    const { name, type, location } = req.body;

    console.log(`🚨 Emergency Alert: ${type} for ${name} at ${location.latitude}, ${location.longitude}`);
    // Future: Notify emergency services or nearby ambulances

    res.json({ message: 'Ambulance dispatched to your location.' });
});

// ---------------------------
// CRON JOB for Daily Reminders
// ---------------------------
cron.schedule('0 9 * * *', async() => {
    try {
        const today = new Date().toISOString().split("T")[0];
        const reminders = await Reminder.find();

        reminders.forEach(rem => {
            const reminderDate = rem.date?.toISOString().split("T");


            if (reminderDate === today) {
                console.log(`🔔 Reminder for ${rem.name}`);
                // Future: Send push/email notification
            }
        });
    } catch (err) {
        console.error("Cron job error:", err);
    }
}, {
    timezone: "Asia/Kolkata" // change based on your local time
});

// Start server
app.listen(5000, () => console.log("✅ Backend running on port 5000"));