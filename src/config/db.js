// src/config/db.js
const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/express-nodejs");
        console.log("✅ Kết nối MongoDB thành công");
    } catch (err) {
        console.error("❌ Lỗi kết nối MongoDB:", err);
        process.exit(1); // Dừng app nếu lỗi
    }
}

module.exports = connectDB;