import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/ui/cn";
import Flag from "@/components/common/i18n/flag";
import { Toaster } from "@/components/ui/toaster";

const defaultUrl = process.env.NEXT_PUBLIC_URL ? `https://${process.env.NEXT_PUBLIC_URL}` : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

const fontSans = Hanken_Grotesk({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
                {children}
                <Toaster />
                <Flag />
            </body>
        </html>
    );
}
