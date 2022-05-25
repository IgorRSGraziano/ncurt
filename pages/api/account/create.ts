import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "services/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  const generateAccount = async () => {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  };

  try {
    generateAccount();
    const response = {
      sucess: true,
    };
    res.json(response);
  } catch (e) {
    const response = {
      sucess: false,
    };

    res.json(response);
  }
}
