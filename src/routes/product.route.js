const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

const { authMiddleware } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../config/multer");

// GET /api/products
router.get("/", getAllProducts);

// GET /api/products/:id
router.get("/:id", getProductById);

// POST /api/products  – admin + upload 1 ảnh field "image"
router.post(
    "/",
    authMiddleware,
    isAdmin,
    upload.single("image"), // Multer xử lý file
    createProduct
);

// PUT /api/products/:id – có thể kèm ảnh mới
router.put(
    "/:id",
    authMiddleware,
    isAdmin,
    upload.single("image"),
    updateProduct
);

// DELETE /api/products/:id
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;