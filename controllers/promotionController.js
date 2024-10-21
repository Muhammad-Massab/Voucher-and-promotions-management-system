const Promotion = require("../models/Promotion");

exports.createPromotion = async (req, res) => {
  const {
    promotionCode,
    eligibleProducts,
    discountType,
    discountValue,
    expirationDate,
    totalUsesAllowed,
  } = req.body;
  try {
    const promotion = await Promotion.create({
      promotionCode:
        promotionCode || Math.random().toString(36).substr(2, 9).toUpperCase(),
      eligibleProducts,
      discountType,
      discountValue,
      expirationDate,
      totalUsesAllowed,
    });
    res.status(201).json(promotion);
  } catch (err) {
    res.status(500).json({ error: "Error creating promotion" });
  }
};

exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll({
      where: {
        expirationDate: { [sequelize.Op.gt]: new Date() },
      },
    });
    res.status(200).json(promotions);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving promotions" });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByPk(req.params.id);
    if (!promotion)
      return res.status(404).json({ error: "Promotion not found" });
    await promotion.update(req.body);
    res.status(200).json(promotion);
  } catch (err) {
    res.status(500).json({ error: "Error updating promotion" });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByPk(req.params.id);
    if (!promotion)
      return res.status(404).json({ error: "Promotion not found" });
    await promotion.destroy();
    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting promotion" });
  }
};
