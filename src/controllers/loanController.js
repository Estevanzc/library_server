const { Author, Book_rating, Book_review, Book_view, Book, Category, Favorite, Genre, Leanguage, Loan, Preference, Publisher, User, sequelize } = require('../../models');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
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
  async index(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);

      const loans = await Loan.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Book,
            as: "book",
            attributes: ["title", "subtitle", "pages", "publication_year", "author_id", "publisher_id", "category_id", "genre_id", "cover"],
            include: [
              {
                model: Author,
                as: "author",
                attributes: ["name"],
              },
              {
                model: Publisher,
                as: "publisher",
                attributes: ["name"],
              },
              {
                model: Genre,
                as: "genre",
                attributes: ["name"],
              },
              {
                model: Category,
                as: "category",
                attributes: ["name"],
              },
            ],
          },
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email", "photo"],
          },
        ],
      });

      if (!loans || loans.length === 0) {
        return res.status(404).json({ message: "No loans found." });
      }

      return res.json(loans);
    } catch (err) {
      next(err);
    }
  },
  async getLoansByUser(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);
      const { id } = req.params;
      if (id != req.user.id && req.user.type != 2) {
        return res.status(403).json({ error: "Access denied" })
      }

      const loans = await Loan.findAll({
        where: { user_id: id },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Book,
            as: "book",
            attributes: ["title", "subtitle", "pages", "publication_year", "author_id", "publisher_id", "category_id", "genre_id", "cover"],
            include: [
              {
                model: Author,
                as: "author",
                attributes: ["name"],
              },
              {
                model: Publisher,
                as: "publisher",
                attributes: ["name"],
              },
              {
                model: Genre,
                as: "genre",
                attributes: ["name"],
              },
              {
                model: Category,
                as: "category",
                attributes: ["name"],
              },
            ],
          }
        ],
      });

      if (!loans || loans.length === 0) {
        return res.status(404).json({ message: "No loans found for this user yet." });
      }

      return res.json(loans);
    } catch (err) {
      next(err);
    }
  },
  async getMostLoaned(req, res, next) {
    try {
      const { limit, offset } = getPagination(req.query);

      const topLoans = await Loan.findAll({
        attributes: [
          'book_id',
          [sequelize.fn('COUNT', sequelize.col('book_id')), 'monthlyLoans']
        ],
        where: { createdAt: { [Op.gte]: getMonthWindow() } },
        group: ['book_id'],
        order: [[sequelize.literal('monthlyLoans'), 'DESC']],
        limit,
        offset,
        include: [{ model: Book, as: 'book', attributes: ['id', 'title'] }]
      });

      const results = topLoans.map(l => ({
        ...l.book.toJSON(),
        monthlyLoans: l.dataValues.monthlyLoans
      }));

      return res.json(results);
    } catch (err) { next(err); }
  },
  async store(req, res, next) {
    try {
      let { user_id, book_id } = req.body
      let loan = await Loan.create({
        user_id: user_id,
        book_id: book_id,
      })
      return res.status(200).json(loan)
    } catch (err) {
      next(err)
    }
  },
  async renew(req, res, next) {
    try {
      let { id } = req.query
      let loan = await Loan.findByPk(id)
      if (!loan) {
        return res.status(404).json({ error: "Loan not found" })
      }
      if (loan.renews == 10) {
        return res.status(403).json({ error: "User have reached the limit of 10 renews" })
      }
      if (req.user.type == 2 || req.user.id == loan.user_id) {
        await loan.update({
          renews: loan.renews + 1
        })
        return res.status(202).json({
          message: "Loan successfully renewed"
        })
      }
      return res.status(403).json({ error: "Access denied" })
    } catch (err) {
      next(err)
    }
  },
  async book_return(req, res, next) {
    try {
      let { id } = req.query
      let loan = await Loan.findByPk(id)
      if (!loan || !loan.active) {
        return res.status(404).json({ error: "Loan not found or inactive" })
      }
      await loan.update({
        active: false
      })
      let current_date = dayjs()
      let return_date = dayjs(loan.createdAt).add(loan.renews + 1, "week")
      let response = "Book successfully returned"
      if (current_date.isAfter(return_date)) {
        let user = await User.findByPk(loan.user_id)
        let suspension = current_date.add(current_date.diff(return_date, "days"), "days")
        await user.update({
          suspension_date: suspension
        })
        response += `, but user has been suspended until ${suspension.format("MMM D, YYYY")}`
      }
      return res.status(200).json({ message: response })
    } catch (err) {
      next(err)
    }
  }
};
