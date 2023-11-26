import { GlobalStyle } from "src/styles/globals";
import type { Metadata } from "next";
import { MainContainer } from "src/styles/style";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

export const metadata: Metadata = {
	title: "nCurt",
	description: "A simple URL shortener",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<GlobalStyle />
			<body>
				<Header />
				<MainContainer>{children}</MainContainer>
				<Footer />
			</body>
		</html>
	);
}
