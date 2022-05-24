import React from "react";

export const getStaticProps = () => {
  return {
    redirect: {
      destination: "/not-found",
    },
  };
};

const NotFound = () => {
  return null;
};

export default NotFound;
