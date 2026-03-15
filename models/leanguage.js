'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leanguage extends Model {
    static associate(models) {
      Leanguage.hasMany(models.Book, { foreignKey: "leanguage_id", as: "books" })
    }
  }
  Leanguage.init({
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
    modelName: 'Leanguage',
  });
  return Leanguage;
};