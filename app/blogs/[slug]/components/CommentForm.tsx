"use client";

import { useState } from "react";

type TFormProps = {
  onSubmit: (content: string) => void;
  placeholder?: string;
};

export default function CommentForm({ onSubmit, placeholder = "Write a comment..." }: TFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
}
