import type { NextApiRequest, NextApiResponse } from "next";
import type { IUser } from "interfaces/User";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "utils/session";
import prisma from "services/prisma";

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    const verifyAccount = await prisma.user.findFirst({
      where: {
        email: String(email),
        password: String(password),
      },
    });

    const user: IUser = {
      isLogged: true,
      id: verifyAccount.id,
      email: verifyAccount.email,
      name: verifyAccount.name,
    };

    req.session.user = user;
    await req.session.save();

    res.json(user);
  },
  sessionOptions
);
