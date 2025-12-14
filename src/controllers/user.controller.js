// src/controllers/user.controller.js
const User = require("../models/user.model");

// GET /api/users
async function getAllUsers(req, res) {
    try {
        const { minAge, maxAge } = req.query;
        const query = {};
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        if (minAge) query.age = { ...query.age, $gte: Number(minAge) };
        if (maxAge) query.age = { ...query.age, $lte: Number(maxAge) };

        const users = await User.find(query).skip((page - 1) * limit).limit(limit);
        res.json(users);
    } catch (err) {
        console.error("Lỗi getAllUsers:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

// GET /api/users/:id
async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.json(user);
    } catch (err) {
        console.error("Lỗi getUserById:", err);
        res.status(400).json({ message: "ID không hợp lệ" });
    }
}

// POST /api/users
async function createUser(req, res) {
    try {
        const { name, age, email } = req.body;

        // Validate thêm ở controller (ngoài Mongoose)
        if (!name || age === undefined) {
            return res.status(400).json({ message: "Thiếu name hoặc age" });
        }

        // Tạo user trong DB
        const newUser = await User.create({ name, age, email });

        res.status(201).json({
            message: "Tạo user thành công",
            user: newUser,
        });
    } catch (err) {
        console.error("Lỗi createUser:", err);
        // Xử lý lỗi validate của Mongoose
        res.status(400).json({
            message: "Dữ liệu không hợp lệ",
            error: err.message,
        });
    }
}

// PUT /api/users/:id
async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const { name, age, email } = req.body;
        const user = await User.findById(id);
        if (user.role !== 'admin') {
            return res.status(200).json({ message: "Bạn không có quyền truy cập tác vụ này." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, age, email },
            {
                new: true, // trả về document sau khi update
                runValidators: true, // chạy validate trong schema
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.json({
            message: "Cập nhật user thành công",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Lỗi updateUser:", err);
        res.status(400).json({ message: "Dữ liệu hoặc ID không hợp lệ", error: err.message });
    }
}

// DELETE /api/users/:id
async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user.role !== 'admin') {
            return res.status(200).json({ message: "Bạn không có quyền truy cập tác vụ này." });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.json({
            message: "Xóa user thành công",
            deleted: deletedUser,
        });
    } catch (err) {
        console.error("Lỗi deleteUser:", err);
        res.status(400).json({ message: "ID không hợp lệ" });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};