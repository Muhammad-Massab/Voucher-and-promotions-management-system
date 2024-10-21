const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Promotion = sequelize.define(
  "Promotion",
  {
    promotionCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    eligibleProducts: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    discountType: {
      type: DataTypes.ENUM("percentage", "fixed"),
      allowNull: false,
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalUsesAllowed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalUses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Promotion;
