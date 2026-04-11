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
// const { emailPage } = require('../utils/emailPage');
const { Op } = require("sequelize")

module.exports = {
  async store(req, res, next) {
    try {
      let { book_id, content } = req.body
      let book = await Book.findByPk(book_id)
      if (!book) {
        return res.status(404).json({ error: "Book not found" })
      }
      let book_review = await Book_review.create({
        book_id: book.id,
        user_id: req.user.id,
        content: content,
      })
      return res.status(200).json(book_review)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      let { id, content } = req.body
      let book_review = await Book_review.findByPk(id)
      if (!book_review) {
        return res.status(404).json({ error: "Book Review not found" })
      }
      await book_review.update({
        content
      })
      return res.status(202).json({
        message: "Book Review successfully updated"
      })
    } catch (err) {
      next(err)
    }
  },
  async destroy(req, res, next) {
    try {
      let { id } = req.query
      let book_review = await Book_review.findByPk(id)
      if (!book_review) {
        return res.status(404).json({ error: "Book Review not found" })
      }
      await book_review.destroy()
      return res.status(202).json({
        message: "Book Review successfully deleted"
      })
    } catch (err) {
      next(err)
    }
  },
};
