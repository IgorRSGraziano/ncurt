import type { NextApiRequest, NextApiResponse } from "next";
import type { IUser } from "interfaces/User";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "utils/session";
import prisma from "services/prisma";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

    res.json({ sucess: true, user });
  } catch {
    res.json({ sucess: false });
  }
};

export default withIronSessionApiRoute(login, sessionOptions);
