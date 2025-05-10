require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
// ---------Routes----------
// const adminRoute = require("./Routes/adminRoute");
const LeadSourceRoute = require("./Routes/Lead/LeadSourceRoute");
const LeadOccupationRoute = require("./Routes/Lead/LeadOccupationRoute");
const LeadAreaRoute = require("./Routes/Lead/LeadAreaRoute");
const LeadSubAreaRoute = require("./Routes/Lead/LeadSubAreaRoute");
const LeadCityRoute = require("./Routes/Lead/CityRoute");
// ---------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.dbUrl)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ---------Routes----------

// app.use("/admin", adminRoute);
// app.use("/Images", express.static("Images"));
app.use("/api/leadSource", LeadSourceRoute);
app.use("/api/leadOccupation", LeadOccupationRoute);
app.use("/api/leadarea", LeadAreaRoute);
app.use("/api/leadsubarea", LeadSubAreaRoute);
app.use("/api/leadcity", LeadCityRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Run on ${port} Port`);
});
