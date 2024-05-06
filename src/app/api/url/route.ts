import prisma from "@/services/prismaService";
import { UnicodeIncrement } from "@/utils/unincrement";
import { Urls } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { urls } = await req.json();

	if (urls.length === 0) return NextResponse.json({ success: true, message: "Digite ao menos uma URL" }, { status: 400 });
	if (urls.length > 30) return NextResponse.json({ success: true, message: "Você só pode encurtar até 30 URL's por vez" }, { status: 400 });

	const lastUrl = await prisma.urls.findFirst({
		orderBy: {
			id: "desc",
		},
	});

	function addHttps(url: string): string {
		return url.replace(/^(?:http[s]?:\/\/)?([\S]+)/gi, "https://$1");
	}

	let lastGenerated = lastUrl?.url ?? "0";
	const generatedUrls: Urls[] = [];
	for (const url of urls) {
		const shortUrl = UnicodeIncrement.incrementSystem(lastGenerated);
		const generated = await prisma.urls.create({
			data: {
				destiny: addHttps(url),
				url: shortUrl,
			},
		});
		generatedUrls.push(generated);
		lastGenerated = shortUrl;
	}

	return NextResponse.json({ success: true, message: "URL's encurtadas com sucesso", data: generatedUrls });
}
