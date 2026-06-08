# 📝 Blog Crafter Client

> Giao diện web (frontend) cho nền tảng blog Blog Crafter — viết, đọc, gắn tag, thả reaction và bình luận bài viết. Xây dựng bằng **Next.js 15 (App Router)** + **React 19** + **TypeScript**.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

---

## ✨ Tính năng

- **Xác thực JWT**: đăng ký / đăng nhập, tự động làm mới access token bằng refresh token.
- **Bảo vệ route**: middleware chặn truy cập `/profile`, `/blogs/new`, `/blogs/edit` khi chưa đăng nhập.
- **Quản lý bài viết**: danh sách bài viết với *infinite scroll*, xem chi tiết theo slug, tạo bài mới bằng trình soạn thảo Markdown (SimpleMDE).
- **Tag**: xem theo tag, theo dõi / bỏ theo dõi tag.
- **Tương tác**: thả reaction và bình luận trên từng bài viết.
- **Upload ảnh**: tải ảnh lên qua ImageKit (`ik.imagekit.io`).
- **Tìm kiếm**: gợi ý tìm kiếm bài viết.
- **Hồ sơ người dùng**: xem và cập nhật thông tin cá nhân (tên, avatar).

---

## 🛠️ Công nghệ sử dụng

| Nhóm | Thư viện |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack), React 19 |
| Ngôn ngữ | TypeScript 5 |
| Styling | Tailwind CSS 3.4, `tailwindcss-animate`, `class-variance-authority` |
| UI components | shadcn/ui trên nền Radix UI, `lucide-react` (icon) |
| State management | Zustand 5 |
| HTTP client | Axios |
| Form & validation | react-hook-form, Zod |
| Markdown | SimpleMDE (`react-simplemde-editor`), `react-markdown`, `markdown-it`, `showdown` |
| Auth | `js-cookie`, `jwt-decode` (JWT lưu ở cookie) |
| Thông báo | `sonner` (toast) |
| Tiện ích | `date-fns`, `lodash` |

---

## 🚀 Khởi động nhanh

### Yêu cầu

| Công cụ | Phiên bản |
|---|---|
| Node.js | >= 18.18 |
| npm | >= 9 |
| Backend API | Một instance Blog Crafter API đang chạy (ví dụ `https://blog-crafter-backend.vercel.app`) |

### Cài đặt

```bash
# 1. Clone repository
git clone https://github.com/BTuyen/blog-crafter-client-prj.git
cd blog-crafter-client-prj

# 2. Cài dependencies
npm install

# 3. Tạo file biến môi trường
cp .env.example .env.local
```

### Chạy dự án

```bash
npm run dev      # Development server (Turbopack) tại http://localhost:3000
npm run build    # Build production
npm run start    # Chạy bản production sau khi build
npm run lint     # Kiểm tra ESLint
```

---

## ⚙️ Biến môi trường

Biến môi trường được kiểm tra bằng Zod trong `app/config.ts`; nếu thiếu, app sẽ **throw lỗi khi khởi động**.

| Biến | Bắt buộc | Mặc định | Mô tả |
|---|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ Có | — | URL gốc của Blog Crafter backend API |

### Ví dụ `.env.local`

```env
# URL của backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

> ⚠️ Biến có tiền tố `NEXT_PUBLIC_` được nhúng vào bundle phía client — không đặt secret ở đây.

---

## 📁 Cấu trúc thư mục

```
.
├── app/                      # Next.js App Router
│   ├── api/                  # Lớp gọi API (axios): auth, blog, comment, tag, user, media
│   ├── auth/                 # Trang đăng nhập / đăng ký
│   ├── blogs/                # Danh sách, chi tiết ([slug]), tạo bài mới (new)
│   ├── tags/                 # Trang tag và tag theo slug
│   ├── (user)/               # Hồ sơ người dùng (route group)
│   ├── stores/               # Zustand stores (user, blog, tag, comment, reaction, search)
│   ├── interfaces/           # TypeScript types (blog, user, comment, tag, ...)
│   ├── hooks/                # Custom hooks (infinite scroll, user interactions)
│   ├── utils/                # apiClient, tokenStorage, handleAsyncContext
│   ├── config.ts             # Validate biến môi trường bằng Zod
│   └── layout.tsx
├── components/
│   ├── ui/                   # Component shadcn/ui (button, input, dialog, ...)
│   └── layout/               # Header, Sidebar, MainLayoutWrapper, ...
├── lib/                      # Tiện ích dùng chung (errorHandler, toast, utils)
├── schemaValidations/        # Zod schema (auth.schema.ts)
├── middleware.ts             # Bảo vệ route theo trạng thái đăng nhập
└── next.config.ts
```

---

## 🔐 Cơ chế xác thực

1. Đăng nhập / đăng ký gọi `POST /auth/sign-in` · `POST /auth/sign-up`, nhận về `accessToken` và `refreshToken`.
2. Token được lưu ở cookie (`app/utils/tokenStorage.ts`).
3. Mọi request cần quyền đi qua `authorizedApiClient` (gắn header `Authorization: Bearer <token>`).
4. Khi nhận `401`, một response interceptor (đăng ký **một lần** ở module-level) tự gọi `POST /auth/refresh-token` để lấy access token mới rồi thử lại request gốc.
5. `middleware.ts` chuyển hướng người dùng chưa đăng nhập về `/auth?mode=login` khi vào route private.

---

## 🔌 API tiêu thụ

**Base URL:** lấy từ `NEXT_PUBLIC_API_BASE_URL`. Các route private yêu cầu header `Authorization: Bearer <token>`.

| Nhóm | Endpoint | Mô tả |
|---|---|---|
| Auth | `POST /auth/sign-up`, `POST /auth/sign-in`, `POST /auth/refresh-token` | Đăng ký, đăng nhập, làm mới token |
| Blogs | `GET /blogs`, `GET /blogs/{id}`, `GET /blogs/user/{id}`, `POST /blogs/create`, `POST /blogs/react/{id}` | Danh sách, chi tiết, bài của user, tạo bài, thả reaction |
| Comments | `GET /comments/{id}`, `POST /comments/create` | Lấy và tạo bình luận |
| Tags | `GET /tags`, `GET /tags/{id}`, `GET /tags/followed`, `POST /tags/create`, `POST /tags/follow/{id}`, `POST /tags/unfollow/{id}` | Quản lý và theo dõi tag |
| Users | `GET /users/{id}`, cập nhật user theo `{id}` | Thông tin và cập nhật hồ sơ |
| Media | `POST /media/upload`, `POST /media/remove` | Upload / xoá ảnh (ImageKit) |

> Đây là các endpoint **client gọi tới**; hợp đồng chính thức do backend Blog Crafter định nghĩa.

---

## 🤝 Đóng góp

1. Fork repository.
2. Tạo nhánh tính năng: `git checkout -b feature/ten-tinh-nang`
3. Commit theo Conventional Commits: `git commit -m 'feat: thêm tính năng X'`
4. Push và mở Pull Request.
