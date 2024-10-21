// Function to calculate discount based on type and value
function calculateDiscount(discountType, discountValue, orderTotal) {
  if (discountType === "percentage") {
    return (orderTotal * discountValue) / 100;
  } else if (discountType === "fixed") {
    return discountValue;
  }
  return 0;
}

module.exports = calculateDiscount;
