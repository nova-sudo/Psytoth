const express = require('express');
const Journal = require('../modals/journal'); // Ensure this points to the correct journal schema
const router = express.Router();

// Add a journal entry
router.post('/add', async (req, res) => {
  const { userId, content, date } = req.body;
  try {
    const newJournal = new Journal({ userId, content, date });
    await newJournal.save();
    res.status(201).json({ message: "Journal entry saved", journal: newJournal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save journal entry" });
  }
});

// Get all journal entries
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find({});
    res.status(200).json(journals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch journal entries" });
  }
});

module.exports = router;
