const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const transactionRoute = require("./Routes/TransactionRoute");
const harvestRoute = require("./Routes/harvestRoutes");
// require('./cronJob');
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(cookieParser());

app.use(express.json());

// Middleware to set SameSite=None and Secure=true for cookies
app.use((req, res, next) => {
  res.setHeader("Set-Cookie", "SameSite=None; Secure");
  next();
});

app.use("/tn", transactionRoute);
app.use("/h", harvestRoute);
