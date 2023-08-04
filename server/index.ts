import dotenv from "dotenv";
dotenv.config();
import express, { type ErrorRequestHandler } from "express";
import path from "path";
import { fileURLToPath } from "url";
import api from "./api.ts";
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/api", api);

if (!process.env.VITE) {
  const frontendFiles = process.cwd() + "/dist";
  app.use(express.static("dist"));
  app.use(express.static(frontendFiles));
  app.get("/*", (_, res) => {
    res.sendFile(frontendFiles + "/index.html");
  });

  app.listen(process.env["PORT"]);
}

app.use(express.static(path.join(__dirname, "..", "dist", "assets")));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(`Caught by custom error Handler\n
        Error: ${err.message}`);
  const error = {
    message: err.message,
    status: 400,
  };

  res.status(error.status).send({ message: err.message, error: true });
};
app.use(errorHandler);
