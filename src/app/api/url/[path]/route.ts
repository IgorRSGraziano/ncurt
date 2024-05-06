import prisma from "@/services/prismaService";
import { NextRequest, NextResponse } from "next/server";

type Params = {
	params: {
		path: string;
	};
};
export async function GET(_: NextRequest, { params: { path } }: Params) {
	if (!path) return NextResponse.json({ success: false, message: "Digite uma URL" }, { status: 400 });

	const url = await prisma.urls.findFirst({
		where: {
			url: path,
		},
	});

	if (!url) return NextResponse.json({ success: false, message: "URL não encontrada" }, { status: 404 });

	return NextResponse.json({ success: true, message: "URL encontrada", data: url.destiny });
}
