import React from "react";
import { GetServerSideProps } from "next";
import prisma from "services/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqUrl = context.query.redirect;

  const redirect = await prisma.urls.findFirst({
    where: {
      url: String(reqUrl),
    },
  });

  return {
    redirect: {
      destination: redirect?.destiny || "/not-found",
      permanent: false,
    },
  };
};

function redirect() {
  return null;
}

export default redirect;
