const { Author, Book_rating, Book_review, Book_view, Book, Category, Favorite, Genre, Leanguage, Loan, Preference, Publisher, User, sequelize } = require('../../models');
const bcrypt = require('bcryptjs');
const { Sequelize, where } = require('sequelize');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadConfig = require('../config/update');
const upload = multer(uploadConfig);
const fs = require('fs/promises');
const path = require('path');
const controller = require('../controllers/controller');
const JWT_SECRET = process.env.JWT_SECRET;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require("sequelize")
const { getPagination, getMonthWindow } = require('../utils/queryHelper');

module.exports = {
  /*
  search
  */
  async view(req, res, next) {
    try {
      const { id } = req.query;

      const book = await Book.findByPk(id, {
        attributes: {
          include: [
            [
              sequelize.literal(`(
                            SELECT AVG(rating)
                            FROM Book_ratings AS review
                            WHERE review.book_id = Book.id
                        )`),
              'ratingAverage'
            ],
            [
              sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Book_views AS view
                            WHERE view.book_id = Book.id
                        )`),
              'viewsCount'
            ]
          ]
        },
        include: [
          {
            model: Publisher,
            as: 'publisher',
            attributes: ['name']
          },
          {
            model: Author,
            as: 'author',
            attributes: ['name']
          },
          {
            model: Leanguage,
            as: 'leanguage',
            attributes: ['name']
          },
          {
            model: Genre,
            as: 'genre',
            attributes: ['name']
          },
          {
            model: Category,
            as: 'category',
            attributes: ['name']
          },
          {
            model: Book_review,
            as: 'reviews',
            limit: 10,
            order: [['createdAt', 'DESC']]
          }
        ]
      });

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      await Book_view.create({ book_id: id, user_id: req.user.id });/////

      return res.json(book);

    } catch (err) {
      next(err);
    }
  },
  async getMostViewed(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);

      const topViews = await Book_view.findAll({
        attributes: [
          'book_id',
          [sequelize.fn('COUNT', sequelize.col('book_id')), 'monthlyViews']
        ],
        where: {
          createdAt: { [Op.gte]: getMonthWindow() }
        },
        group: ['book_id'],
        order: [[sequelize.literal('monthlyViews'), 'DESC']],
        limit,
        offset,
        include: [{
          model: Book,
          as: 'book',
          attributes: ['id', 'title']
        }]
      });

      const results = topViews.map(v => ({
        ...v.book.toJSON(),
        monthlyViews: v.dataValues.monthlyViews
      }));

      return res.json(results);
    } catch (err) { next(err); }
  },
  async getByPublisher(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);
      const { id } = req.params;
      let publisher = Publisher.findByPk(id)
      if (!publisher) {
        res.status(404).json({ error: "Publisher not found" })
      }

      const books = await Book.findAll({
        limit,
        offset,
        include: [
          {
            model: Publisher,
            as: 'publisher',
            where: { id: id },
            attributes: ['id', 'name']
          },
          { model: Author, as: 'author', attributes: ['name'] }
        ]
      });

      return res.json(books);
    } catch (err) { next(err); }
  },
  async getByAuthor(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);
      const { id } = req.params;
      let author = Author.findByPk(id)
      if (!author) {
        res.status(404).json({ error: "Author not found" })
      }

      const books = await Book.findAll({
        limit,
        offset,
        include: [
          {
            model: Author,
            as: 'author',
            where: { id: id },
            attributes: ['id', 'name']
          },
          { model: Publisher, as: 'publisher', attributes: ['name'] }
        ]
      });

      return res.json(books);
    } catch (err) { next(err); }
  },
  async getByCategory(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);
      const { id } = req.params;
      let category = Category.findByPk(id)
      if (!category) {
        res.status(404).json({ error: "Category not found" })
      }

      const books = await Book.findAll({
        limit,
        offset,
        include: [
          {
            model: Category,
            as: 'category',
            where: { id: id },
            attributes: ['id', 'name']
          },
          { model: Author, as: 'author', attributes: ['name'] }
        ]
      });

      return res.json(books);
    } catch (err) { next(err); }
  },
  async getByGenre(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);
      const { id } = req.params;
      let genre = Genre.findByPk(id)
      if (!genre) {
        res.status(404).json({ error: "Genre not found" })
      }

      const books = await Book.findAll({
        limit,
        offset,
        include: [
          {
            model: Genre,
            as: 'genre',
            where: { id: id },
            attributes: ['id', 'name']
          },
          { model: Author, as: 'author', attributes: ['name'] }
        ]
      });

      return res.json(books);
    } catch (err) { next(err); }
  },
  async store(req, res, next) {
    try {
      let { title, subtitle, isbn, leanguage, sinopsis, pages, publication_year, author, publisher, category, genre, inventory } = req.body
      let [book_leanguage] = await Leanguage.findOrCreate({
        where: { name: leanguage }
      })
      let [book_author] = await Author.findOrCreate({
        where: { name: author }
      })
      let [book_publisher] = await Publisher.findOrCreate({
        where: { name: publisher }
      })
      let [book_category] = await Category.findOrCreate({
        where: { name: category }
      })
      let [book_genre] = await Genre.findOrCreate({
        where: { name: genre }
      })
      let book = await Book.create({
        title,
        subtitle,
        isbn,
        leanguage_id: book_leanguage.id,
        sinopsis,
        pages,
        publication_year,
        author_id: book_author.id,
        publisher_id: book_publisher.id,
        category_id: book_category.id,
        genre_id: book_genre.id,
        inventory
      })
      return res.status(200).json(book)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      let { id, title, subtitle, isbn, leanguage, sinopsis, pages, publication_year, author, publisher, category, genre, inventory } = req.body
      let book = await Book.findByPk(id)
      let [book_leanguage] = await Leanguage.findOrCreate({
        where: { name: leanguage }
      })
      let [book_author] = await Author.findOrCreate({
        where: { name: author }
      })
      let [book_publisher] = await Publisher.findOrCreate({
        where: { name: publisher }
      })
      let [book_category] = await Category.findOrCreate({
        where: { name: category }
      })
      let [book_genre] = await Genre.findOrCreate({
        where: { name: genre }
      })
      await book.update({
        title,
        subtitle,
        isbn,
        leanguage_id: book_leanguage.id,
        sinopsis,
        pages,
        publication_year,
        author_id: book_author.id,
        publisher_id: book_publisher.id,
        category_id: book_category.id,
        genre_id: book_genre.id,
        inventory
      })
      return res.status(202).json({
        message: "Book successfully updated"
      })
    } catch (err) {
      next(err)
    }
  },
  async updateCover(req, res, next) {
    try {
      console.log('file:', req.file);
      console.log('body:', req.body);
      const { id } = req.query;
      const book = await User.findByPk(id);
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      if (!book) {
        return res.status(400).json({ error: 'Book not found' });
      }
      await controller.imageUpload({
        model: book,
        file: req.file,
        field: 'cover'
      });
      return res.status(202).send();
    } catch (err) {
      next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      let { id } = req.query
      let book = await Book.findByPk(id)
      if (!book) {
        return res.status(404).json({ error: "Book not found" })
      }
      let loan = await Loan.findOne({
        where: {
          active: true,
          book_id: book.id
        }
      })
      if (loan) {
        return res.status(409).json({ error: "Unable to delete book because there is an active loan related to it" })
      }
      await controller.destroyImage({ model: book, field: "cover" })
      await book.destroy()
      return res.status(202).json({
        message: "Book successfully deleted"
      })
    } catch (err) {
      next(err)
    }
  },
};
