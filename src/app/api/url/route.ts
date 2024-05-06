import prisma from "@/services/prismaService";
import { UnicodeIncrement } from "@/utils/unincrement";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const allUrls = await prisma.urls.findMany();
	return NextResponse.json({ data: allUrls });
}

export async function POST(req: NextRequest) {
	const { urls } = await req.json();

	if (urls.length === 0) return NextResponse.json({ success: true, message: "Digite ao menos uma URL" }, { status: 400 });
	if (urls.length > 30) return NextResponse.json({ success: true, message: "Você só pode encurtar até 30 URL's por vez" }, { status: 400 });

	const lastUrl = await prisma.urls.findFirst({
		orderBy: {
			id: "desc",
		},
	});

	let lastGenerated = lastUrl?.url ?? "a";
	for (const url of urls) {
		const shortUrl = UnicodeIncrement.incrementSystem(lastGenerated);
		await prisma.urls.create({
			data: {
				destiny: url,
				url: shortUrl,
			},
		});
		lastGenerated = shortUrl;
	}

	return NextResponse.json({ success: true, message: "URL's encurtadas com sucesso" });
}
