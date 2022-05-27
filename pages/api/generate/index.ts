import type { IUrl, IResponseUrls } from "interfaces/URL";
import type { IUser } from "interfaces/User";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "services/prisma";
import alphanumericIncrement from "utils/alphanumericIncrement";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "utils/session";

async function generateURL(req: NextApiRequest, res: NextApiResponse) {
  const user: IUser = req.session.user;
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

  //Regext to separe protocol from url and add url in capturing group
  function addHttps(url: string): string {
    return url.replace(/^(?:http[s]?:\/\/)?([\S]+)/gi, "https://$1");
  }

  try {
    for (let i = 0; i < allUrls.length; i++) {
      if (i === 0) {
        const generatedNewUrl = alphanumericIncrement(lastUrl[0].url);
        const url: IUrl = {
          destiny: addHttps(allUrls[i]),
          url: `${generatedNewUrl}`,
          authorId: user.id,
        };

        urlsToSend.push(url);
      } else {
        const generatedNewUrl = alphanumericIncrement(urlsToSend[i - 1].url);
        const url: IUrl = {
          destiny: addHttps(allUrls[i]),
          url: `${generatedNewUrl}`,
          authorId: user.id,
        };
        urlsToSend.push(url);
      }
    }
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

export default withIronSessionApiRoute(generateURL, sessionOptions);
