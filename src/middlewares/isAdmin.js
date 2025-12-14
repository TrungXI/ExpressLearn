function isAdmin(req, res, next) {
    // authMiddleware đã gắn decoded token vào req.user
    if (!req.user || req.user.role !== "admin") {
        return res
            .status(403)
            .json({ message: "Bạn không có quyền truy cập (cần role admin)" });
    }

    next();
}

module.exports = isAdmin;