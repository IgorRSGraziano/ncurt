import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "services/prisma";

export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    console.log(email, password);

    // get user from database then:
    // req.session.user = {
    //   id: 230,
    //   admin: true,
    // };

    // const redirect = await prisma.urls.findFirst({
    //     where: {
    //       url: String(reqUrl),
    //     },
    //   });
    const verifyAccount = await prisma.user.findFirst({
      where: {
        email: String(email),
        password: String(password),
      },
    });

    console.log(verifyAccount);

    await req.session.save();
    res.send({ ok: true });
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
