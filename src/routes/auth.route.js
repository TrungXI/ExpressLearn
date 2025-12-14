const express = require("express");
const router = express.Router();

const { register, login, getMe, changePassword } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

// Đăng ký
router.post("/register", register);

// Đăng nhập
router.post("/login", login);

// Lấy thông tin user hiện tại (cần token)
router.get("/me", authMiddleware, getMe);

router.post("/change-password", authMiddleware, changePassword);

module.exports = router;