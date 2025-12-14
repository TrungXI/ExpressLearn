const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu file + tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // thư mục lưu file
  },
  filename: function (req, file, cb) {
    // đặt tên: timestamp-originalname
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

// Filter loại file (chỉ cho image)
function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Chỉ cho phép upload file ảnh"), false);
  }

  cb(null, true);
}

// Giới hạn dung lượng: 5MB
const limits = {
  fileSize: 5 * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;