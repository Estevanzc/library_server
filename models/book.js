'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Author, { foreignKey: "author_id", as: "author" })
      Book.belongsTo(models.Publisher, { foreignKey: "publisher_id", as: "publisher" })
      Book.belongsTo(models.Leanguage, { foreignKey: "leanguage_id", as: "leanguage" })
      Book.belongsTo(models.Category, { foreignKey: "category_id", as: "category" })
      Book.belongsTo(models.Genre, { foreignKey: "genre_id", as: "genre" })
      Book.hasMany(models.Book_rating, { foreignKey: "book_id", as: "ratings" })
      Book.hasMany(models.Book_review, { foreignKey: "book_id", as: "reviews" })
      Book.hasMany(models.Book_view, { foreignKey: "book_id", as: "views" })
      Book.hasMany(models.Favorite, { foreignKey: "book_id", as: "favorites" })
      Book.hasMany(models.Loan, { foreignKey: "book_id", as: "loans" })
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [1, 100],
          msg: "Title must have length between 1 and 100"
        }
      }
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [1, 100],
          msg: "Subtitle must have length between 1 and 100"
        }
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    leanguage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sinopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publisher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inventory: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};