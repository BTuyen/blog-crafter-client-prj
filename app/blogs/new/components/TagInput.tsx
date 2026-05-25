"use client";

import React, { useState, useEffect } from "react";
import { IFTag } from "@/app/interfaces/tag";
import { getListTag } from "@/app/api/tagApi";

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

    const filtered = allTags.filter((tag) =>
      tag.name.toLowerCase().includes(tagInput.toLowerCase())
    );

    const tagExists = filtered.some(
      (tag) => tag.name.toLowerCase() === tagInput.toLowerCase()
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

  const addTag = (newTag: IFTag) => {
    const trimName = newTag.name.trim();
    if (!trimName) return;
    if (tags.some((t) => t.name.toLowerCase() === trimName.toLowerCase())) {
      setTagInput("");
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setTags([...tags, newTag]);
    setTagInput("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleAddTag = (tagName: string) => {
    const foundSuggestion = suggestions.find(
      (sug) => sug.name.toLowerCase() === tagName.toLowerCase()
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
