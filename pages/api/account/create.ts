import type { NextApiRequest, NextApiResponse } from "next";
import type { IUser } from "interfaces/User";

import { sessionOptions } from "utils/session";

import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "services/prisma";

async function createAccount(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, password } = req.body;

    const generateAccount = async () => {
      return await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
    };

    const newUser = await generateAccount();

    const user: IUser = {
      isLogged: true,
      email: newUser.email,
      name: newUser.name,
    };

    req.session.user = user;
    await req.session.save();

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

export default withIronSessionApiRoute(createAccount, sessionOptions);
