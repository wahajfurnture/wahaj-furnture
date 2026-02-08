import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanititze from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";

import mongoose from "mongoose";
import ResponseFormatter from "./core/ResponseFormatter.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFoundError from "./middlewares/notFoundError.js";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import { toNodeHandler } from "better-auth/node";
import furnRouter from "./routes/furniture.js";
import { auth } from "./utils/auth.js";

const app = express();

app.set("query parser", "extended");

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  return mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    res
      .status(500)
      .json({ success: false, error: "Database connection failed" });
  }
});

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization", "Set-Cookie"],
  }),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 500,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
  }),
);

app.use(helmet());

app.use(cookieParser());

app.use((req, res, next) => {
  Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
  });
  next();
});

app.use(hpp());

app.get("/", (req, res) => {
  ResponseFormatter.success(res, null, "Welcome to my Wahaj", 200);
});

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanititze());

app.use("/api/v1/furniture", furnRouter);
app.use("/api/v1/admin", adminRouter);
// app.use(
//   "/api/v1/auth",
//   (req, res, next) => {
//     res.set({
//       "Cache-Control":
//         "no-store, no-cache, must-revalidate, max-age=0, private",
//       Pragma: "no-cache",
//       Expires: "0",
//       Vary: "Accept-Encoding, Origin, Authorization",
//     });
//     next();
//   },
//   authRouter,
// );

app.all(
  "/api/auth/{*any}",
  (req, res, next) => {
    res.set({
      "Cache-Control":
        "no-store, no-cache, must-revalidate, max-age=0, private",
      Pragma: "no-cache",
      Expires: "0",
      Vary: "Accept-Encoding, Origin, Authorization",
    });
    next();
  },
  toNodeHandler(auth),
);

app.all(/(.*)/, notFoundError);

app.use(globalErrorHandler);

export default app;
