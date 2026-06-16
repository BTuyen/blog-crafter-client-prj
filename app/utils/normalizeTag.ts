/**
 * Chuẩn hóa keyword tag về cùng một "slug" để so trùng phía client.
 * PHẢI khớp đúng logic normalizeTag ở backend, nếu không UI sẽ lệch với server.
 * "NextJs", "next js", "NEXTJS" -> "nextjs"
 */
export const normalizeTag = (text: string): string => {
  return text
    .normalize("NFD") // tách ký tự gốc khỏi dấu
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, ""); // bỏ space và ký tự đặc biệt
};
