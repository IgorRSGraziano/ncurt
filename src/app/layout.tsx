import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";

import Footer from "@/components/footer";
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
		<html lang="pt-BR" suppressHydrationWarning>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<body className={cn("min-h-screen flex flex-col bg-background font-sans antialiased", fontSans.variable)}>
					<Header />
					<div className="flex-grow">
						<div className="m-2">
							<Card className="container p-4 min-h-[80vh]">{children}</Card>
						</div>
						<div className="fixed bottom-6 right-6 z-[60]">
							<ThemeSelector />
						</div>
					</div>
					<Footer />
				</body>
			</ThemeProvider>
		</html>
	);
}
