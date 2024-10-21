const Voucher = require("../models/Voucher");

exports.createVoucher = async (req, res) => {
  const {
    voucherCode,
    discountType,
    discountValue,
    expirationDate,
    totalUsesAllowed,
    minOrderValue,
  } = req.body;
  try {
    const voucher = await Voucher.create({
      voucherCode:
        voucherCode || Math.random().toString(36).substr(2, 9).toUpperCase(),
      discountType,
      discountValue,
      expirationDate,
      totalUsesAllowed,
      minOrderValue,
    });
    res.status(201).json(voucher);
  } catch (err) {
    res.status(500).json({ error: "Error creating voucher" });
  }
};

exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.findAll({
      where: {
        expirationDate: { [sequelize.Op.gt]: new Date() },
      },
    });
    res.status(200).json(vouchers);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving vouchers" });
  }
};

exports.updateVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByPk(req.params.id);
    if (!voucher) return res.status(404).json({ error: "Voucher not found" });
    await voucher.update(req.body);
    res.status(200).json(voucher);
  } catch (err) {
    res.status(500).json({ error: "Error updating voucher" });
  }
};

exports.deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByPk(req.params.id);
    if (!voucher) return res.status(404).json({ error: "Voucher not found" });
    await voucher.destroy();
    res.status(200).json({ message: "Voucher deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting voucher" });
  }
};
