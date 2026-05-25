"use client";

import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { clearTokens } from "@/app/utils/tokenStorage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AvatarUser from "@/components/ui/avatar-user";
import { useUserStore } from "@/app/stores/useUserStore";
import useSearchStore from "@/app/stores/useSearch";
import SearchSuggestions from "./SearchSuggestions";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [count] = useState(133);
  const { user } = useUserStore();
  const { setSearchQuery } = useSearchStore();
  const router = useRouter();

  useEffect(() => {
    const darkMode = localStorage.getItem("theme") === "dark";
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleLogOut = () => {
    clearTokens();
    useUserStore.getState().setUser(null);
    router.push("/auth?mode=login");
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black text-black dark:text-white py-2 px-4 flex items-center shadow-md rounded-lg">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={30}
            height={30}
            priority
          />
        </Link>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-1/3">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchSuggestions />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>

        {user ? (
          <>
            <Button>
              <Link href="/blogs/new">Create Post</Link>
            </Button>
            <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Bell className="w-7 h-7" />
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <AvatarUser
                  userName={user.name}
                  userAvt={user?.avatar}
                  size={30}
                  fontSize={"text-xs"}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="dark:bg-gray-800 dark:text-white"
              >
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogOut}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex gap-2">
            <Link href="/auth?mode=login">
              <button className="px-3 py-1 border text-sm border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                Sign in
              </button>
            </Link>
            <Link href="/auth?mode=register">
              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
