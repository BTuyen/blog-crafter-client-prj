"use client";

import { useEffect, useState } from "react";
import { Menu, X, Home, Tag, Info, Mail, Moon, Sun, PenSquare } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useUserStore } from "@/app/stores/useUserStore";

const menuItems = [
  { icon: <Home size={20} />, label: "Home", url: "/" },
  { icon: <Tag size={20} />, label: "Tags", url: "/tags" },
  { icon: <Info size={20} />, label: "About", url: "/about" },
  { icon: <Mail size={20} />, label: "Contact", url: "/contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    setIsDarkMode(localStorage.getItem("theme") === "dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const close = () => setOpen(false);

  return (
    <>
      {/* Hamburger button — chỉ hiện trên mobile */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-black shadow-lg flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header drawer */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="font-semibold text-sm">Menu</span>
          <button
            onClick={close}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="flex flex-col space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  onClick={close}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}

            {/* Create Post — chỉ hiện khi đã login */}
            {user && (
              <li>
                <Link
                  href="/blogs/new"
                  onClick={close}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-blue-600 dark:text-blue-400"
                >
                  <PenSquare size={20} />
                  <span>Create Post</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Settings ở cuối drawer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-3 text-sm">
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              <span>Dark Mode</span>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </div>
      </div>
    </>
  );
}
