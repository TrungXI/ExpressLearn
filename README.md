# Express Tutorial - API Server

Dự án Express.js với MongoDB, JWT Authentication và File Upload.

## 📋 Yêu cầu hệ thống

- Node.js (phiên bản 14 trở lên)
- MongoDB (đang chạy trên localhost:27017)
- npm hoặc yarn

## 🚀 Cài đặt và Khởi chạy

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd express-tutorial
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Đảm bảo MongoDB đang chạy

Đảm bảo MongoDB đã được cài đặt và đang chạy trên máy của bạn:

```bash
# Kiểm tra MongoDB đang chạy
mongosh
# hoặc
mongo
```

Nếu chưa cài đặt MongoDB, bạn có thể:
- Tải và cài đặt từ [MongoDB Official Website](https://www.mongodb.com/try/download/community)
- Hoặc sử dụng Docker: `docker run -d -p 27017:27017 mongo`

### Bước 4: Tạo thư mục uploads (nếu chưa có)

```bash
mkdir uploads
```

Thư mục này sẽ được sử dụng để lưu trữ các file được upload.

### Bước 5: Khởi chạy server

```bash
node server.js
```

Server sẽ chạy tại: `http://localhost:3000`

Bạn sẽ thấy thông báo:
```
✅ Kết nối MongoDB thành công
Server chạy tại http://localhost:3000
```

## 📁 Cấu trúc dự án

```
express-tutorial/
├── server.js                 # Entry point của ứng dụng
├── package.json              # Dependencies và scripts
├── uploads/                  # Thư mục lưu file upload
├── src/
│   ├── config/
│   │   ├── db.js            # Cấu hình kết nối MongoDB
│   │   └── multer.js        # Cấu hình upload file
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── auth.js          # JWT authentication middleware
│   │   ├── isAdmin.js       # Admin authorization middleware
│   │   └── logger.js        # Request logging middleware
│   ├── models/
│   │   ├── product.model.js
│   │   └── user.model.js
│   └── routes/
│       ├── auth.route.js
│       ├── product.route.js
│       └── user.route.js
└── README.md
```

## 🔌 API Endpoints

### Authentication (`/auth`)

- `POST /auth/register` - Đăng ký tài khoản mới
- `POST /auth/login` - Đăng nhập
- `GET /auth/me` - Lấy thông tin user hiện tại (cần token)
- `POST /auth/change-password` - Đổi mật khẩu (cần token)

### Users (`/api/users`)

- Các endpoint quản lý users (chi tiết xem trong `src/routes/user.route.js`)

### Products (`/api/products`)

- Các endpoint quản lý products (chi tiết xem trong `src/routes/product.route.js`)

## 🔧 Cấu hình

### Database

MongoDB connection string được cấu hình trong `src/config/db.js`:
- Database: `express-nodejs`
- Host: `127.0.0.1:27017`

### File Upload

Cấu hình trong `src/config/multer.js`:
- Thư mục lưu: `uploads/`
- Loại file cho phép: `image/jpeg`, `image/png`, `image/jpg`, `image/gif`
- Dung lượng tối đa: `5MB`

### Port

Server mặc định chạy trên port `3000`. Để thay đổi, sửa trong `server.js`:

```javascript
const port = 3000; // Thay đổi port tại đây
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **multer**: File upload handling

## 🛠️ Development

### Thêm script vào package.json (tùy chọn)

Bạn có thể thêm các script sau vào `package.json` để tiện sử dụng:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Sau đó chạy:
```bash
npm start
# hoặc với nodemon (tự động restart khi có thay đổi)
npm run dev
```

## 📝 Ghi chú

- Đảm bảo MongoDB đang chạy trước khi start server
- Thư mục `uploads/` sẽ được tạo tự động khi có file upload đầu tiên
- JWT token cần được gửi trong header `Authorization: Bearer <token>` cho các route được bảo vệ

## 🐛 Troubleshooting

### Lỗi kết nối MongoDB

```
❌ Lỗi kết nối MongoDB: ...
```

**Giải pháp:**
- Kiểm tra MongoDB đã được cài đặt và đang chạy
- Kiểm tra port 27017 có bị chiếm dụng không
- Kiểm tra connection string trong `src/config/db.js`

### Lỗi không tìm thấy thư mục uploads

**Giải pháp:**
- Tạo thủ công thư mục `uploads/` trong root directory
- Hoặc đảm bảo ứng dụng có quyền tạo thư mục

## 📄 License

ISC

