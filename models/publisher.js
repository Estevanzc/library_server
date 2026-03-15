'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publisher extends Model {
    static associate(models) {
      Publisher.hasMany(models.Book, {foreignKey: "publisher_id", as: "books"})
    }
  }
  Publisher.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    modelName: 'Publisher',
  });
  return Publisher;
};