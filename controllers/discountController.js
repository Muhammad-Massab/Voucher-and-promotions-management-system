const Voucher = require("../models/Voucher");
const Promotion = require("../models/Promotion");
const calculateDiscount = require("../utils/calculateDiscount");

exports.applyDiscount = async (req, res) => {
  const { orderId, voucherCode, promotionCode, orderTotal, productIds } =
    req.body;

  try {
    let discount = 0;

    if (voucherCode) {
      const voucher = await Voucher.findOne({ where: { voucherCode } });
      if (
        !voucher ||
        voucher.expirationDate < new Date() ||
        voucher.totalUses >= voucher.totalUsesAllowed ||
        orderTotal < voucher.minOrderValue
      ) {
        return res
          .status(400)
          .json({ error: "Invalid or inapplicable voucher" });
      }
      discount += calculateDiscount(
        voucher.discountType,
        voucher.discountValue,
        orderTotal
      );
      await voucher.increment("totalUses");
    }

    if (promotionCode) {
      const promotion = await Promotion.findOne({ where: { promotionCode } });
      const eligible = productIds.every((id) =>
        promotion.eligibleProducts.includes(id)
      );
      if (
        !promotion ||
        promotion.expirationDate < new Date() ||
        promotion.totalUses >= promotion.totalUsesAllowed ||
        !eligible
      ) {
        return res
          .status(400)
          .json({ error: "Invalid or inapplicable promotion" });
      }
      discount += calculateDiscount(
        promotion.discountType,
        promotion.discountValue,
        orderTotal
      );
      await promotion.increment("totalUses");
    }

    if (discount > 0.5 * orderTotal) discount = 0.5 * orderTotal;

    res.status(200).json({ discount, finalPrice: orderTotal - discount });
  } catch (err) {
    res.status(500).json({ error: "Error applying discount" });
  }
};
