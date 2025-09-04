import "./globals.css";
export const metadata = {
  title: "Schools Admin",
  description: "Add and browse schools"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-6xl p-4 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
