import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "services/prisma";
import alphanumericIncrement from "utils/alphanumericIncrement";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { destiny } = req.body;

  //Return the last generated URL
  const lastUrl =
    await prisma.$queryRaw`SELECT url FROM "Urls" ORDER BY "createAt" DESC LIMIT 1`;

  const mountedUrl = `${req.headers.host}/${alphanumericIncrement(
    lastUrl[0]?.url
  )}`;

  const generateUrl = async () => {
    await prisma.urls.create({
      data: {
        destiny: destiny,
        url: alphanumericIncrement(lastUrl[0].url),
      },
    });
  };

  try {
    generateUrl();
    const response = {
      sucess: true,
      url: mountedUrl,
    };
    res.json(response);
  } catch (e) {
    const response = {
      sucess: false,
    };

    res.json(response);
  }
}
