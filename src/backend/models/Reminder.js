const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    medicines: [{
        name: String,
        time: String,
        days: [String]
    }],
    checkupReminder: {
        note: String,
        date: String,
        time: String
    }
});

module.exports = mongoose.model("Reminder", reminderSchema);