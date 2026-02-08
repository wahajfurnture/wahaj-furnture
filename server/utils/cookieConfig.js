export const cookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  domain: ".wahaj.it.com",
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 30,

  partitioned: true,
};
