"use client";
import { Github } from "lucide-react";
import Link from "next/link";

type Props = {};

function Footer({}: Props) {
	return (
		<footer className="fixed bottom-0 w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 mt-4">
			<div className="mr-4 flex justify-center items-center gap-8">
				<p>Feito com ❤️ por Igor</p>
				<Link href={"https://github.com/IgorRSGraziano"} className="transition-colors hover:text-foreground/80 text-foreground/60">
					<Github />
				</Link>
			</div>
		</footer>
	);
}

export default Footer;
