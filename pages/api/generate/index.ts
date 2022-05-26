import { IUrl, IResponseUrls } from "interfaces/URL";

import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "services/prisma";
import alphanumericIncrement from "utils/alphanumericIncrement";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { destiny } = req.body;
  let allUrls: string = destiny.split(";").map((url: string) => url.trim());

  //Return the last generated URL
  const lastUrl =
    await prisma.$queryRaw`SELECT url FROM "Urls" ORDER BY number DESC LIMIT 1`;

  const urlsToSend: IUrl[] = [];

  const generateUrls = async (urls: IUrl[]) => {
    await prisma.urls.createMany({
      data: urls,
    });
  };

  try {
    for (let i = 0; i < allUrls.length; i++) {
      if (i === 0) {
        const generatedNewUrl = alphanumericIncrement(lastUrl[0].url);
        const url: IUrl = {
          destiny: allUrls[i],
          url: `${generatedNewUrl}`,
        };

        urlsToSend.push(url);
      } else {
        const generatedNewUrl = alphanumericIncrement(urlsToSend[i - 1].url);
        const url: IUrl = {
          destiny: allUrls[i],
          url: `${generatedNewUrl}`,
        };
        urlsToSend.push(url);
      }
    }
    console.log(urlsToSend);

    await generateUrls(urlsToSend);

    //After send default URL for DB, concat with host
    for (let i = 0; i < urlsToSend.length; i++) {
      urlsToSend[i].url = `${req.headers.host}/${urlsToSend[i].url}`;
    }

    const response: IResponseUrls = {
      sucess: true,
      urls: urlsToSend,
    };

    res.json(response);
  } catch (e) {
    const response = {
      sucess: false,
    };

    res.json(response);
  }
}
