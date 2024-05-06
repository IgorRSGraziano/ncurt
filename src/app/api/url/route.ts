import prisma from "@/services/prismaService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const allUrls = await prisma.urls.findMany();
	return NextResponse.json({ data: allUrls });
}
