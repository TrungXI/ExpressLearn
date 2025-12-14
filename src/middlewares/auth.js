const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../controllers/auth.controller");
const User = require("../models/user.model");
async function authMiddleware(req, res, next) {
    // Token thường được gửi qua header: Authorization: Bearer <token>
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Thiếu header Authorization" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Định dạng token không hợp lệ" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Lưu thông tin user vào req để dùng ở controller sau
        req.user = decoded; // { userId: ... }
        const user = await User.findById(req.user.userId);
        if (user == null) {
            return res.status(401).json({ message: "Người dùng không tồn tại" });
        }
        next();
    } catch (err) {
        console.error("Lỗi verify token:", err);
        return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
}

module.exports = authMiddleware;