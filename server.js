const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
var cors = require("cors");

const connectDB = require("./config/db");
const indexRouter = require("./routes/index");
const productRouter = require("./routes/productRouter");
const authRouter = require("./routes/authRouter");
const cartRouter = require("./routes/cartRouter");

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
app.use("/cart", cartRouter);

const { port } = require("./config/config");

app.listen(port, () => console.log(`Server started on ${port}`));
