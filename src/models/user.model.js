// src/models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            min: 0,
        },
        email: {
            type: String,
            required: true,
            unique: true,        // mỗi email chỉ 1 user
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            default: "access",
        },
    },
    {
        timestamps: true, // tự tạo createdAt & updatedAt
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;