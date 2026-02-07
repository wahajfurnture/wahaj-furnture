import "dotenv/config.js";
import app from "./app.js";

const port = process.env.port || 3000;

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION 🚀!");
  console.log(err.name, err.message);
  console.log(err.stack);

  process.exit(1);
});

const server = app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 🚀!");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

export default app;
