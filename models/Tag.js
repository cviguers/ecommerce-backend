const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection.js');

class Tag extends Model {}

// defining tag column
Tag.init( 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// export tag
module.exports = Tag;