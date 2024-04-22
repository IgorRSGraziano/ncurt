import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";

import Header from "@/components/header";
import ThemeSelector from "@/components/themeSelector";
import { Card } from "@/components/ui/card";
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
					<Card className="container p-4">{children}</Card>
					<div className="fixed bottom-6 right-6">
						<ThemeSelector />
					</div>
				</body>
			</ThemeProvider>
		</html>
	);
}
