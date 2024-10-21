const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Voucher = sequelize.define(
  "Voucher",
  {
    voucherCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    minOrderValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
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

module.exports = Voucher;
