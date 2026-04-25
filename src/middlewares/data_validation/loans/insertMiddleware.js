const Loan = require("../../../../models");
const dayjs = require("dayjs");
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

module.exports = async (req, res, next) => {
    let { user_id, book_id } = req.body

    if (!user_id || !book_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    let user = await User.findByPk(user_id)
    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }
    let book = await Book.findByPk(book_id)
    if (!book) {
        return res.status(404).json({ error: "Book not found" })
    }
    let loans_count = await Loan.count({
        where: {
            user_id: user_id,
            active: true
        }
    })
    let maximum_loans = (user.type + 1) * 3
    if (loans_count >= maximum_loans) {
        return res.status(422).json({ error: `The user have reached the limit of ${maximum_loans} active loans` })
    }
    let current_date = dayjs()
    let suspension_date = user.suspension_date ? dayjs(user.suspension_date) : dayjs()
    if (!current_date.isSameOrAfter(suspension_date)) {
        return res.status(403).json({ error: "User can't make loan a book due to suspension rules" })
    }
    next();
};
