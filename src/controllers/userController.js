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
  async profile(req, res, next) {
  },
  async register(req, res, next) {
    try {
      const { name, email, password, password_confirmation, birth, type, registration } = req.body;

      const userExists = await User.findOne({
        where: {
          [Op.or]: [
            { email: email },
            { registration: registration }
          ]
        }
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
      if (password != password_confirmation) {
        return res.status(400).json({
          error: "Password and its confirmation doesn't match"
        })
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        birth,
        registration,
        type,
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      let { id, name, email, birth } = req.body
      let user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      if (req.user.id == id) {
        await user.update({
          name,
          email,
          birth,
        });
        return res.status(202).json({
          message: "Profile data updated successfully"
        });
      }
      return res.status(403).json({ error: "Access denied" })
    } catch (err) {
      next(err)
    }
  },
  async updatePhoto(req, res, next) {
    try {
      console.log('file:', req.file);
      console.log('body:', req.body);
      const user_id = req.user.id;
      const user = await User.findByPk(user_id);
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      await controller.imageUpload({
        model: user,
        file: req.file,
        field: 'photo'
      });
      return res.status(202).send();
    } catch (err) {
      next(err);
    }
  },
  async updateBanner(req, res, next) {
    try {
      const user_id = req.user.id;
      const user = await User.findByPk(user_id);
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      await controller.imageUpload({
        model: user,
        file: req.file,
        field: 'banner'
      });
      return res.status(202).send();
    } catch (err) {
      next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({error: "User not found"})
      }
      let loan = await Loan.findOne({
        where: {
          active: true,
          user_id: id
        }
      })
      if (loan) {
        return res.status(409).json({error: "Can't delete user because it is related to an active loan"})
      }
      if (req.user.id == id || req.user.type == 2) {
        await controller.destroyImage({ model: user, field: "photo" })
        await controller.destroyImage({ model: user, field: "banner" })
        await user.destroy();
        return res.status(204).send();
      }
      return res.status(403).json({ error: 'Access denied' });
    } catch (err) {
      next(err);
    }
  },
  async password_recover(req, res, next) {
    try {
      let { email } = req.body
      let user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(404).json({
          error: "User not found"
        })
      }
      let token = crypto.randomBytes(20).toString("hex")
      await user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      })
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        }
      })

      let resetUrl = `http://localhost:3000/resetlink/${token}`
      let emailMessage = emailPage(user.name, resetUrl)
      const mailOptions = {
        to: user.email,
        from: "wisely.assistance@gmail.com",
        subject: "Password reset request",
        text: `Please click this link to reset your password: ${resetUrl}`,
        html: emailMessage
      }
      await transporter.sendMail(mailOptions)
      return res.status(200).json({
        message: "Request email sent"
      })
    } catch (err) {
      next(err)
    }
  },
  async password_update(req, res, next) {
    try {
      let { password, password_confirmation, token } = req.body
      let user = await User.findOne({
        where: {
          resetPasswordToken: token
        }
      })
      if (password != password_confirmation || password.trim() == "") {
        return res.status(400).json({
          error: "Passwords don't match or invalid"
        })
      }
      if (!user) {
        return res.status(404).json({
          error: "User not found or invalid token"
        })
      }
      if (user.resetPasswordExpires < Date.now()) {
        return res.status(400).json({
          error: "Expired token"
        })
      }
      let new_password = await bcrypt.hash(password, 10);
      await user.update({
        resetPasswordToken: null,
        resetPasswordExpires: null,
        password: new_password,
      })
      return res.status(200).json({
        message: "Password updated successfully"
      })
    } catch (err) {
      next(err)
    }
  },
};
