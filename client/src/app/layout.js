import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Second Brain - AI Knowledge Management",
  description: "Capture, organize, and intelligently surface your knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1f2937",
              color: "#fff",
            },
            success: {
              style: {
                background: "#059669",
              },
            },
            error: {
              style: {
                background: "#dc2626",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
