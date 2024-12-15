const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modals/user.js');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, password: hashedPassword });
        await user.save();

        // Generate a JWT token (optional)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

