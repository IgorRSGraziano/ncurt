import type { User } from "pages/api/account/login";

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
