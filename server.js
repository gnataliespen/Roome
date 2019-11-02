const express = require("express");
const connectDB = require("./config/db");
const indexRouter = require("./routes/index");
const productRouter = require("./routes/productRouter");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();

//Connect to database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
dotenv.config();

//Define Routes
app.use("/", indexRouter);
app.use("/products", productRouter);

const { port } = require("./config/config");

app.listen(port, () => console.log(`Server started on ${port}`));
