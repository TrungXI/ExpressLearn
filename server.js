const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const connectDB = require("./src/config/db");
connectDB();

app.use(express.json());

// static cho thư mục uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const logger = require("./src/middlewares/logger");
app.use(logger);

const userRouter = require("./src/routes/user.route");
const productRouter = require("./src/routes/product.route");
const authRouter = require("./src/routes/auth.route");

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("API upload file đang chạy!");
});

app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
});