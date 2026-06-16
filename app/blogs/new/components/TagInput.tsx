"use client";

import React, { useState, useEffect } from "react";
import { IFTag } from "@/app/interfaces/tag";
import { getListTag } from "@/app/api/tagApi";
import { normalizeTag } from "@/app/utils/normalizeTag";
import { showToast } from "@/lib/toast";

// Giới hạn số tag mỗi bài để chặn spam nhồi từ khóa (khớp với giới hạn backend).
const MAX_TAGS = 5;

type TTagInputProps = {
  tags: IFTag[];
  setTags: (tags: IFTag[]) => void;
};

export default function TagInput({ tags, setTags }: TTagInputProps) {
  const [tagInput, setTagInput] = useState("");
  const [suggestions, setSuggestions] = useState<IFTag[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allTags, setAllTags] = useState<IFTag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      if (allTags.length === 0) {
        const res = await getListTag();
        setAllTags(res.data);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    if (!tagInput.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const inputSlug = normalizeTag(tagInput);

    // Lọc theo slug đã chuẩn hóa: "next js" cũng khớp tag "nextjs".
    const filtered = allTags.filter((tag) =>
      normalizeTag(tag.name).includes(inputSlug)
    );

    // Coi là đã tồn tại nếu trùng slug (không chỉ trùng chữ thường).
    const tagExists = filtered.some(
      (tag) => normalizeTag(tag.name) === inputSlug
    );

    if (tagExists) {
      setSuggestions(filtered);
    } else {
      const customOption: IFTag = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: tagInput.trim(),
        description: "",
        blogCount: 0,
        isNew: true,
      };
      setSuggestions([customOption, ...filtered]);
    }

    setShowSuggestions(true);
  }, [tagInput, allTags]);

  const resetInput = () => {
    setTagInput("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const addTag = (newTag: IFTag) => {
    const trimName = newTag.name.trim();
    const slug = normalizeTag(trimName);

    // Chặn input rác: rỗng hoặc toàn ký tự đặc biệt (slug rỗng sau chuẩn hóa).
    if (!slug) {
      showToast("error", "Tag không hợp lệ");
      resetInput();
      return;
    }

    // Đã có tag trùng slug (vd "next js" khi đã chọn "nextjs") -> bỏ qua.
    if (tags.some((t) => normalizeTag(t.name) === slug)) {
      resetInput();
      return;
    }

    // Giới hạn số tag.
    if (tags.length >= MAX_TAGS) {
      showToast("error", `Tối đa ${MAX_TAGS} tag mỗi bài`);
      resetInput();
      return;
    }

    setTags([...tags, { ...newTag, name: trimName }]);
    resetInput();
  };

  const handleAddTag = (tagName: string) => {
    const foundSuggestion = suggestions.find(
      (sug) => normalizeTag(sug.name) === normalizeTag(tagName)
    );
    const newTag: IFTag = foundSuggestion || {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: tagName,
      description: "",
      blogCount: 0,
      isNew: true,
    };
    addTag(newTag);
  };

  const handleRemoveTag = (tagId: number) => {
    setTags(tags.filter((t) => t.id !== tagId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag({
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: tagInput,
        description: "",
        blogCount: 0,
      });
    }
  };

  return (
    <div className="mb-4 relative">
      <label className="block mb-2 font-semibold">Tags</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center space-x-2 border px-2 py-1 rounded"
          >
            <span>#{tag.name}</span>
            <button
              type="button"
              className="text-red-500"
              onClick={() => handleRemoveTag(tag.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter a tag..."
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border-none rounded focus:outline-none dark:bg-black"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-30 border rounded mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-500">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => handleAddTag(suggestion.name)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
