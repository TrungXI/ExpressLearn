// src/controllers/product.controller.js
const Product = require("../models/product.model");
// GET /api/products
async function getAllProducts(req, res) {
    try {
        const products = await Product.find(); // lấy tất cả sản phẩm từ DB
        res.json(products);
    } catch (err) {
        console.error("Lỗi getAllProducts:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

// GET /api/products/:id
async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);
        const product = await Product.find(id); // lấy tất cả sản phẩm từ DB

        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        res.json(product);
    } catch (err) {
        console.error("Lỗi getProductById:", err);
        res.status(400).json({ message: "ID không hợp lệ" });
    }
}

// POST /api/products
async function createProduct(req, res) {
    try {
        const { name, price, description, inStock } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: "Thiếu name hoặc price" });
        }

        if (typeof name !== "string" || name.trim().length < 3) {
            return res.status(400).json({ message: "Tên sản phẩm quá ngắn" });
        }

        if (typeof price !== "number" || price < 0) {
            return res.status(400).json({ message: "Giá sản phẩm không hợp lệ" });
        }
        // file được multer xử lý trong req.file
        let imageUrl;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        const newProduct = {
            name: name.trim(),
            price,
            description,
            inStock,
            imageUrl
        };

        var data = await Product.create(newProduct);
        console.log("data", data);

        res.status(201).json({
            message: "Tạo sản phẩm thành công",
            product: newProduct,
        });
    } catch (err) {
        console.error("Lỗi createProduct:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

// PUT /api/products/:id
async function updateProduct(req, res) {

    try {
        const id = Number(req.params.id);
        const { name, price } = req.body;
        var product = await Product.find(id); // lấy tất cả sản phẩm từ DB
        if (product === null) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        if (name !== undefined) {
            if (typeof name !== "string" || name.trim().length < 3) {
                return res.status(400).json({ message: "Tên sản phẩm quá ngắn" });
            }
            product.name = name.trim();
        }

        if (price !== undefined) {
            if (typeof price !== "number" || price < 0) {
                return res.status(400).json({ message: "Giá sản phẩm không hợp lệ" });
            }
            product.price = price;
        }
        // nếu có file upload mới
        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        res.json({
            message: "Cập nhật sản phẩm thành công",
            product: updatedProduct,
        });
    } catch (err) {
        console.error("Lỗi updateProduct:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

// DELETE /api/products/:id
async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product = await Product.find(id);

        if (product === null) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        await Product.deleteOne(product);

        res.json({
            message: "Xóa sản phẩm thành công",
            deleted,
        });
    } catch (err) {
        console.error("Lỗi deleteProduct:", err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};