"use client";

import { useEffect } from "react";
import { useTagStore } from "@/app/stores/useTagStore";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  const { tags, loading, getListTagFollowed } = useTagStore();

  useEffect(() => {
    getListTagFollowed();
  }, [getListTagFollowed]);

  return (
    <aside className="hidden lg:block w-60 shrink-0 p-4">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-semibold">My followed tags</h3>
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="space-y-2">
            {tags.map((tag) => (
              <div key={tag?.id}>
                <Link
                  href={`/tags/${tag?.slug ?? tag?.id}`}
                  className="text-blue-600 hover:underline block"
                >
                  #{tag?.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
