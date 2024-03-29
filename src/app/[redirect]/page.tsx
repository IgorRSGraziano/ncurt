import React from "react";
import { GetServerSideProps } from "next";
import prisma from "src/services/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const reqUrl = context.query.redirect;

    const redirect = await prisma.urls.findFirst({
      where: {
        url: String(reqUrl),
      },
    });

    const increment = await prisma.urls.update({
      where: {
        id: `${redirect.id}`,
      },
      data: {
        count: 1 + redirect.count,
      },
    });
    return {
      redirect: {
        destination: redirect?.destiny || "/not-found",
        permanent: false,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/not-found",
        permanent: false,
      },
    };
  }
};

function redirect() {
  return null;
}

export default redirect;
