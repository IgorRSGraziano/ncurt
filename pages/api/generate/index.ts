import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "services/prisma";
import alphanumericIncrement from "utils/alphanumericIncrement";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { destiny } = req.body;
  let allUrls = destiny.split(";").map((url) => url.trim());

  //Return the last generated URL
  const lastUrl =
    await prisma.$queryRaw`SELECT url FROM "Urls" ORDER BY number DESC LIMIT 1`;

  const urlsToSend = [];

  const mountedUrl = `${req.headers.host}/${alphanumericIncrement(
    lastUrl[0]?.url
  )}`;

  const generateUrls = async (urls) => {
    await prisma.urls.createMany({
      data: urls,
    });
  };

  try {
    for (let i = 0; i < allUrls.length; i++) {
      if (i === 0) {
        const generatedNewUrl = alphanumericIncrement(lastUrl[0].url);
        urlsToSend.push({ url: generatedNewUrl, destiny: allUrls[i] });
      } else {
        const generatedNewUrl = alphanumericIncrement(urlsToSend[i - 1].url);
        urlsToSend.push({ url: generatedNewUrl, destiny: allUrls[i] });
      }
    }

    await generateUrls(urlsToSend);
    console.log("final");
    const response = {
      sucess: true,
      url: urlsToSend,
    };
    res.json(response);
  } catch (e) {
    const response = {
      sucess: false,
    };

    res.json(response);
  }
}
