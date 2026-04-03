module.exports = async (req, res, next) => {
    const {
        name,
        email,
        birth,
    } = req.body;

    if (!name || !email || !birth) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (name.length < 3) {
        return res.status(400).json({ error: "Name must be at least 3 characters long" })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (isNaN(Date.parse(birth)) || new Date(birth) > new Date()) {
        return res.status(400).json({ error: 'Invalid birth date' });
    }

    next();
};
