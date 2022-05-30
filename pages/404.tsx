import React from "react";
import { useRouter } from "next/router";
function NotFound() {
  const router = useRouter();

  //Next V12.1.5 dont support 301 redirect in SSR/SSG inside 404 page
  React.useEffect(() => {
    router.push("/not-found");
  });
  return null;
}

export default NotFound;
