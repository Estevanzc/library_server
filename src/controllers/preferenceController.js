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
  async getByPreference(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);

      const preferences = await Preference.findAll({
        where: { user_id: req.user.id },
        attributes: ['keyword']
      });

      let searchKeywords = [];
      preferences.forEach(pref => {
        if (pref.keyword) {
          const words = pref.keyword.split(',').map(kw => kw.trim()).filter(Boolean);
          searchKeywords.push(...words);
        }
      });

      if (searchKeywords.length === 0) {
        const fallbackBooks = await Book.findAll({
          limit,
          offset,
          include: [{ model: Author, as: 'author', attributes: ['name'] }]
        });
        return res.json({
          message: "No preferences established yet.",
          books: fallbackBooks
        });
      }

      const searchConditions = [];

      searchKeywords.forEach(keyword => {
        searchConditions.push(
          { title: { [Op.like]: `%${keyword}%` } },
          { subtitle: { [Op.like]: `%${keyword}%` } },
          { sinopsis: { [Op.like]: `%${keyword}%` } }
        );
      });

      const recommendedBooks = await Book.findAll({
        limit,
        offset,
        where: {
          [Op.or]: searchConditions
        },
        include: [
          { model: Author, as: 'author', attributes: ['name'] }
        ]
      });

      return res.json({
        keywords_used: searchKeywords,
        books: recommendedBooks
      });

    } catch (err) {
      next(err);
    }
  },
  async store(req, res, next) {
    try {
      let { keyword } = req.body
      if (keyword.length < 2) {
        return res.status(400).json({ error: "Preference keyword must be at least 2 characters long" })
      }
      let existing_preference = Preference.find({
        where: {
          keyword: keyword,
          user_id: req.user.id
        }
      })
      if (existing_preference) {
        return res.status(409).json({ error: "Keyword already added in your preferences" })
      }
      let preference = await Preference.create({
        keyword: keyword,
        user_id: req.user.id
      })
      return res.status(200).json(preference)
    } catch (err) {
      next(err)
    }
  },
  async destroy(req, res, next) {
    try {
      let { id } = req.query
      let preference = await Preference.findByPk(id)
      if (!preference || preference.user_id != req.user.id) {
        return res.status(404).json({ error: "Keyword not found on your preferences" })
      }
      await preference.destroy()
      return res.status(202).json({
        message: "Keyword successfully deleted from your preferences"
      })
    } catch (err) {
      next(err)
    }
  },
};
