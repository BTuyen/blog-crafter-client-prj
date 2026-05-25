type AsyncFunction<T> = (...args: unknown[]) => Promise<T>;

export const handleAsync = async <T>(
  fn: AsyncFunction<T>,
  onError?: (error: unknown) => void
): Promise<{ data?: T; error?: unknown }> => {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      console.error("Error caught in handleAsync:", error);
    }
    return { error };
  }
};
