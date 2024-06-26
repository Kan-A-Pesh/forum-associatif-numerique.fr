import { League_Spartan } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

const fontSans = League_Spartan({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={fontSans.variable}>
            <body className={cn("min-h-screen bg-background text-white font-sans antialiased", fontSans.variable)}>
                <main className="min-h-screen flex flex-col items-center">{children}</main>
            </body>
        </html>
    );
}
