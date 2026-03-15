'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Book, { foreignKey: "category_id", as: "books" })
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [1, 100],
          msg: "Name must have length between 1 and 100"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};