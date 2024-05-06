import NotFound from "@/components/notFound";
import prisma from "@/services/prismaService";
import { permanentRedirect } from "next/navigation";
import React from "react";

type Props = {
	params: {
		path: string;
	};
};

async function Page({ params: { path } }: Props) {
	const url = await prisma.urls.findFirst({
		where: {
			url: path,
		},
	});
	if (url) return permanentRedirect(url.destiny);


	return <NotFound  />;
}

export default Page;
