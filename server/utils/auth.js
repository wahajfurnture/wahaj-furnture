import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { mongoClient } from "./db.js";
import { cookieConfig } from "./cookieConfig.js";

export const auth = betterAuth({
  database: mongodbAdapter(mongoClient),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  advanced: {
    defaultCookieAttributes: cookieConfig,
  },
  trustedOrigins: [process.env.CLIENT_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
});
