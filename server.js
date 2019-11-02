const express = require("express");
const connectDB = require("./config/db");
const indexRouter = require("./routes/index");
const productRouter = require("./routes/productRouter");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
var cors = require("cors");

const app = express();

//Connect to database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
dotenv.config();
app.use(cors());

//Define Routes
app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/auth", authRouter);

const { port } = require("./config/config");

app.listen(port, () => console.log(`Server started on ${port}`));
