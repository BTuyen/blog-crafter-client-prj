# 💆 Booking Spa Backend

Hệ thống backend quản lý đặt lịch dịch vụ spa, xây dựng bằng **NestJS** + **Prisma** + **PostgreSQL**.

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| [NestJS](https://nestjs.com/) | ^10.0.0 | Framework Node.js |
| [TypeScript](https://www.typescriptlang.org/) | 5.3.3 | Ngôn ngữ lập trình |
| [Prisma](https://www.prisma.io/) | ^5.22.0 | ORM kết nối database |
| [PostgreSQL](https://www.postgresql.org/) | — | Cơ sở dữ liệu quan hệ |
| [class-validator](https://github.com/typestack/class-validator) | ^0.15.1 | Validation DTO |

---

## 📁 Cấu trúc thư mục

```
booking_spa_be/
├── prisma/
│   ├── schema.prisma          # Định nghĩa schema database
│   └── migrations/            # Lịch sử migration
├── src/
│   ├── auth/                  # Module xác thực
│   ├── bookings/              # Module đặt lịch
│   ├── services/              # Module dịch vụ spa
│   ├── staff/                 # Module nhân viên
│   ├── users/                 # Module người dùng
│   │   └── dto/               # Data Transfer Objects
│   ├── prisma/                # Module kết nối Prisma
│   ├── app.module.ts
│   └── main.ts
├── test/                      # E2E tests
├── package.json
└── tsconfig.json
```

---

## 🗄️ Database Schema

```
User ──< Booking >── Service ──< Spa
                        |
                     Payment
```

### Các bảng chính

| Bảng | Mô tả |
|---|---|
| `users` | Người dùng (khách hàng, nhân viên, admin) |
| `spas` | Thông tin cơ sở spa |
| `services` | Dịch vụ của từng spa |
| `bookings` | Lịch đặt của khách hàng |
| `payments` | Thanh toán cho mỗi booking |

### Enums

- **UserRole**: `customer` · `staff` · `admin`
- **BookingStatus**: `pending` · `confirmed` · `completed` · `cancelled`
- **PaymentStatus**: `pending` · `success` · `failed`
- **PaymentMethod**: `VNPay` · `Momo`

---

## 🚀 Khởi động dự án

### Yêu cầu

- Node.js >= 18
- PostgreSQL đang chạy
- npm hoặc yarn

### Cài đặt

```bash
# 1. Clone repository
git clone https://gitlab.com/hathibichtuyen20082001/booking_spa_be.git
cd booking_spa_be

# 2. Cài đặt dependencies
npm install

# 3. Tạo file .env
cp .env.example .env
```

### Cấu hình môi trường

Tạo file `.env` ở thư mục gốc với nội dung:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/booking_spa_db"
PORT=3000
```

> Thay `USER`, `PASSWORD` bằng thông tin PostgreSQL của bạn.

### Khởi tạo database

```bash
# Chạy migration để tạo các bảng
npx prisma migrate dev

# (Tuỳ chọn) Mở Prisma Studio để xem dữ liệu
npx prisma studio
```

### Chạy server

```bash
# Development (hot-reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

Server sẽ chạy tại: `http://localhost:3000`

---

## 📡 API Endpoints

### Users

| Method | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/users` | Lấy danh sách tất cả người dùng |
| `POST` | `/users` | Tạo người dùng mới |

**Body tạo user (`POST /users`)**:
```json
{
  "full_name": "Nguyễn Văn A",
  "email": "example@email.com",
  "password": "123456",
  "role": "customer"
}
```

> ⚠️ Các module `auth`, `bookings`, `services`, `staff` đang được phát triển.

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 📝 Scripts

| Script | Mô tả |
|---|---|
| `npm run start:dev` | Chạy development server (watch mode) |
| `npm run start:prod` | Chạy production server |
| `npm run build` | Build project |
| `npm run lint` | Kiểm tra và sửa lỗi ESLint |
| `npm run format` | Format code với Prettier |

---

## 🌐 Liên kết

- **GitLab**: [hathibichtuyen20082001/booking_spa_be](https://gitlab.com/hathibichtuyen20082001/booking_spa_be)
