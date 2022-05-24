import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "services/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.body;
  const {
    headers: { host },
  } = req;

  let searchedUrl = url;
  if (url.includes(host)) {
    searchedUrl = url.split(`${host}/`)[1];
  }

  const destinyUrl = await prisma.urls.findFirst({
    where: {
      url: String(searchedUrl),
    },
  });

  const response = {
    sucess: !!destinyUrl,
    destiny: destinyUrl ? destinyUrl.destiny : null,
  };

  res.json(response);
}
