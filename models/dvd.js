'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DVD extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DVD.belongsTo(models.Imdb, {foreignKey: 'imdb_id'})
      DVD.belongsTo(models.Location, {foreignKey: 'location_id'})
      DVD.belongsTo(models.User, {foreignKey: 'user_id'})
    }
  };
  DVD.init({
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    imdb_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DVD',
  });
  return DVD;
};