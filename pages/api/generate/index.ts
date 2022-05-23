import prisma from "services/prisma";
import alphanumericIncrement from "utils/alphanumericIncrement";

export default async function handle(req, res) {
  const { destiny } = req.body;
  // const lastUrl = await prisma.$queryRaw`SELECT * FROM Urls`;
  const lastUrl = await prisma.$queryRaw`SELECT * FROM Urls`;
  // const lastUrl =
  //   await prisma.$queryRaw`SELECT createAt FROM urls ORDER BY TIMESTAMP DESC LIMIT 1`;
  const result = await prisma.urls.create({
    data: {
      destiny: destiny,
      url: "sddfdfd3fsdd",
    },
  });
  console.log(lastUrl);
  res.json(result);
}
