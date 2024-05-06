"use client";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 mb-4">
			<div className="container flex justify-between items-center">
				<div className="mr-4 flex">
					<Link href={"/"} className="mr-6 flex items-center space-x-2">
						<span className="font-bold inline-block text-xl">nCurt</span>
					</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;
