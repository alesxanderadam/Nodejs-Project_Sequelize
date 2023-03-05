const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Evaluate.init(sequelize, DataTypes);
}

class Evaluate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    evalute_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurant',
        key: 'res_id'
      }
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Evaluate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "evalute_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "res_id",
        using: "BTREE",
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
  }
}
