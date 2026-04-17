const { Author, Book_rating, Book_review, Book_view, Book, Category, Favorite, Genre, Leanguage, Loan, Preference, Publisher, User } = require('../../models');
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

module.exports = {
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
        return res.status(409).json({error: "Unable to delete book because there is a active loan related to it"})
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
