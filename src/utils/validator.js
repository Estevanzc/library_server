module.exports = {
    strMinLength: (str, fieldName, minLength) => {
        if (str.length < minLength) {
            return res.status(400).json({
                error: `${fieldName} must be at least ${minLength} characters wrong`
            })
        }
    },
};