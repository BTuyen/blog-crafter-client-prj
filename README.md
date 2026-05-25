# Blog Crafter — Client

Giao diện người dùng (frontend) của nền tảng viết blog **Blog Crafter**, được xây dựng bằng **Next.js 15** (App Router) và **React 19**.

---

## 🚀 Tech Stack

| Công nghệ | Mô tả |
|---|---|
| [Next.js 15](https://nextjs.org/) | Framework React với App Router & Turbopack |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| [Radix UI](https://www.radix-ui.com/) | Headless UI components |
| [Zustand](https://zustand-demo.pmnd.rs/) | Quản lý state toàn cục |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form & validation |
| [Axios](https://axios-http.com/) | HTTP client |
| [EasyMDE / SimpleMDE](https://github.com/Ionaru/easy-markdown-editor) | Markdown editor |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Render Markdown |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [ImageKit](https://imagekit.io/) | Lưu trữ & tối ưu ảnh |
| [date-fns](https://date-fns.org/) | Xử lý ngày giờ |

---

## ✨ Tính năng

- 📝 **Viết & đăng blog** — Editor Markdown đầy đủ tính năng, hỗ trợ upload ảnh bìa và gắn tag
- 🏠 **Trang chủ** — Hiển thị danh sách bài viết với cuộn vô hạn (infinite scroll)
- 🔍 **Tìm kiếm** — Tìm kiếm bài viết real-time với gợi ý tức thì
- 🏷️ **Tags** — Duyệt bài viết theo chủ đề/tag
- 💬 **Bình luận** — Bình luận và trả lời theo dạng thread
- 👍 **Reactions** — React bài viết (Like, Unicorn)
- 👤 **Hồ sơ người dùng** — Xem và cập nhật thông tin cá nhân, avatar
- 🔐 **Xác thực** — Đăng ký / đăng nhập bằng email & mật khẩu, JWT + cookie
- 🌙 **Dark Mode** — Chuyển đổi giao diện sáng/tối
- 🛡️ **Route bảo vệ** — Middleware tự động chuyển hướng khi chưa đăng nhập

---

## 📁 Cấu trúc thư mục

```
├── app/
│   ├── (user)/              # Layout & component dành cho user
│   ├── api/                 # Các hàm gọi API (blog, auth, comment, tag, media...)
│   ├── auth/                # Trang đăng nhập / đăng ký
│   ├── blogs/
│   │   ├── [slug]/          # Trang chi tiết bài viết
│   │   ├── new/             # Trang tạo bài viết mới
│   │   └── components/      # Components dùng chung cho blogs
│   ├── contants/            # Hằng số (reactions, ...)
│   ├── hooks/               # Custom React hooks
│   ├── interfaces/          # TypeScript interfaces
│   ├── profile/             # Trang hồ sơ cá nhân
│   ├── stores/              # Zustand stores (user, blog, comment, reaction, search, tag)
│   ├── tags/                # Trang danh sách & chi tiết tag
│   └── utils/               # Tiện ích (apiClient, tokenStorage, handleAsync...)
├── components/
│   ├── layout/              # Header, Sidebar, MainLayoutWrapper, SearchSuggestions
│   └── ui/                  # shadcn/ui components
├── lib/                     # errorHandler, toast, utils
├── public/                  # Static assets
├── schemaValidations/       # Zod schemas (auth, ...)
├── middleware.ts             # Next.js middleware (bảo vệ route)
└── next.config.ts
```

---

## ⚙️ Cài đặt & Chạy dự án

### Yêu cầu

- Node.js >= 18
- npm / yarn / pnpm / bun

### 1. Clone repository

```bash
git clone <repository-url>
cd blog-crafter-client
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env.local` ở thư mục gốc:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

> Thay `http://localhost:8000/api` bằng URL của backend API thực tế.

### 4. Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

---

## 📜 Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Khởi chạy dev server với Turbopack |
| `npm run build` | Build production |
| `npm start` | Chạy bản production đã build |
| `npm run lint` | Kiểm tra lỗi ESLint |

---

## 🔒 Xác thực & Bảo vệ route

- Token JWT được lưu trong **cookie** (`accessToken`, `refreshToken`).
- **Middleware** (`middleware.ts`) tự động chuyển hướng người dùng chưa đăng nhập khi truy cập các route được bảo vệ: `/profile`, `/blogs/new`, `/blogs/edit`.
- `authorizedApiClient` tự động đính kèm `Authorization` header và xử lý refresh token khi hết hạn.

---

## 🖼️ Upload ảnh

Ảnh bìa bài viết được lưu trữ trên **ImageKit**. Domain được cấu hình trong `next.config.ts`:

```ts
images: {
  domains: ["ik.imagekit.io"],
}
```

---

## 🗂️ Quản lý State (Zustand)

| Store | Mô tả |
|---|---|
| `useUserStore` | Thông tin người dùng hiện tại (persist localStorage) |
| `useBlog` / `blogStore` | Danh sách & trạng thái bài viết |
| `useComment` | Bình luận theo bài viết |
| `reactionStore` | Reactions theo bài viết |
| `useSearch` | Từ khóa tìm kiếm |
| `useTagStore` | Danh sách tags |

---

## 🤝 Đóng góp

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
3. Commit thay đổi: `git commit -m "feat: mô tả ngắn"`
4. Push branch: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

---

## 📄 License

MIT © Blog Crafter
