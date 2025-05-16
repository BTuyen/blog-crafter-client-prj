import { useState, useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps<T> {
  fetchFunction: (page: number) => Promise<{ data: T[]; totalPages: number }>;
}

export function useInfiniteScroll<T>({ fetchFunction }: UseInfiniteScrollProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const fetchData = useCallback(
    async (pageNumber: number) => {
      if (loading || !hasMore) return;

      setLoading(true);

      try {
        const result = await fetchFunction(pageNumber);
        setData((prev) => [...prev, ...(result.data || [])]);

        if (totalPages === null) {
          setTotalPages(result.totalPages);
        }

        // Check final page
        if (totalPages && pageNumber >= totalPages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, totalPages, fetchFunction]
  );

  useEffect(() => {
    if (page === 1 && data.length > 0) return;
    fetchData(page);
  }, [page]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    if (observerInstance.current) {
      observerInstance.current.disconnect();
    }

    observerInstance.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "50px", threshold: 1.0 }
    );

    observerInstance.current.observe(observerRef.current);
    return () => observerInstance.current?.disconnect();
  }, [loading, hasMore]);

  return { data, loading, hasMore, observerRef };
}
