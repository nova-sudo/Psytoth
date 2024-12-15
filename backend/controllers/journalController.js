const Journal = require('../models/journal');



// Get all journal entries for a user
exports.getJournalEntries = async (req, res) => {
    const { userId } = req.query; // Assuming userId is sent as a query parameter

    try {
        const journalEntries = await Journal.find({ userId }).sort({ date: -1 });
        res.status(200).json(journalEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
