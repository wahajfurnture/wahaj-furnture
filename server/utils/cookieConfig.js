export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  domain: ".wahaj.it.com",
  maxAge: 1000 * 60 * 60 * 24 * 30,
};
