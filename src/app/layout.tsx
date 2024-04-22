import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";

import Header from "@/components/header";
import { ThemeProvider } from "@/contexts/themeContext";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "nCurt",
	description: "Ez url shortener",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
					<Header />
					{children}
          
				</body>
			</ThemeProvider>
		</html>
	);
}
