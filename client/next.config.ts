import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/digmekbtt/**")],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://api.wahaj.it.com/api/v1/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
