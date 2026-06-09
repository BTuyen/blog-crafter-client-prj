"use client";

import { useState } from "react";
import { Github, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/lib/toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("error", "Vui lòng điền đầy đủ thông tin.");
      return;
    }
    setLoading(true);
    // TODO: gọi API gửi contact
    await new Promise((r) => setTimeout(r, 800));
    showToast("success", "Gửi thành công! Mình sẽ phản hồi sớm nhất có thể.");
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Liên hệ</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Có câu hỏi, góp ý, hoặc chỉ muốn chào? Mình luôn sẵn sàng lắng nghe.
        </p>
      </div>

      {/* Contact links */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <a
          href="mailto:contact@blogcrafter.dev"
          className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors flex-1"
        >
          <Mail className="w-5 h-5 text-blue-500 shrink-0" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-xs text-gray-500">contact@blogcrafter.dev</p>
          </div>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors flex-1"
        >
          <Github className="w-5 h-5 shrink-0" />
          <div>
            <p className="text-sm font-medium">GitHub</p>
            <p className="text-xs text-gray-500">github.com/blog-crafter</p>
          </div>
        </a>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Tên</label>
            <Input
              name="name"
              placeholder="Nguyen Van A"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Nội dung</label>
          <Textarea
            name="message"
            placeholder="Nội dung tin nhắn..."
            rows={5}
            value={form.message}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={loading} className="self-end gap-2">
          <Send className="w-4 h-4" />
          {loading ? "Đang gửi..." : "Gửi tin nhắn"}
        </Button>
      </form>
    </div>
  );
}
