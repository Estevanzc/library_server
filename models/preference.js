'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preference extends Model {
    static associate(models) {
      Preference.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
    }
  }
  Preference.init({
    keyword: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: {
          args: [1, 100],
          msg: "Keyword must have length between 1 and 100"
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Preference',
  });
  return Preference;
};