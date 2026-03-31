import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  redirects: async () => [
    {
      source: "/profile",
      destination: "/profile/my-trackers",
      permanent: false,
    },
    {
      source: "/:locale/profile",
      destination: "/:locale/profile/my-trackers",
      permanent: false,
    },
  ],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
