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
      let { book_id, rating } = req.body
      let book = await Book.findByPk(book_id)
      if (!book) {
        return res.status(404).json({ error: "Book not found" })
      }
      if (!Number(rating) || rating < 0 || rating > 10) {
        return res.status(400).json({ error: "Rating num must be between 0 and 10" })
      }
      let book_rating = await Book_rating.create({
        book_id: book.id,
        user_id: req.user.id,
        rating: rating,
      })
      return res.status(200).json(book_rating)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      let { id, rating } = req.body
      let book_rating = await Book_rating.findByPk(id)
      if (!book_rating) {
        return res.status(404).json({ error: "Book rating not found" })
      }
      if (book_rating.user_id != req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
      if (!Number(rating) || rating < 0 || rating > 10) {
        return res.status(400).json({ error: "Rating num must be between 0 and 10" })
      }
      await book_rating.update({
        rating
      })
      return res.status(202).json({
        message: "Book rating successfully updated"
      })
    } catch (err) {
      next(err)
    }
  },
};
