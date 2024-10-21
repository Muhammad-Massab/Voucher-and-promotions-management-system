require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");

const voucherRoutes = require("./routes/voucherRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const discountRoutes = require("./routes/discountRoutes");

const app = express();
app.use(express.json());

app.use("/api/vouchers", voucherRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/discounts", discountRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
});

export default app;
