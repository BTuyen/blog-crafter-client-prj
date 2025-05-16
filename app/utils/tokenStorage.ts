import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { IFJwtPayload } from "@/app/interfaces/jwtPayload";

export const saveTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken, { expires: 7, secure: true, sameSite: "Strict" });
  Cookies.set("refreshToken", refreshToken, { expires: 30, secure: true, sameSite: "Strict" });
};

export const setAccessToken = (accessToken: string) => {
  Cookies.set("accessToken", accessToken, { expires: 7, secure: true, sameSite: "Strict" });
};

export const getAccessToken = (): string | undefined => Cookies.get("accessToken");

export const getRefreshToken = (): string | undefined => Cookies.get("refreshToken");

export const clearTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const getUserIdFromCookie = (): number | null => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const decoded: IFJwtPayload = jwtDecode<IFJwtPayload>(token);
    return decoded.sub || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
