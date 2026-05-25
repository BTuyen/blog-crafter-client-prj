import MainLayoutWrapper from "@/components/layout/MainLayoutWrapper";
import "./globals.css";
import { geistMono, geistSans } from "@/app/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
