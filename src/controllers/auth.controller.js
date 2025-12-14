const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// SECRET dùng để ký token (thực tế nên để trong biến môi trường)
const JWT_SECRET = "d4e7b9f0c12a48b5f3a9c6e2d8f147b0e93a5c72d4f8b1e6c3d2f0a9b7c4e8d1"; // TODO: chuyển sang process.env.JWT_SECRET

// POST /auth/register
async function register(req, res) {
    try {
        const { name, age, email, password, role } = req.body;

        if (!name || !age || !email || !password) {
            return res.status(400).json({ message: "Thiếu thông tin!" });
        }

        // Kiểm tra email đã tồn tại chưa
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email đã được sử dụng" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            age,
            email,
            password: hashedPassword,
            role
        });

        // Không trả password về cho client
        const userSafe = {
            id: newUser._id,
            name: newUser.name,
            age: newUser.age,
            email: newUser.email,
            role: newUser.role
        };

        res.status(201).json({
            message: "Đăng ký thành công",
            user: userSafe,
        });
    } catch (err) {
        console.error("Lỗi register:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

// POST /auth/login
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }

        // Tạo token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Đăng nhập thành công",
            token,
        });
    } catch (err) {
        console.error("Lỗi login:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

// GET /auth/me  (route bảo vệ)
async function getMe(req, res) {
    try {
        // authMiddleware đã gắn userId vào req.user
        const userId = req.user.userId;

        const user = await User.findById(userId).select("-password"); // bỏ password
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.json(user);
    } catch (err) {
        console.error("Lỗi getMe:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

// GET /auth/me  (route bảo vệ)
async function changePassword(req, res) {
    try {
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId) // bỏ password
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        // Không trả password về cho client
        const userSafe = {
            id: user._id,
            name: user.name,
            age: user.age,
            email: user.email,
            role: user.role
        };

        res.json(userSafe);
    } catch (err) {
        console.error("Lỗi changePassword:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

module.exports = {
    register,
    login,
    getMe,
    changePassword,
    JWT_SECRET, // export nếu middleware muốn dùng, hoặc chuyển qua env
};