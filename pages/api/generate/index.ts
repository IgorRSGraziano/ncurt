import prisma from "services/prisma";
import alphanumericIncrement from "utils/alphanumericIncrement";

export default async function handle(req, res) {
  const { destiny } = req.body;

  //Return the last generated URL
  const lastUrl =
    await prisma.$queryRaw`SELECT url FROM "Urls" ORDER BY "createAt" DESC LIMIT 1`;

  const result = await prisma.urls.create({
    data: {
      destiny: destiny,
      url: alphanumericIncrement(lastUrl[0].url),
    },
  });
  res.json(result);
}
