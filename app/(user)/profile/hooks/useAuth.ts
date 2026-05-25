import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { IFJwtPayload } from "@/app/interfaces/jwtPayload";

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || null;
}

export function getUserIdFromToken(token: string): number | null {
  try {
    const decoded: IFJwtPayload = jwtDecode<IFJwtPayload>(token);
    return decoded.sub || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
