import { type AppType } from "next/app";

import { api } from "run/utils/api";

import "run/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
