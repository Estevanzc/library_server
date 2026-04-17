import Book from "../../../../models";

module.exports = async (req, res, next) => {
    let { title, subtitle, isbn, leanguage, sinopsis, pages, publication_year, author, publisher, category, genre, inventory } = req.body;

    if (!title || !subtitle || !isbn || !leanguage || !sinopsis || !pages || !publication_year || !author || !publisher || !category || !genre || !inventory) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (title.length < 1 || title.length > 100) {
        return res.status(400).json({ error: "Title length must be between 1 and 100 characters long" })
    }
    if (subtitle.length < 1 || subtitle.length > 100) {
        return res.status(400).json({ error: "Subtitle length must be between 1 and 100 characters long" })
    }
    isbn = isbn.toString().replace(/\D/g, "")
    let book_data = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
    book_data = await book_data.json()
    if (Object.keys(book_data).length == 0) {
        return res.status(400).json({ error: "Invalid ISBN" })
    } else {
        let book = await Book.findOne({
            where: {isbn: isbn}
        })
        if (book) {
            return res.status(400).json({ error: "ISBN already exists in the catalog" })
        }
    }
    if (sinopsis.length < 120) {
        return res.status(400).json({ error: "Sinopsis length must be at least 120 characters long" })
    }
    if (pages <= 0) {
        return res.status(400).json({ error: "Number of pages must be at least 1" })
    }
    if (inventory <= 0) {
        return res.status(400).json({ error: "Invetory must be at least 1" })
    }

    if (publication_year > new Date().getFullYear()) {
        return res.status(400).json({ error: 'Invalid publication year' });
    }

    next();
};
