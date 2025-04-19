const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");

// POST route to save reminder
router.post("/", async(req, res) => {
    try {
        console.log("Incoming reminder data:", req.body); // Debug log

        const reminder = new Reminder(req.body);
        await reminder.save();

        res.status(201).json({ message: "Reminder saved", reminder });
    } catch (err) {
        console.error("Error saving reminder:", err);
        res.status(500).json({ message: "Failed to save reminder", error: err.message });
    }
});

module.exports = router;