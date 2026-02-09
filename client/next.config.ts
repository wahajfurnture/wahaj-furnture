import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/dqzn96qsd/**")],
  },
};

export default withNextIntl(nextConfig);
