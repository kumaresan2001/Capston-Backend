const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const BrandRouter = require("./routes/inventory");
const orderRoute = require("./routes/order");

// assign object to an app
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", async function (request, response) {
  response.send("Welcomes To Inventory Management !!!");
});

app.use("/user", userRouter);
app.use("/inventory", BrandRouter);
app.use("/orders", orderRoute);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Connection Success");
});
