async function fetchUserProfile(token: string, userId: number) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://blog-crafter.onrender.com';

  try {
    console.log("Fetching user profile...");
    const res = await fetch(
      `${API_BASE_URL}/users/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error(`Fetch error: ${res.status} - ${res.statusText}`);
      return { data: null, error: `Error ${res.status}: ${res.statusText}` };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error: unknown) {
    console.error("Fetch failed:", error instanceof Error ? error.message : "Unknown error");
    return { data: null, error: error instanceof Error ? error.message : "Network error or server is down" };
  }
}
export { fetchUserProfile };
