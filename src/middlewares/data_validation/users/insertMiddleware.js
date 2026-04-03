module.exports = async (req, res, next) => {
    const {
        name,
        email,
        password,
        password_confirmation,
        birth,
        type,
        registration
    } = req.body;

    if (!name || !email || !password || !password_confirmation || !birth || !type || !registration) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (name.length < 3) {
        return res.status(400).json({ error: "Name must be at least 3 characters long" })
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (!/\d/.test(password)) {
        return res.status(400).json({ error: "Password must have at least one number" })
    }

    if (password !== password_confirmation) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (isNaN(Date.parse(birth)) || new Date(birth) > new Date()) {
        return res.status(400).json({ error: 'Invalid birth date' });
    }

    next();
};
