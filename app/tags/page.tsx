"use client";

import { getListTag } from "@/app/api/tagApi";
import { IFTag } from "@/app/interfaces/tag";
import TagItem from "@/app/tags/components/TagItem";
import { useEffect, useRef, useState } from "react";

export default function TagsPage() {
  const [allTags, setAllTags] = useState<IFTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFirstLoad = useRef(true);

  const fetchAllTags = async (pageNumber: number) => {
    if (!hasMore) return;

    setLoading(true);
    const res = await getListTag({ page: pageNumber });
    if (res.data.length === 0) {
      setHasMore(false);
    } else {
      setAllTags((prev) => [...prev, ...res.data]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchAllTags(1);
    }
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchAllTags(page);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {allTags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </div>
  );
}
